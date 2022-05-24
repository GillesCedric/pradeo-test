import { Lang } from "../modules/language/lang"

export interface PageProps {
	vocabulary: Lang
}

export interface PageState {
	notification: {
		status: "danger" | "success"
		isActive: boolean
		text: string
	}
}