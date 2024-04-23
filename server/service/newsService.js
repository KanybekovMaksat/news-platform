const uuid = require("uuid");
const path = require("path");
const { News } = require("../models/models");

class NewsService {
    async create(title, text, photo, description, categoryId, userId) {
        const news = await News.create({
            title,
            text,
            photo,
            description,
            categoryId,
            userId,
        });

        return news;
    }
}

module.exports = new NewsService();