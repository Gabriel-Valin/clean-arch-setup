import { Router } from "express"
import { adaptExpressRoute } from "../adapters/express-router"
import { makeLoginAlunoController } from "../factories/controllers/login-aluno"

export default (router: Router): void => {
    router.post('/login-aluno', adaptExpressRoute(makeLoginAlunoController()))
}