const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.chat = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        systemInstruction: "You are FlowState AI, an elite productivity assistant. You write in a concise, professional, and slightly futuristic tone. You help software teams manage tasks, generate roadmaps, and summarize complex meeting notes.",
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
};

exports.generateRoadmap = async (req, res) => {
  try {
    const { projectDescription } = req.body;

    const prompt = `Create a detailed, JSON-formatted agile roadmap for a project with the following description: "${projectDescription}". Include phases, tasks, and estimated effort in hours. Do not use markdown backticks, just raw JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    res.json({ roadmap: JSON.parse(response.text) });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
};

exports.generateTasksFromNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    const prompt = `You are an AI task generator. Analyze these meeting notes and extract actionable tasks.
    Return ONLY a JSON array of objects, with NO markdown formatting, NO backticks.
    Each object must have:
    - "title": A short, clear task description
    - "priority": "High", "Medium", or "Low"
    - "status": "Todo"
    - "date": "Today"

    Meeting notes: "${notes}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    res.json({ tasks: JSON.parse(response.text) });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to extract tasks' });
  }
};
