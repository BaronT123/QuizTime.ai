import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "http://localhost:5173"}})

# Correct API key assignment
openai.api_key = "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"

def generate_prompt(data):
    prompt = f"""
Generate {data['number']} {data['questionType']} questions about uploaded file/files {data['file']} and difficulty {data['difficulty']}. For each question: 
1) Randomize the correct answer's position (A/B/C/D) using Fisher-Yates algorithm
2) Ensure correct answers are evenly distributed (~25% per letter over the full set)
3) Maintain logical option order (e.g. numerical/chronological answers stay sorted)
4) Make all distractors plausible
5) Never reveal correct answers until submission
6) Format as:
[Question number]. [Question text]
A) [Option]
B) [Option]
C) [Option]
D) [Option]

Display questions and options in a usable JSON format

Example:
{
  "question": "What does the 'typeof' operator in JavaScript return for a boolean value?",
  "options": {
    "A": "Number",
    "B": "Boolean",
    "C": "String",
    "D": "Undefined"
  }
}
    """
    return prompt

@app.route("/upload", methods=["POST"])
def upload_file():
    # if not request.is_json:
    #     return jsonify({"error": "Expected JSON data"}), 400

    # data = request.get_json()
    #   # Debug: print incoming JSON data
    # prompt = generate_prompt(data)
    number = request.form.get("number")
    question_type = request.form.get("questionType")
    difficulty = request.form.get("difficulty")
    # Access file
    file = request.files.get("file")

    print("number:", number)
    print("questionType:", question_type)
    print("difficulty:", difficulty)
    print("file:", file.filename if file else None)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a quiz setter."},
            {"role": "user", "content": prompt}
        ]
    )

    # Print inside the route if needed for debugging
    print(response.choices[0].message['content'])

    return jsonify({
        "openai_response": response.choices[0].message['content']
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)