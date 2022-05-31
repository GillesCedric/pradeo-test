import { Lang } from "./lang"

/**
 * @class LangFr
 * @author Gilles Cédric
 * @description this class is the Fr implementation of the application language
 * @exports
 * @extends Lang
 * @since 21/05/2022
 */
export class LangFr extends Lang {

	/**
	 * @constructor
	 */
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
	delete = {
		_: "Supprimer",
		user: "Supprimer un utilisateur",
		application: "Supprimer une application"
	}
	dashboard = "Panneau d'administration"
	users = "Utilisateurs"
	my_applications = "Mes Applications"
	settings = "Paramètres"
	language = "Langue"
	update = "Modifier"
	english = "Anglais"
	french = "Français"
	error = "Erreur"
	notification = "Notification"
	close = "Fermer"
	save = "Enregistrer"
	download_apk = "Télécharger le fichier apk"
	register_success = "Inscription réussie! Veuillez vous connecter"
	cancel = "Annuler"
	id = "Id"
	name = "Nom"
	hash = "Hash"
	comment = "Commentaire"
	status = "Statut"
	actions = "Actions"
	applications_empty = "Vous n'avez aucune application"
}