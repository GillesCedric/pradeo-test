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
	loading = "Chargement..."
	errors = { 
		empty: "Veuillez remplir tous les champs" 
	}
	page_not_found = "Page non trouvée"
	lost = "Nous sommes désolés, la page que vous cherchiez ne se trouve pas ici. Le lien que vous avez suivi est peut-être cassé ou n'existe plus. Veuillez réessayer, ou consultez notre site. 	"
}