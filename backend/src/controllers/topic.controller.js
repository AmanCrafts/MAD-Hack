import { prisma } from '../config/db.js';

export const getTopics = async (req, res) => {
    console.log("Fetching all topics...");
    try {
        const topics = await prisma.topic.findMany();
        res.status(200).json(topics);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getTopicById = async (req, res) => {
    const id = req.params.id;
    console.log("Fetching topic with id:", id);

    try {
        const topic = await prisma.topic.findUnique({
            where: { id: id }
        });
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ message: "Error fetching topic" });
    }
};

export const createTopic = async (req, res) => {
    console.log("Creating a new topic...");
    const { title, description, category, difficulty, estimatedReadTime, contentBody } = req.body;

    try {
        const newTopic = await prisma.topic.create({
            data: {
                title,
                description,
                category,
                difficulty,
                estimatedReadTime,
                contentBody
            }
        });
        res.status(201).json({
            message: "Topic created successfully",
            data: newTopic
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Could not create topic" });
    }
};

export const updateTopic = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const updatedTopic = await prisma.topic.update({
            where: { id: id },
            data: data
        });
        res.status(200).json({ message: "Updated topic: " + id, data: updatedTopic });
    } catch (error) {
        res.status(500).json({ message: "Update failed" });
    }
};

export const deleteTopic = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.topic.delete({
            where: { id: id }
        });
        res.status(200).json({ message: "Deleted topic: " + id });
    } catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
};
