import random
import json

# ----------------------------
# Hardcoded LLM-style input
# ----------------------------
llm_questions = [
    {
        "question": "What does the typeof operator return for a boolean value in JavaScript?",
        "correct_answer": "Boolean",
        "distractors": ["Number", "String", "Undefined"]
    },
    {
        "question": "Which HTTP method is typically used to update an existing resource?",
        "correct_answer": "PUT",
        "distractors": ["GET", "POST", "DELETE"]
    }
]

# ----------------------------
# Helper function (shuffle + label)
# ----------------------------
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

# ----------------------------
# Build final quiz
# ----------------------------
final_quiz = [build_question(q) for q in llm_questions]

# ----------------------------
# Display final JSON
# ----------------------------
print(json.dumps(final_quiz, indent=2))
