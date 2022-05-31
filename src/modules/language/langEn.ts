import { Lang } from "./lang"

/**
 * @class LangEn
 * @author Gilles Cédric
 * @description this class is the En implementation of the application language
 * @exports
 * @extends Lang
 * @since 21/05/2022
 */
export class LangEn extends Lang {

	/**
	 * @constructor
	 */
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
	delete = {
		_: "Delete",
		user: "Delete User",
		application: "Delete Application"
	}
	dashboard = "Dashboard"
	users = "Users"
	my_applications = "My Applications"
	settings = "Settings"
	language = "Language"
	update = "Update"
	english = "English"
	french = "French"
	error = "Error"
	notification = "Notification"
	close = "Close"
	save = "Save"
	download_apk = "Download the apk file"
	register_success = "Successful registration! Please log in"
	cancel = "Cancel"
	id = "Id"
	name = "Name"
	hash = "Hash"
	comment = "Comment"
	status = "Status"
	actions = "Actions"
	applications_empty = "You have no application"
}