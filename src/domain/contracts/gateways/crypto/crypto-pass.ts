export interface CryptographyPass {
    cryptograph: (plaintext: string) => Promise<string>
    decode: (plaintext: string, cipher: string) => Promise<boolean>
}
