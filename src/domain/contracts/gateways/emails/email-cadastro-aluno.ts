export type EmailConfig = {
    from: string
    to: string
    subject: string
    text: string
    html: string
}

export interface SendEmailCadastroAluno {
    send: (params: EmailConfig) => Promise<void>
}