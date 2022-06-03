import User from '../models/User'
import { application, Request, Response } from 'express'
import * as async from 'async'
import * as bcrypt from 'bcrypt'
import * as fs from 'fs'
import * as path from 'path'
import JWTUtils from '../utils/JWTUtils'
import Application from '../models/Application'
import VirusToptalApi from '../services/VirusTotalAPI'

/**
 * @class ApplicationController
 * @author Gilles Cédric
 * @description this class is used to handle the request for the applications endpoint
 * @exports
 * @default
 * @since 22/05/2022
 */
export default class ApplicationController {

	/**
	 * @method get
	 * @description this method is used to get all the applications for a specific user
	 * @param {Request} req the request instance
	 * @param {Response} res the response instance
	 * @readonly
	 * @public
	 * @returns {Response}
	 */
	public readonly get: (req: Request, res: Response) => Response = (req: Request, res: Response): Response => {
		const authorization = req.headers.authorization
		const userId = JWTUtils.getUserFromToken(authorization)

		if (userId < 0) return res.status(400).json({ error: 'Token invalide' })

		const targetUserId = Number.parseInt(req.params.userId)

		if (Number.isNaN(targetUserId) || targetUserId <= 0) return res.status(400).json({ error: 'id de l\'utilisateur invalide' })

		async.waterfall([
			(done: any) => {
				Application.findAll({
					attributes: ['id', 'hash', 'name', 'comment'],
					include: {
						model: User,
						attributes: ['id'],
						where: {
							id: targetUserId
						}
					}
				})
					.then((applicationsFound: Application[]) => {
						done(applicationsFound)
					})
					.catch(error => {
						console.log(error)
						return res.status(500).json({ error: 'Impossible de vérifier l\'utilisateur' })
					})
			}],
			(applicationsFound: Application[]) => {
				if (applicationsFound) {
					return res.status(200).json({ applications: applicationsFound })
				} else {
					return res.status(500).json({ error: 'L\'utilisateur n\'existe pas' })
				}
			})


	}

	/**
	 * @method add
	 * @description this method is used to add a specific application to the server
	 * @param {Request} req the request instance
	 * @param {Response} res the response instance
	 * @readonly
	 * @public
	 * @returns {Response}
	 */
	public readonly add: (req: Request, res: Response) => void = (req: Request, res: Response): Response => {
		//FIXME handle the request and insert the data here not in the Multer middleware
		const targetUserId = Number.parseInt(req.params.userId)

		return res.status(200).json({ message: 'Application téléchargé avec succès' })

	}

	/**
	 * @method update
	 * @description this method is used to update an application
	 * @param {Request} req the request instance
	 * @param {Response} res the response instance
	 * @readonly
	 * @public
	 * @returns {Response}
	 */
	public readonly update: (req: Request, res: Response) => void = (req: Request, res: Response): Response => {

		const authorization = req.headers.authorization
		const userId = JWTUtils.getUserFromToken(authorization)

		if (userId < 0) return res.status(400).json({ error: 'Token invalide' })

		const targetUserId = Number.parseInt(req.params.userId)
		const applicationId = Number.parseInt(req.params.applicationId)

		if (Number.isNaN(targetUserId) || targetUserId <= 0 || userId !== targetUserId) return res.status(400).json({ error: 'id de l\'utilisateur invalide' })

		if (Number.isNaN(applicationId) || applicationId <= 0) return res.status(400).json({ error: 'id de l\'application invalide' })


		if (req.body.name == null && req.body.comment == null) {
			return res.status(500).json({
				error: "Paramètres manquants"
			})
		}

		const name = req.body.name
		const comment = req.body.comment

		async.waterfall([
			(done: any) => {
				Application.findByPk(applicationId)
					.then((applicationFound: Application) => {
						done(null, applicationFound)
					})
					.catch(error => {
						console.log(error)
						return res.status(500).json({ error: 'Impossible de vérifier l\'application' })
					})
			}, (applicationFound: Application, done: any) => {
				if (applicationFound) {
					applicationFound.update({
						name: name,
						comment: comment
					})
						.then((applicationFound: Application) => {
							done(applicationFound)
						})
						.catch(error => {
							console.log(error)
							return res.status(500).json({ error: 'Impossible de vérifier l\'application' })
						})
				} else {
					return res.status(500).json({ error: 'l\'id ne correspond à aucune application' })
				}
			}
		], (applicationFound: Application) => {
			if (applicationFound) {
				return res.status(200).json({ message: 'Application modifié avec succès' })
			} else {
				return res.status(500).json({ error: 'Impossible de connecter l\'utilisateur' })
			}
		})

	}

