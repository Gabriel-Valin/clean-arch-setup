import { LoadAlunoRepository } from "@/domain/contracts/repos/load-aluno";

class LoadAluno implements LoadAlunoRepository {
    constructor (
        private readonly repositorio: LoadAlunoRepository
    ) {}

    async loadAluno (params: LoadAlunoRepository.Params): Promise<LoadAlunoRepository.Output> {
        const aluno = await this.repositorio.loadAluno({ email: params.email })
        if (!aluno) {
            return undefined as any
        }
        return {
            id: aluno?.id
        }
    }
}