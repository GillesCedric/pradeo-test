import User from "models/User"
import * as jwt from 'jsonwebtoken'

/**
 * @class JWTUtils
 * @author Gilles Cédric
 * @description this class is used to handle oll the JsonWebToken operations
 * @abstract
 * @exports
 * @default
 * @since 22/05/2022
 */
export default abstract class JWTUtils {

	/**
   * @property JWT_SIGN_SECRET
   * @description the secret key of the application for signing token
   * @private
	 * @static
   * @readonly
   * @type {string}
   */
	private static readonly JWT_SIGN_SECRET: string = 'g{pZG_UtEpmJVMbZ+4b%d*sf>z(CDtybvM0"P%iN=3ixW]LX%qM_9>;??~xSs*xHa}]R$NxuoI6~PS[CzHmcq.&f%:T3]*(U#%y%QwBjVkmY8of*@@id#bsgx*}{%:eJ3U87M!wF#W+56^ZR?5B0hG(BR:R0?jL|42tGQU4bb)~B?u`?!GXpqkU%!-1,t.7~1@<*KBSl!`RI|NT]G1ke0}q/Mb:[oZ+yyCd0"j1i6Qt}G_UESeM4r#QFl'

	/**
   * @property EXPIRE_IN
   * @description the duration of the token
   * @private
	 * @static
   * @readonly
   * @type {string}
   */
	private static readonly EXPIRE_IN: string = '24h'

	/**
   * @method generateTokenForUser
   * @description this method is used to generate and sign a token for a specific user
	 * @param {User} user the user
   * @readonly
	 * @static
   * @private
   * @returns {string} the generated token
   */
	public static readonly generateTokenForUser: (user: User) => string = (user: User): string => {
		return jwt.sign({ userId: user.id }, this.JWT_SIGN_SECRET, { expiresIn: this.EXPIRE_IN })
	}

	/**
   * @method parseToken
   * @description this method is used to parse a given token
   * @readonly
	 * @static
   * @private
   * @returns {string}
   */
	public static readonly parseToken: (token: string) => string = (token: string): string => {
		return token.replace('Bearer ', '')
	}

	/**
   * @method getUserFromToken
   * @description this method is used to get a specific userId from a given token
   * @readonly
	 * @static
   * @private
   * @returns {number}
   */
	public static readonly getUserFromToken: (token: string) => number = (token: string): number => {
		token = this.parseToken(token)
		let userId = -1
		try {
			const jwtToken = jwt.verify(token, this.JWT_SIGN_SECRET);
			//@ts-ignore
			userId = jwtToken.userId as unknown as number
		} catch (error) {
			console.log(error);
		}
		return userId;
	}

}