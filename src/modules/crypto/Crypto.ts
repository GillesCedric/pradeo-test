import _Crypto from 'crypto-js'

export default class Crypto {

	private static readonly secret_key: string = "_p=/1#C>Mzi%5gkbFAamRh246.I(jiz/sow|rk9Z&tU5[}hve0F)AK2lX590WqUmPdAy#LZh){N^JR1H?v']s=RIE*!13-hF<mn.'SpaLQ~+9@d!o$`r#:qFX2vH6AE[>Bus*,.iw^tW}hn#Q_G)el=8Y:zfq`@~UBtZO-.3lg6T{w'>#-A]4}jQ(,P=RI8a;.v*:Cl?<-8Mc)y~WPS@7}>24T.fU+kwGL|1pj^Z8XHYT}xueK94k>[bMNI0lEuO|)prR3}9kg;y{P[$G5a&2N~0'v`G_Da|wULy[-xHZ$d]C<Pq#o4!t9{WgDv]bM_1VIk<du@haO;ES[yGYi#(%7PLT82hMn7tg3^D&6!s)*0I5p$-+"

	private static readonly chars: string[] = 'ABCDEFGHIJKMLNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('')
	private static readonly chars2: string[] = [
		...this.chars,
		'!', '§', '%', '&', '(', ')', '=', '?', '{', '[', ']', '}', '@', '€', '*', '+', '#', '>', '<', '|', ';', ','
	]

	private static readonly randomLength = 10

	public static readonly hash = {

		/**
		 * @function md5
		 * @static
		 * @description this __OBJECT__ is used to create a **MD5** string from the given message
		 * @param {string} message s.e.
		 * @returns {string} the base64 encoded MD5 hash
		 */
		md5: (message: string): string => _Crypto.MD5(message).toString(_Crypto.enc.Base64),

		/**
		 * @function sha256
		 * @static
		 * @description this __OBJECT__ is used to create a **SHA256** string from the given message
		 * @param {string} message s.e.
		 * @returns {string} the base64 encoded SHA256 hash
		 */
		sha256: (message: string): string => _Crypto.SHA256(message).toString(_Crypto.enc.Base64),

		/**
		 * @function sha512
		 * @static
		 * @description this __OBJECT__ is used to create a **sha512** string from the given message
		 * @param {string} message s.e.
		 * @returns {string} the base64 encoded sha512 hash
		 */
		sha512: (message: string): string => _Crypto.SHA512(message).toString(_Crypto.enc.Base64),
	}

	/**
	 * @function encrypt
	 * @static
	 * @description this __OBJECT__ is used to create a **AES** string from the given message
	 * @param {string} message s.e.
	 * @returns {string} the encoded AES hash
	 */
	public static readonly encrypt: (message: any) => string = (message: any): string => _Crypto.AES.encrypt(JSON.stringify(message), this.secret_key).toString()

	/**
	* @function decrypt
	* @static
	* @description this __OBJECT__ is used to create a decrypted string from the given **AES** message
	* @param {string} message s.e.
	* @returns {string} the decoded string
	*/
	public static readonly decrypt: (message: string) => any = (message: string): any => JSON.parse(_Crypto.enc.Utf8.stringify(_Crypto.AES.decrypt(message, this.secret_key)))


	/**
	 * @function random
	 * @description this __OBJECT__ is used to generate a pseudo random word
	 * @param {number} length {10} the length of the word
	 * @returns {string} s.e.
	 */
	 public static readonly random = (length: number = this.randomLength): string => {
		let text = ''
		for (let i = 0; i < length; i++) text += this.chars2[Math.random() * this.chars.length]
		return text
	}

	/**
	 * @function identifier
	 * @param {string} suffix {''} s.e.
	 * @param {number} length {10} the length of the word
	 * @returns {string} the random identifier
	 */
	public  static readonly identifier = (suffix: string = '', length: number = this.randomLength): string => Date.now() + this.random(length) + suffix

}
