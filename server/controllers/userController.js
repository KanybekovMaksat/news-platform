const userService = require("../service/userService")
const {validationResult} = require('express-validator')
const ApiError = require("../exceptions/apiError")
const {User} = require("../models/models");
const UserDto = require("../dtos/userDto");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            } 
            const {name, email, password, last_name, username} = req.body
            const userData = await userService.registration(name, email, password, last_name, username)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 60 * 60 * 24 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 60 * 60 * 24 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            
        }

    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 60 * 60 * 24 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async update (req, res, next) {
        try {

            const {id} = req.params
            const {last_name, name, username, photo} = req.body

            const user  = await User.findByIdAndUpdate(id, {last_name, name, username, photo})
            const userDto = new UserDto(user);
            return res.json(userDto)
        }catch (e) {
            next(e)
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json(users)
        } catch (e) {
            next(e)
        }
    }
    async  getUserById(req, res, next) {
        try {
            const {userId} = req.body;
            const user = await userService.getUserById(userId);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async reset(req, res, next) {
        try {
            const {email} = req.body;
            const user =  await User.findOne({email});
            if(!user){
                return res.send('Пользователь с таким email не найден')
            }
            const secret  = process.env.JWT_ACCESS_SECRET + user.password;
            const token  = jwt.sign({email: user.email, id: user._id}, secret, {
                expiresIn: "15m",
            })
            const link = `${process.env.API_URL}/api/user/reset/${user._id}/${token}`
            return res.json(link)
        }catch (e) {
            next(e)
        }
    }

    async confirm(req, res, next) {
        const { id, token } = req.params;
        console.log(req.params);
        const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = process.env.JWT_ACCESS_SECRET + oldUser.password;
        try {
            const verify = jwt.verify(token, secret);
            res.render("index", { email: verify.email, status: "Not Verified" });
        } catch (error) {
            console.log(error);
            res.send("Not Verified");
        }
    }

    async confirmPass(req, res) {
        const {id, token} = req.params;
        const {password} = req.body;
        const user = await User.findOne({_id: id})
        if(!user){
            return res.json({status: 'Пользователь с таким email не найден'})
        }
        try {
            const secret  = process.env.JWT_ACCESS_SECRET + user.password;
            const verify = jwt.verify(token, secret)

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.updateOne(
                { _id: id, },
                { $set: { password: hashedPassword, } }
            );

            res.json({status : "Пароль успешно изменен"})
            // res.render("index", { email: verify.email, status: "verified" });
        }catch(err){
            res.json({status : "Не удалось изменить пароль"})
        }
    }

}

module.exports = new UserController()
