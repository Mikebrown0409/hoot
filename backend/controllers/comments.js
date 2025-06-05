const Hoot = require("../models/hoot");

module.exports = {
  create,
  show,
  update,
  deleteComment,
};

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.findById(req.params.hootId);
    hoot.comments.push(req.body);
    await hoot.save();

    // Find the newly created comment:
    const newComment = hoot.comments[hoot.comments.length - 1];

    newComment._doc.author = req.user;

    // Respond with the newComment:
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function show(req, res) {
  try {
    const comment = await Hoot.comment
      .findById(req.params.commetId)
      .populate("author");
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch posts" });
  }
}

async function update(req, res) {
  try {
    const comment = await Hoot.comment.findById(req.params.commentId);
    // Check permissions:
    if (!comment.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }
    const updatedComment = await Hoot.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );
    // Append req.user to the author property:
    updatedComment._doc.author = req.user;
    res.json(updatedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update post" });
  }
}

async function deleteComment(req, res) {
  try {
    const comment = await Hoot.comments.findById(req.params.hootId);

    if (!comment.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedComment = await Hoot.comments.findByIdAndDelete(
      req.params.hootId
    );
    res.json(deletedComment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}
