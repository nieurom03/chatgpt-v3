# gptj_api.py (chạy riêng)
from fastapi import FastAPI, Request
from transformers import GPTJForCausalLM, AutoTokenizer
import torch

model = GPTJForCausalLM.from_pretrained("EleutherAI/gpt-j-6B")
tokenizer = AutoTokenizer.from_pretrained("EleutherAI/gpt-j-6B")
app = FastAPI()

@app.post("/api/generate")
async def generate(req: Request):
    body = await req.json()
    prompt = body.get("prompt", "")
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(inputs["input_ids"], max_length=200)
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": text}
