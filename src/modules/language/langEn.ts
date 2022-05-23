import { Lang } from "./lang"

export class LangEn extends Lang {

	constructor() {
		super("en", "Anglais")
	}

	sign_in = "Sign in"
	sign_up = "Sign up"
	username = "Username"
	password = "Password"
	your = "Your"
	mail = "Mail Address"
	loading = "Loading..."
	errors = { 
		empty: "Please fill in all fields" 
	}
	page_not_found = "Page not found"
	lost = "We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our."
}