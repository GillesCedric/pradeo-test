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
	add = {
		_: "Nouveau",
		user: "Ajouter un utilisateur",
		application: "Ajouter une application"
	}
	dashboard = "Panneau d'administration"
	users = "Utilisateurs"
	my_applications = "Mes Applications"
	settings = "Paramètres"
	language = "Langue"
	update = "Modifier"
	delete = "Supprimer"
	english = "Anglais"
	french = "Français"
	error = "Erreur"
	notification = "Notification"
	close = "Fermer"
	save = "Enregistrer"
	download_apk = "Télécharger le fichier apk"
	register_success = "Inscription réussie! Veuillez vous connecter"
}