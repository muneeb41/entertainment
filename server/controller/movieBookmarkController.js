const UserModel = require("../model/userModel.js");
const MovieModel = require("../model/movieModel.js");

const addBookmark = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBookmark = new MovieModel(req.body);
     await newBookmark.save();

    res.status(200).json({
      message: "Bookmark added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeBookmark = async (req, res) => {
    const { email, id } = req.body;

    try {
        const result = await MovieModel.deleteOne({ email, id });
        
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Bookmark removed successfully' });
        } else {
            res.status(404).json({ message: 'Bookmark not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error removing bookmark.', error: error.message });
    }
};

const getAllBookmarkByEmail = async (req, res) => {
    const { email } = req.query;
    
    try {
        const bookmarks = await MovieModel.find({ email });
        
        if (bookmarks.length === 0) { 
            return res.status(404).json({ message: 'Bookmark not found.' });
        }
        
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = { addBookmark, removeBookmark, getAllBookmarkByEmail };
