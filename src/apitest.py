import os
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from openai import OpenAI
import json
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2

# Load API key
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/rag-upload")
async def rag_upload(
    number: str = Form(...),
    questionType: str = Form(...),
    difficulty: str = Form(...),
    file: UploadFile = File(None)
):
    if not file:
        return JSONResponse(content={"message": "File not found"}, status_code=400)
    pdf_reader = PyPDF2.PdfReader(file.file)
    pdf_text = ""
    for page in pdf_reader.pages:
        pdf_text += page.extract_text()
    # Log the received data
    print("Number of questions:", number)
    print("Question type:", questionType)
    print("Difficulty:", difficulty)
    print("File received:", file.filename)

    # --- Build prompt ---
    prompt = f"""
Generate {number} {questionType} questions from the following study material: {pdf_text[:4000]}.
For each question:
1) Randomize the correct answer's position (A/B/C/D) using Fisher-Yates algorithm
2) Ensure correct answers are evenly distributed (~25% per letter over the full set)
3) Maintain logical option order (e.g. numerical/chronological answers stay sorted)
4) Make all distractors plausible

IMPORTANT:
- Only output a single valid JSON object or array.
- Do NOT include any explanations, formatting, code blocks, or extra text.
- Do NOT include question numbers or option letters outside the JSON.
- Do NOT wrap the JSON in triple backticks or any other formatting.
- The response must be directly parsable by Python's json.loads().

Return an array of objects. Each object must have:
- "question": the question text
- "options": an object with keys A, B, C, D
- "answer": a single letter (A/B/C/D) indicating the correct option

Format example:
[
  {{
    "question": "What does the 'typeof' operator in JavaScript return for a boolean value?",
    "options": {{
      "A": "Number",
      "B": "Boolean",
      "C": "String",
      "D": "Undefined"
    }},
    "answer": "B"
  }}
]

Now, generate the questions and output ONLY the JSON array as shown above.
"""

    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a quiz generator."},
            {"role": "user", "content": prompt}
        ]
    )

    print("GPT response:", response.choices[0].message.content)

    try:
        questions = json.loads(response.choices[0].message.content)
    except Exception as e:
        print("Failed to parse GPT response:", e)
        questions = []
    return JSONResponse(content={"questions": questions})
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)