backend 
Tạo file .env

MODEL_API_URL=http://localhost:11434/api/chat
MONGODB_URI=mongodb://localhost:27017/chatgpt-clone
PORT=5001
GOOGLE_CLIENT_ID=your_gg_client_id

Run frontend
cd frontend
npm install
npm run start

Run backedn
cd backend
npm install
npm run start

Run Ollama
cd python-server
ollama serve

Run python
cd python-server
pip install -r requirements.txt
python3 main.py
