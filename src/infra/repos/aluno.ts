import { InsertAlunoRepository } from "@/domain/contracts/repos/insert-aluno";
import { LoadAlunoByEmailRepositorio, LoadAlunoLoginByEmail, LoadAlunoRepository } from "@/domain/contracts/repos/load-aluno";
import { prisma } from "../helpers/prisma-client";

export class AlunoRepositorio implements InsertAlunoRepository, LoadAlunoRepository, LoadAlunoByEmailRepositorio {
    async insertAluno (params: InsertAlunoRepository.Params): Promise<InsertAlunoRepository.Output> {
        const aluno = await prisma.aluno.create({
            data: {
                senha: params.senha,
                ciclo: params.ciclo,
                cursoFatec: params.cursoFatec,
                email: params.email,
                dataIngresso: params.dataIngresso,
                nomeCompleto: params.nomeCompleto,
                tokenDeAtivacao: params.tokenAtivacao
            }
        })

        return {
            id: String(aluno.id)
        }
    }

    async loadAluno (params: LoadAlunoRepository.Params): Promise<LoadAlunoRepository.Output> {
        const aluno = await prisma.aluno.findFirst({ where: {
            email: params.email
        }})
        if (!aluno) {
            return undefined as any
        }
        return {
            id: String(aluno?.id),
            senha: aluno.senha
        }
    }

    async load ({ email }: LoadAlunoLoginByEmail.Params): Promise<LoadAlunoLoginByEmail.Output> {
        const aluno = await prisma.aluno.findFirst({ where: {
            email
        }})
        if (!aluno) {
            return undefined as any
        }
        return {
            id: aluno?.id,
            email: aluno.email,
            ativo: aluno.ativo,
            senha: aluno.senha
        }
    }

}