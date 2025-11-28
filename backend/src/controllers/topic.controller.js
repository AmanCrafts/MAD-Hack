 
export const getTopics = async (req, res) => {
    console.log("Fetching all topics...");
    try {
         res.status(200).json({ message: "Here are all the topics" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getTopicById = async (req, res) => {
    const id = req.params.id;
    console.log("Fetching topic with id:", id);

    try {
         res.status(200).json({ message: "Got the topic: " + id });
    } catch (error) {
        res.status(500).json({ message: "Error fetching topic" });
    }
};

export const createTopic = async (req, res) => {
    console.log("Creating a new topic...");
    const data = req.body;

    try {
         res.status(201).json({
            message: "Topic created successfully",
            data: data
        });
    } catch (error) {
        res.status(500).json({ message: "Could not create topic" });
    }
};

export const updateTopic = async (req, res) => {
    const id = req.params.id;
    try {
         res.status(200).json({ message: "Updated topic: " + id });
    } catch (error) {
        res.status(500).json({ message: "Update failed" });
    }
};

export const deleteTopic = async (req, res) => {
    const id = req.params.id;
    try {
         res.status(200).json({ message: "Deleted topic: " + id });
    } catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
};
