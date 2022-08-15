import { GerarTokenAtivacao, Token } from "@/domain/contracts/gateways/token/generate";
import { sign } from "jsonwebtoken";
import 'dotenv/config'

export class TokenAtivacao implements GerarTokenAtivacao {
    async generate ({ email }: Token): Promise<string> {
        const token = sign({ email }, String(process.env.JWT_KEY), {
            expiresIn: '7d'
        })
        return token
    }
}