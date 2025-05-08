from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import requests 
import json
import os
import time



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Ollama API configuration
OLLAMA_HOST = os.getenv('OLLAMA_HOST', '127.0.0.1')  # Use 127.0.0.1 instead of localhost
OLLAMA_PORT = os.getenv('OLLAMA_PORT', '11434')
OLLAMA_API_URL = f"http://{OLLAMA_HOST}:{OLLAMA_PORT}/api/generate"
MODEL_NAME = os.getenv('OLLAMA_MODEL', 'llama2')  # or any other model you have pulled in Ollama

def wait_for_ollama(max_retries=5, retry_delay=2):
    """Wait for Ollama to be available"""
    for i in range(max_retries):
        try:
            response = requests.get(f"http://{OLLAMA_HOST}:{OLLAMA_PORT}/api/tags")
            if response.status_code == 200:
                print("Successfully connected to Ollama")
                return True
        except requests.exceptions.ConnectionError:
            if i < max_retries - 1:
                print(f"Waiting for Ollama to be available... (attempt {i+1}/{max_retries})")
                time.sleep(retry_delay)
            continue
    return False

def get_ollama_response(prompt):
    try:
        print(f"Connecting to Ollama at: {OLLAMA_API_URL}")
        response = requests.post(
            OLLAMA_API_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False
            },
            timeout=60  # Add timeout to prevent hanging
        )
        response.raise_for_status()
        return response.json()["response"]
    except requests.exceptions.ConnectionError:
        print(f"Failed to connect to Ollama at {OLLAMA_API_URL}")
        return "I apologize, but I cannot connect to my brain. Please check if Ollama is running and accessible."
    except Exception as e:
        print(f"Error calling Ollama API: {str(e)}")
        return "I apologize, but I'm having trouble processing your request. Please try again later."

@app.route("/api/chat/stream", methods=["POST"])
def stream_response():
    data = request.json
    prompt = data.get("prompt", "")
    
    def generate():
        for chunk in llm(f"[INST] {prompt} [/INST]", max_tokens=512, stream=True):
            text = chunk["choices"][0]["text"]
            yield text

    return Response(generate(), mimetype='text/plain')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message', '')
    
    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    
    # Get response from Ollama
    response = get_ollama_response(user_input)
    
    return jsonify({
        "role": "assistant",
        "content": response
    })

if __name__ == '__main__':
    print(f"Starting AI service with Ollama at: {OLLAMA_API_URL}")
    print(f"Using model: {MODEL_NAME}")
    
    # Wait for Ollama to be available
    if not wait_for_ollama():
        print("Failed to connect to Ollama. Please make sure it's running.")
        exit(1)
        
    app.run(port=5002) 