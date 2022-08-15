import { CryptographyPass } from "@/domain/contracts/gateways/crypto/crypto-pass";
import { compare, hash } from "bcrypt";

export class Cryptography implements CryptographyPass {
    async cryptograph (plaintext: string): Promise<string> {
        const hashPass = await hash(plaintext, 12)
        return hashPass
    }

    async decode (plaintext: string, cipher: string):  Promise<boolean> {
        const decoded = await compare(plaintext, cipher)
        return decoded
    }
}