const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
class MailService {
    
    constructor() {
        dotenv.config()
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user:  'limepetproject@gmail.com',
                pass: "oikqjgzlzjwylrgo"
            },
            tls: { rejectUnauthorized: true }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'limepetproject@gmail.com',
            to,
            subject: "Активация аккаунта на " + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
                `
        })
    }
}

module.exports = new MailService()