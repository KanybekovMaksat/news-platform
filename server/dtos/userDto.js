module.exports = class UserDto {
    last_name;
    username;
    name;
    email;
    id;
    photo;

    constructor(model) {
        this.last_name = model.last_name;
        this.username = model.username;
        this.name = model.name;
        this.photo = model.photo;
        this.email = model.email;
        this.id = model._id;
    }
}