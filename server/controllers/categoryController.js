const { Category } = require("../models/models");

class CategoryController {
  async create(req, res) {
    const { name } = req.body;
    const category = await Category.create({
      name,
    });
    return res.json(category);
  }

  async getAll(req, res) {
    const categories = await Category.find({});
    return res.json(categories);
  }

  async delete(req, res) {
    const { id } = req.params;
    const category = await Category.deleteOne({ _id: id });
    return res.json(category);
  }
}

module.exports = new CategoryController();
