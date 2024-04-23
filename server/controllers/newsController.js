const newsService = require("../service/newsService");
const {News} = require('../models/models')

class NewsController {
  async create(req, res) {
    const { title, description, text, photo, categoryId, userId } = req.body;
    const newsData = await newsService.create(
        title,
        text,
        photo,
        description,
        categoryId,
        userId
    );
    return res.json(newsData);
  }

  async getAll(req, res) {
    const news = await News.find();
    return res.json(news);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const news = await News.findById(id);
    return res.json(news);
  }

  async getNewsByAuthor(req, res)  {
    const {userId} = req.params;
    const news = await News.find({userId: userId});
    return res.json(news);
}

  async delete(req, res) {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);
    return res.json(news);
  }

}

module.exports = new NewsController();
