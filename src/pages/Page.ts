import { Lang } from "../modules/language/lang"

/**
 * @interface PageProps
 * @author Gilles Cédric
 * @description this interface is the Props definition for all the page component
 * @since 22/05/2022
 */
export interface PageProps {
	vocabulary: Lang
}

/**
 * @interface PageState
 * @author Gilles Cédric
 * @description this interface is the State definition for the page component
 * @since 22/05/2022
 */
export interface PageState {
	notification: {
		status: "danger" | "success"
		isActive: boolean
		text: string
	}
}