	/**
	 * @method delete
	 * @description this method is used to delete a specific application
	 * @param {Request} req the request instance
	 * @param {Response} res the response instance
	 * @readonly
	 * @public
	 * @returns {Response}
	 */
	public readonly delete: (req: Request, res: Response) => void = (req: Request, res: Response): Response => {
		const authorization = req.headers.authorization
		const userId = JWTUtils.getUserFromToken(authorization)

		if (userId < 0) return res.status(400).json({ error: 'Token invalide' })

		const targetUserId = Number.parseInt(req.params.userId)
		const applicationId = Number.parseInt(req.params.applicationId)

		if (Number.isNaN(targetUserId) || targetUserId <= 0 || userId !== targetUserId) return res.status(400).json({ error: 'id de l\'utilisateur invalide' })

		if (Number.isNaN(applicationId) || applicationId <= 0) return res.status(400).json({ error: 'id de l\'application invalide' })

		async.waterfall([
			(done: any) => {
				Application.findByPk(applicationId)
					.then((applicationFound: Application) => {
						done(null, applicationFound)
					})
					.catch(error => {
						console.log(error)
						return res.status(500).json({ error: 'Impossible de vérifier l\'application' })
					})
			}, (applicationFound: Application, done: any) => {
				if (applicationFound) {

					//Deleting the application in the file system
					fs.rm(process.env.APK_STORAGE.replace('/', path.sep) + targetUserId + path.sep + applicationFound.hash + '.apk', (err) => {
						console.log(err)
					})
					applicationFound.destroy()
						.then(() => {
							done(null)
						})
						.catch(error => {
							console.log(error)
							return res.status(500).json({ error: 'Impossible de supprimer l\'application' })
						})
				} else {
					return res.status(400).json({ error: 'l\'id ne correspond à aucune application' })
				}
			}
		], () => {
			return res.status(200).json({
				message: 'Application supprimée avec succès',
			})
		})
	}

	/**
	 * @method getAll
	 * @description this method is used to get all the applications
	 * @param {Request} req the request instance
	 * @param {Response} res the response instance
	 * @readonly
	 * @public
	 * @returns {Response}
	 */
	public readonly getAll: (req: Request, res: Response) => void = (req: Request, res: Response): Response => {
		const username = req.body.username
		const password = req.body.password

		if (req.body.username == null || req.body.password == null) {
			return res.status(500).json({
				error: "Paramètres manquants"
			})
		}

		async.waterfall([
			(done: any) => {
				User.findOne({
					where: { username: username }
				})
					.then((userFound: User) => {
						done(null, userFound)
					})
					.catch(error => {
						console.log(error)
						return res.status(500).json({ error: 'Impossible de vérifier l\'utilisateur' })
					})
			}, (userFound: User, done: any) => {
				if (userFound) {
					bcrypt.compare(password, userFound.password, (error: Error, result: boolean) => {
						console.log(error)
						done(null, userFound, result)
					})
				} else {
					return res.status(500).json({ error: 'Nom d\'utilisateur incorrect' })
				}
			}, (userFound: User, result: boolean, done: any) => {
				if (result) {
					done(userFound)
				} else {
					return res.status(403).json({ error: 'Mot de passe incorrect' })
				}
			}
		], (userFound: User) => {
			if (userFound) {
				return res.status(200).json({
					userId: userFound.id,
					token: JWTUtils.generateTokenForUser(userFound)
				})
			} else {
				return res.status(500).json({ error: 'Impossible de connecter l\'utilisateur' })
			}
		})

	}

