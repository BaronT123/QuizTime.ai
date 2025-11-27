from flask import Flask, request, jsonify
from flask_cors import CORS
import openai  # Make sure openai is installed and imported

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "http://localhost:5173"}})

# Example: Set your OpenAI API key
openai.api_key = "YOUR_OPENAI_API_KEY"

def generate_prompt(data):
    # Nest your JSON data into the prompt as needed
    prompt = f"User uploaded file info: {data}\nPlease process accordingly."
    return prompt

@app.route("/upload", methods=["POST"])
def upload_file():
    if not request.is_json:
        return jsonify({"error": "Expected JSON data"}), 400

    data = request.get_json()
    # You can access fields like: data['filename'], data['number'], etc.

    prompt = generate_prompt(data)

    # Call OpenAI API (example for GPT-3.5/4 completion)
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    return jsonify({
        "openai_response": response.choices[0].message['content']
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)