const { User } = require("../models/models");
const bcrypt = require('bcrypt')
const uuid = require('uuid');
const mailService = require("./mailService");
const UserDto = require("../dtos/userDto");
const tokenService = require("./tokenService");
const ApiError = require("../exceptions/apiError");

class UserService {
    async registration(name, email, password, last_name, username) {
        const candidate = await User.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 4);

        const user = await User.create({ name, email, password: hashPassword, username, last_name });
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { user: userDto, ...tokens };
    }

    async login(email, password) {
        const user = await User.findOne({email});
        if (!user) {
            throw ApiError.BadRequest("Пользователь с таким email не найден")
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль")
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {user: userDto, ...tokens}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizeError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizeError();
        }
        const user = await User.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {user: userDto, ...tokens}
    }

    async getAllUsers() {
        const users = await User.find();
        return users;
    }
    async  getUserById(userId) {
        try {

            const user = await User.findById(userId);
            const userDto = new UserDto(user);
            return userDto;
        } catch (error) {
            throw new Error('Failed to get user by ID');
        }
    }
}


module.exports = new UserService();