import { CadastroAlunoController } from "@/application/controller/cadastro-aluno"
import { RequestHandler, Request, Response } from "express"

type Adapter = (controller: any) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req: Request, res: Response) => {
    const { statusCode, data } = await controller.handle({ ...req.body })
    const json = [200, 204].includes(statusCode) ? data : { error: data }
    res.status(statusCode).json(json)
  }