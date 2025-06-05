const Hoot = require("../models/hoot");

module.exports = {
  index,
  create,
};

async function index(req, res) {
  try {
    const comments = await Hoot.comments.find({});
    // Below would return all comments for just the logged in user
    // const comments = await Hoot.find({author: req.user._id});
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
}
async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const comment = await Hoot.comments.create(req.body);
    // Below would return all comments for just the logged in user
    // const comments = await Hoot.find({author: req.user._id});
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create hoot" });
  }
}
