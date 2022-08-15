export namespace InsertAlunoRepository {
    export type Params = {
        nomeCompleto: string, email: string, senha: string, dataIngresso: string, cursoFatec: string, ciclo: number, tokenAtivacao?: string
    }
    export type Output = {
        id: string
    }
}

export interface InsertAlunoRepository {
    insertAluno: (params: InsertAlunoRepository.Params) => Promise<{id: string}>
}