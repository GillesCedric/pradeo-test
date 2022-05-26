import User from "models/User"
import * as jwt from 'jsonwebtoken'

export default abstract class JWTUtils {

	private static readonly JWT_SIGN_SECRET = 'g{pZG_UtEpmJVMbZ+4b%d*sf>z(CDtybvM0"P%iN=3ixW]LX%qM_9>;??~xSs*xHa}]R$NxuoI6~PS[CzHmcq.&f%:T3]*(U#%y%QwBjVkmY8of*@@id#bsgx*}{%:eJ3U87M!wF#W+56^ZR?5B0hG(BR:R0?jL|42tGQU4bb)~B?u`?!GXpqkU%!-1,t.7~1@<*KBSl!`RI|NT]G1ke0}q/Mb:[oZ+yyCd0"j1i6Qt}G_UESeM4r#QFl'

	private static readonly EXPIRE_IN = '24h'

	public static readonly generateTokenForUser: (user: User) => string = (user: User) => {
		return jwt.sign({ userId: user.id }, this.JWT_SIGN_SECRET, { expiresIn: this.EXPIRE_IN })
	}

	public static readonly parseToken: (token: string) => string = (token: string) => {
		return token.replace('Bearer ', '')
	}

	public static readonly getUserFromToken: (token: string) => number = (token: string) => {
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