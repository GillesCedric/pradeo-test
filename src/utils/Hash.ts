import * as crypto from 'crypto'
import * as fs from 'fs'

export default abstract class Hash {
	
	private static readonly hashAlgorithm = 'sha256'

	private static readonly fileBuffer = (fileName: string) => fs.readFileSync(fileName)

	private static readonly hashSum = () => crypto.createHash(this.hashAlgorithm)

	//TODO hash with the file not the fileName: this.fileBuffer
	private static readonly update = (fileName: string) => this.hashSum().update(fileName)

	public static readonly hash = (fileName: string) => this.update(fileName).digest('hex')
}