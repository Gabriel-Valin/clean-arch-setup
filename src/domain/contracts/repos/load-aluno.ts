export namespace LoadAlunoRepository {
    export type Params = {
        email: string
    }
    export type Output = {
        id: string
        senha: string
    }
}

export interface LoadAlunoRepository {
    loadAluno: (params: LoadAlunoRepository.Params) => Promise<{id: string, senha: string}>
}

export namespace LoadAlunoLoginByEmail {
    export type Params = { email: string }

    export type Output = { id: number, email: string, ativo: boolean, senha: string } | undefined
}

export interface LoadAlunoByEmailRepositorio {
    load: (email: LoadAlunoLoginByEmail.Params) => Promise<LoadAlunoLoginByEmail.Output>
}