	/**
	 * @method verify
	 * @description this method is used to verify a specific application
	 * @param {Request} req the request instance
	 * @param {Response} res the response instance
	 * @readonly
	 * @public
	 * @returns {Response}
	 */
	public readonly verify: (req: Request, res: Response) => void = (req: Request, res: Response): Response => {

		const hash = req.body.hash

		if (hash === null) return res.status(400).json({ error: "Paramètres manquants" })

		const authorization = req.headers.authorization
		const userId = JWTUtils.getUserFromToken(authorization)

		if (userId < 0) return res.status(400).json({ error: 'Token invalide' })

		const targetUserId = Number.parseInt(req.params.userId)
		const applicationId = Number.parseInt(req.params.applicationId)

		if (Number.isNaN(targetUserId) || targetUserId <= 0 || userId !== targetUserId) return res.status(400).json({ error: 'id de l\'utilisateur invalide' })

		if (Number.isNaN(applicationId) || applicationId <= 0) return res.status(400).json({ error: 'id de l\'application invalide' })

		let isVirus: boolean = null

		async.waterfall([
			(done: any) => {
				Application.findOne({
					where: { hash: hash }
				})
					.then((applicationFound: Application) => {
						done(null, applicationFound)
					})
					.catch(error => {
						console.log(error)
						return res.status(500).json({ error: 'Impossible de vérifier l\'application' })
					})
			}, (applicationFound: Application, done: any) => {
				if (applicationFound) {
					const virusToptalService = new VirusToptalApi(applicationFound.hash, targetUserId)
					virusToptalService.uploadApplication()
						.then(() => {
							virusToptalService.verifyApplication()
								.then(value => {
									console.log(value.data.data.attributes.status)
									if (value.data.data.attributes.status === 'completed') {
										isVirus = (value.data.data.attributes.stats.suspicious > 0 || value.data.data.attributes.stats.malicious > 0)
									}
									if (isVirus == null) {
										console.log('fail ' + isVirus)
										done(applicationFound)
									} else {
										console.log('pass ' + isVirus)
										applicationFound.update({ status: isVirus ? 'Virus' : 'Sûre' })
											.then((applicationFound: Application) => {
												done(applicationFound)
											})
											.catch(error => {
												console.log(error)
												return res.status(500).json({ error: 'Impossible de vérifier l\'application' })
											})
									}
								})
								.catch(error => {
									console.log(error)
								})
						})
						.catch(error => {
							console.log(error)
						})
				} else {
					return res.status(500).json({ error: 'l\'id ne correspond à aucune application' })
				}
			}
		], (applicationFound: Application) => {
			if (applicationFound) {
				return res.status(200).json({ message: isVirus == null ? 'Application non vérifié' : 'Application vérifié avec succès', isVerified: isVirus == null ? false : true })
			} else {
				return res.status(500).json({ error: 'Impossible de connecter l\'utilisateur' })
			}
		})

	}

	/**
	 * @method verify
	 * @description this method is used to download a specific application
	 * @param {Request} req the request instance
	 * @param {Response} res the response instance
	 * @readonly
	 * @public
	 * @returns {Response}
	 */
	public readonly download: (req: Request, res: Response) => void = (req: Request, res: Response): Response => {

		const authorization = req.headers.authorization
		const userId = JWTUtils.getUserFromToken(authorization)

		if (userId < 0) return res.status(400).json({ error: 'Token invalide' })

		const targetUserId = Number.parseInt(req.params.userId)
		const applicationId = Number.parseInt(req.params.applicationId)

		if (Number.isNaN(targetUserId) || targetUserId <= 0 || userId !== targetUserId) return res.status(400).json({ error: 'id de l\'utilisateur invalide' })

		if (Number.isNaN(applicationId) || applicationId <= 0) return res.status(400).json({ error: 'id de l\'application invalide' })

		async.waterfall([
			(done: any) => {
				Application.findByPk(applicationId)
					.then((applicationFound: Application) => {
						done(null, applicationFound)
					})
					.catch(error => {
						console.log(error)
						return res.status(500).json({ error: 'Impossible de vérifier l\'application' })
					})
			}, (applicationFound: Application, done: any) => {
				if (applicationFound) {
					done(applicationFound)
				} else {
					return res.status(500).json({ error: 'l\'id ne correspond à aucune application' })
				}
			}
		], (applicationFound: Application) => {
			const appName = applicationFound.name || applicationFound.hash
			return res.download(process.env.APK_STORAGE.replace('/', path.sep) + userId + path.sep + applicationFound.hash + '.apk', appName + '.apk', (error) => {
				if (error) console.log(error)
			})
		})

	}

}