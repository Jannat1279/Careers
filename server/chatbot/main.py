from flask import Flask, request, jsonify, session
from langchain_groq import ChatGroq
from flask_cors import CORS
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
import os
from dotenv import load_dotenv
import uuid

load_dotenv()

app = Flask(__name__)
app.secret_key = "career_secret_key_123"

CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.3-70b-versatile",
    temperature=0.6,
    max_tokens=250
)

# 🔥 RESET ROUTE
@app.route("/reset", methods=["POST"])
def reset_chat():
    session.clear()
    return jsonify({"status": "reset"})


SYSTEM_PROMPT = """
You are a professional career counselor inside a mobile app.

STRICT RULES:
- Keep answers SHORT (5–8 lines maximum)
- Use bullet points (•)
- No long paragraphs
- Give practical, clear advice
- Continue context naturally
"""

memory_store = {}
profile_store = {}


def get_session_id():
    if "session_id" not in session:
        session["session_id"] = str(uuid.uuid4())
    return session["session_id"]


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"reply": "Invalid request."})

        user_input = data["message"]
        lower_input = user_input.lower()
        mode = session.get("mode", "menu")
        session_id = get_session_id()

        if session_id not in memory_store:
            memory_store[session_id] = []

        if session_id not in profile_store:
            profile_store[session_id] = {
                "stream": "",
                "interests": [],
                "skills": [],
                "goals": ""
            }

        profile = profile_store[session_id]

        # ================= MENU MODE =================
        if mode == "menu":

            if lower_input == "quiz":
                session["mode"] = "chat"
                return jsonify({
                    "reply": "🎯 Great! Let’s start your career quiz.\n• Science\n• Commerce\n• Arts"
                })

            if lower_input == "content":
                session["mode"] = "chat"
                return jsonify({
                    "reply": "📚 What type of career content do you want?\n• Engineering\n• Medical\n• Business"
                })

            if lower_input == "chat":
                session["mode"] = "chat"
                memory_store[session_id] = []
                return jsonify({
                    "reply": "• Great! Tell me about your stream, interests or goals 😊"
                })

            return jsonify({
                "reply": "👋 What would you like to do today?",
                "buttons": [
                    {"text": "🎯 Take Career Quiz", "value": "quiz"},
                    {"text": "💬 Chat About Career", "value": "chat"},
                    {"text": "📚 Explore Career Content", "value": "content"}
                ]
            })

        # ================= CHAT MODE =================
        if mode == "chat":

            if "science" in lower_input:
                profile["stream"] = "Science"
            elif "commerce" in lower_input:
                profile["stream"] = "Commerce"
            elif "arts" in lower_input:
                profile["stream"] = "Arts"

            interest_keywords = [
                "math", "biology", "coding", "design",
                "finance", "business", "ai", "computer",
                "medicine", "law", "psychology"
            ]

            for word in interest_keywords:
                if word in lower_input and word not in profile["interests"]:
                    profile["interests"].append(word)

            if "good at" in lower_input or "strong in" in lower_input:
                profile["skills"].append(user_input)

            if "i want to" in lower_input:
                profile["goals"] = user_input

            memory_store[session_id].append({
                "role": "user",
                "content": user_input
            })

            conversation = memory_store[session_id][-10:]

            profile_context = f"""
User Profile:
Stream: {profile['stream']}
Interests: {profile['interests']}
Skills: {profile['skills']}
Goals: {profile['goals']}
"""

            messages = [SystemMessage(content=SYSTEM_PROMPT + profile_context)]

            for msg in conversation:
                if msg["role"] == "user":
                    messages.append(HumanMessage(content=msg["content"]))
                else:
                    messages.append(AIMessage(content=msg["content"]))

            try:
                response = llm.invoke(messages).content
            except Exception as e:
                print("LLM ERROR:", str(e))
                return jsonify({"reply": "⚠️ AI service temporarily unavailable."})

            memory_store[session_id].append({
                "role": "assistant",
                "content": response
            })

            return jsonify({"reply": response})

        return jsonify({"reply": "Session restarted."})

    except Exception as e:
        print("SERVER ERROR:", str(e))
        return jsonify({"reply": "⚠️ Server error occurred."})


if __name__ == "__main__":
    app.run(debug=True, port=5002)
