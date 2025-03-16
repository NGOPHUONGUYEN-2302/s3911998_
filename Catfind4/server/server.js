const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');  // Thêm cors
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Cho phép CORS (quan trọng cho việc giao tiếp giữa frontend và backend)
app.use(express.json()); // Middleware để phân tích cú pháp body JSON

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));  // Serve static files

const API_KEY = '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'; // 🔥🔥🔥 LUÔN GIỮ API KEY NÀY AN TOÀN!
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// API endpoint để nhận tin nhắn từ frontend và trả lời bằng AI
app.post('/server/chat', async (req, res) => { // Endpoint là "/server/chat"
    const userMessage = req.body.message; // Lấy tin nhắn từ body

    // Kiểm tra xem tin nhắn có rỗng không
    if (!userMessage) {
        return res.status(400).json({ error: 'Missing message' }); // Trả về lỗi nếu thiếu
    }

    try {
        const result = await model.generateContent(userMessage); // Gọi API AI
        const response = await result.response; // Lấy phản hồi
        const text = response.text(); // Lấy text
        res.json({ reply: text }); // Trả về phản hồi cho frontend
    } catch (error) {
        console.error('Error calling Google AI Studio API:', error); // Ghi log lỗi
        res.status(500).json({ error: 'Failed to get response from AI' }); // Trả về lỗi
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`); // In ra server đang chạy
});