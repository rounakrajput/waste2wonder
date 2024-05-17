import connectDB from "../../middleware/connectDB";
import File from "../../Models/File";

const getAllCardsHandler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    try {
        // Retrieve all cards from MongoDB
        const cards = await File.find({}).lean(); // Assuming you're using Mongoose and want to return plain JavaScript objects
    
        if (!cards || cards.length === 0) {
            return res.status(404).json({ message: 'No cards found' });
        }
    
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error retrieving cards:', error);
        res.status(500).json({ message: 'Failed to retrieve cards' });
    }
};

export default connectDB(getAllCardsHandler);
