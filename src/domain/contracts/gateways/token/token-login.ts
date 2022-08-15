export type GerarTokenLogin = {
    email: string
}

export interface GerarTokenAcessoAluno {
    generate: (params: GerarTokenLogin) => Promise<string>
}