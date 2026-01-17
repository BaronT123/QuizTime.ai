import os
import json
import random
import PyPDF2
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from openai import OpenAI

# Load API key
load_dotenv(dotenv_path="quiztime-backend/.env")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- HELPER FUNCTION ----------------
def build_question(llm_q):
    options = [llm_q["correct_answer"]] + llm_q["distractors"]
    random.shuffle(options)

    labels = ["A", "B", "C", "D"]
    option_map = dict(zip(labels, options))

    correct_letter = labels[options.index(llm_q["correct_answer"])]

    return {
        "question": llm_q["question"],
        "options": option_map,
        "answer": correct_letter
    }

# ---------------- API ENDPOINT ----------------
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
    pdf_text = "".join(page.extract_text() or "" for page in pdf_reader.pages)

    prompt = f"""
Generate {number} {questionType} questions from the following study material:
{pdf_text[:4000]}

Difficulty: {difficulty}

Return ONLY valid JSON in this format:
[
  {{
    "question": "...",
    "correct_answer": "...",
    "distractors": ["...", "...", "..."]
  }}
]
"""

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a quiz generator."},
            {"role": "user", "content": prompt}
        ]
    )

    raw_output = response.choices[0].message.content
    print("RAW GPT OUTPUT:\n", raw_output)

    final_quiz = []

    try:
        questions = json.loads(raw_output)
        final_quiz = [build_question(q) for q in questions]
    except Exception as e:
        print("❌ Failed to parse GPT response:", e)

    
    #print("FINAL QUIZ JSON:\n", json.dumps(final_quiz, indent=2))

    return JSONResponse(content={"questions": final_quiz})

#     app.run(debug=True, port=5000)