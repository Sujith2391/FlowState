const { GoogleGenerativeAI } = require('@google/generative-ai');
const Task = require('../models/Task');
const Notification = require('../models/Notification');

// Initialize Gemini API client
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chat = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const model = ai.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const response = await model.generateContent({
      contents: prompt,
      generationConfig: {
        systemInstruction: "You are FlowState AI, an elite productivity assistant. You write in a concise, professional, and slightly futuristic tone. You help software teams manage tasks, generate roadmaps, and summarize complex meeting notes.",
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text() });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
};

exports.generateRoadmap = async (req, res) => {
  try {
    const { projectDescription } = req.body;

    const prompt = `Create a detailed, JSON-formatted agile roadmap for a project with the following description: "${projectDescription}". Include phases, tasks, and estimated effort in hours. Do not use markdown backticks, just raw JSON.`;

    const model = ai.getGenerativeModel({ model: 'gemini-1.5-pro', generationConfig: { responseMimeType: "application/json" } });
    const response = await model.generateContent(prompt);

    res.json({ roadmap: JSON.parse(response.text()) });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
};

exports.generateTasksFromNotes = async (req, res) => {
  try {
    const { notes, workspaceId } = req.body;

    const prompt = `You are an AI task generator. Analyze these meeting notes and extract actionable tasks.
    Return ONLY a JSON array of objects, with NO markdown formatting, NO backticks.
    Each object must have:
    - "title": A short, clear task description
    - "priority": "High", "Medium", or "Low"
    - "status": "Todo"
    - "date": "Today"

    Meeting notes: "${notes}"`;

    const model = ai.getGenerativeModel({ model: 'gemini-1.5-pro', generationConfig: { responseMimeType: "application/json" } });
    const response = await model.generateContent(prompt);

    const tasks = JSON.parse(response.text());
    const tasksWithWorkspace = tasks.map(t => ({ ...t, workspaceId }));
    
    // Save to database
    const savedTasks = await Task.insertMany(tasksWithWorkspace);

    // Create a Notification about the AI activity
    const notification = new Notification({
      title: 'AI Processing Complete',
      description: `Gemini generated ${savedTasks.length} new tasks from your meeting notes.`,
      workspaceId
    });
    await notification.save();

    res.json(savedTasks);
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to extract tasks' });
  }
};
