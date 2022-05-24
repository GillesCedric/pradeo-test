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
	add = {
		_: "New",
		user: "Add User",
		application: "Add Application"
	}
	dashboard = "Dashboard"
	users = "Users"
	my_applications = "My Applications"
	settings = "Settings"
	language = "Language"
	update = "Update"
	delete = "Delete"
	english = "English"
	french = "French"
	error = "Error"
	notification = "Notification"
	close = "Close"
	save = "Save"
	download_apk = "Download the apk file"
	register_success = "Successful registration! Please log in"
}