const { Comment, User, News } = require('../models/models');

class CommentController {
  async create(req, res) {
    try {
      const { text, userId, newsId } = req.body;
      const comment = await Comment.create({
        text,
        userId,
        newsId,
      });

      return res.json(comment);
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(req, res) {
    const { id } = req.params;
    const comment = await Comment.find({ newsId: id });
    return res.json(comment);
  }

  async delete(req, res) {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    return res.json(comment);
  }
}

module.exports = new CommentController();
