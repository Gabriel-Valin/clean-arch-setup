import { EmailConfig, SendEmailCadastroAluno } from '@/domain/contracts/gateways/emails/email-cadastro-aluno';
import nodemailer, { Transporter, getTestMessageUrl } from 'nodemailer'

export class EmailCadastroAluno implements SendEmailCadastroAluno {
    private client!: Transporter

    constructor () {
        nodemailer
            .createTestAccount()
            .then((account) => {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
                });

                this.client = transporter
      })
      .catch((err) => console.error(err))
    }

    async send (params: EmailConfig) {
        const message = await this.client.sendMail({
            from: params.from, // sender address
            to: params.to, // list of receivers i.e [sneder1, sender2, sender3, ....]
            subject: params.subject, // Subject line
            text: params.text, // plain text body
            html: params.html // html bodz
        })

        console.log(message.messadeId)
        console.log(nodemailer.getTestMessageUrl(message))
    }
}