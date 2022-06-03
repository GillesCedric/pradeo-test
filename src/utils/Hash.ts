import * as crypto from 'crypto'
import * as fs from 'fs'

/**
 * @class App
 * @author Gilles Cédric
 * @description this class is used to represent the express App instance
 * @exports
 * @default
 * @since 26/05/2022
 */
export default abstract class Hash {

	/**
   * @property hashAlgorithm
   * @description the algorithm that should be used to calculate the hash of a specific application
   * @private
	 * @static
   * @readonly
   * @type {string}
   */
	private static readonly hashAlgorithm: string = 'sha256'

	/**
   * @method fileBuffer
   * @description this method is used to read a file from the filesystem
	 * @param {string} fileName the name of the file
   * @readonly
	 * @static
   * @private
   * @returns {Buffer}
   */
	private static readonly fileBuffer = (fileName: string): Buffer => fs.readFileSync(fileName)

	/**
   * @method hashSum
   * @description this method is used to generate the hash
   * @readonly
	 * @static
   * @private
   * @returns {crypto.Hash}
   */
	private static readonly hashSum = (): crypto.Hash => crypto.createHash(this.hashAlgorithm)

	/**
   * @method update
   * @description this method is used to generate and sign a token for a specific user
	 * @param {string} fileName the name of the file
   * @readonly
	 * @static
   * @private
   * @returns {crypto.Hash}
   */
	//TODO hash with the file not the fileName: this.fileBuffer
	private static readonly update = (fileName: string): crypto.Hash => this.hashSum().update(fileName)

	/**
   * @method generateTokenForUser
   * @description this method is used to generate and sign a token for a specific user
	 * @param {string} fileName the name of the file
   * @readonly
	 * @static
   * @private
   * @returns {string}
   */
	public static readonly hash = (fileName: string): string => this.update(fileName).digest('hex')
}