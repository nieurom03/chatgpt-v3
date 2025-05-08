import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Conversation from './models/Conversation.js'

dotenv.config()
const app = express()


// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000', // React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };

  // Middleware
app.use(cors(corsOptions));
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chatgpt-clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

  
app.post('/api/messages', async (req, res) => {
  const  prompt = req.body
  try {
    console.log("request", prompt);
    // const result = await axios.post(process.env.MODEL_API_URL, { prompt })
    // const reply = result.data.reply

    // const conversation = new Conversation({
    //   messages: [
    //     { role: 'user', content: prompt },
    //     { role: 'assistant', content: reply }
    //   ]
    // })

    const conversation = new Conversation({messages:prompt.message});
    await conversation.save()
    res.status(200).json('Thanh cong')
  } catch (err) {
    console.error('Model error:', err.message)
    res.status(500).json({ error: 'Model API error' })
  }
})

app.get('/api/messages', async (req, res) => {
  const history = await Conversation.find().sort({ createdAt: -1 })
  res.json(history)
})

const PORT =process.env.PORT || 5001 
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`))
