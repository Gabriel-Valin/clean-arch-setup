export type Token = {
    email: string
}

export interface GerarTokenAtivacao {
    generate: (params: Token) => Promise<string>
}