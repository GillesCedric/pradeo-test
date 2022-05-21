import { Lang } from "./lang"

export class LangFr extends Lang {

	constructor() {
		super("fr", "Français")
	}

	sign_in = "Se connecter"
	sign_up = "S'inscrire"
	username = "Nom d'utilisateur"
	password = "Mot de passe"
	your = "Votre"
	mail = "Addresse Mail"
}