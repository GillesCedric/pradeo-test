import * as async from 'async'
import * as multer from 'multer'
import * as path from 'path'
import * as fs from 'fs'
import Application from '../models/Application'
import User from '../models/User'
import Hash from '../utils/Hash'
import { NextFunction, Request, Response } from 'express'
import JWTUtils from '../utils/JWTUtils'

/**
 * @class Multer
 * @author Gilles Cédric
 * @description this class is used to represent the Multer middleware
 * @exports
 * @default
 * @abstract
 * @since 26/05/2022
 */
export default abstract class Multer {

	/**
	 * @method storage
	 * @description this method is used to define the filename and the destination for the uploaded files
	 * @readonly
	 * @private
	 * @static
	 * @returns {multer.StorageEngine}
	 */
	private static readonly storage = (): multer.StorageEngine => multer.diskStorage({
		destination: (req, file, callback) => {
			const destination = process.env.APK_STORAGE.replace('/', path.sep) + req.params.userId + path.sep
			if (!fs.existsSync(destination)) fs.mkdirSync(destination, { recursive: true })
			callback(null, destination)
		},
		filename: (req, file, callback) => {
			const hash = Hash.hash(file.originalname)
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
							callback(new Error('Impossible de vérifier l\'application'), hash + '.apk')
						})
				}, (applicationFound: Application, done: any) => {
					if (applicationFound) callback(new Error('L\'application existe déjà sur le serveur'), hash + '.apk')
					else User.findByPk(req.params.userId)
						.then((userFound: User) => {
							done(null, userFound)
						})
						.catch(error => {
							console.log(error)
							callback(new Error('Impossible de vérifier l\'utilisateur'), hash + '.apk')
						})
				}, (userFound: User, done: any) => {
					if (userFound) userFound.createApplication({
						hash: hash,
						status: 'En cours de vérification',
					})
						.then((applicationCreated: Application) => {
							done(applicationCreated)
						})
						.catch(error => {
							console.log(error)
							callback(new Error('Impossible de créer l\'application'), hash + '.apk')
						})
					else callback(new Error('L\'utilisateur n\'existe pas'), hash + '.apk')
				}
			], (applicationCreated: Application) => {
				if (applicationCreated) callback(null, hash + '.apk')
				else callback(new Error('Impossible de créer l\'application'), hash + '.apk')
			})
		}
	})

	/**
	 * @method fileFilter
	 * @description this method is used to define the filter for the uploaded files
	 * @param {Request} req the request instance
	 * @param {Express.Multer.File} file the uploaded file
	 * @param { multer.FileFilterCallback} callback the callback function
	 * @readonly
	 * @private
	 * @static
	 * @returns {void}
	 */
	private static readonly fileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback): void => {
		//TODO improve the filter
		if (file.originalname.endsWith('.apk') && file.mimetype.startsWith('application')) callback(null, true)
		else callback(new Error('Le fichier envoyé n\'est pas un fichier apk valide'))
	}

	/**
	 * @method upload
	 * @description this method is used to instanciate the multer middleware
	 * @readonly
	 * @public
	 * @static
	 * @returns {multer.Multer}
	 */
	public static readonly upload = (): multer.Multer => {
		let multerMiddleware: multer.Multer
		try {
			multerMiddleware = multer({
				storage: this.storage(),
				fileFilter: this.fileFilter
			})
		} catch (error) {
			console.log(error)
		}
		return multerMiddleware
	}

	/**
	 * @method makeMulterUploadMiddleware
	 * @description this method is used to do some verifications before the upload of the file
	 * @param {any} multerUploadFunction the multer upload function
	 * @readonly
	 * @public
	 * @static
	 * @returns {(req: Request, res: Response, next: NextFunction) => void}
	 */
	public static readonly makeMulterUploadMiddleware = (multerUploadFunction: any): (req: Request, res: Response, next: NextFunction) => void => {
		return (req: Request, res: Response, next: NextFunction) =>
			multerUploadFunction(req, res, (err: any) => {
				//Middleware for some verification before the Multer middleware
				const authorization = req.headers.authorization
				const userId = JWTUtils.getUserFromToken(authorization)

				if (userId < 0) return res.status(400).json({ error: 'Token invalide' })

				const targetUserId = Number.parseInt(req.params.userId)

				if (Number.isNaN(targetUserId) || targetUserId <= 0 || userId !== targetUserId) return res.status(400).json({ error: 'id de l\'utilisateur invalide' })

				// handle Multer error
				if (err && err.name && err.name === 'MulterError') {
					return res.status(500).send({
						error: err.name,
						message: `File upload error: ${err.message}`,
					})
				}
				// handle other errors
				if (err) {
					return res.status(500).send({
						error: 'FILE UPLOAD ERROR',
						message: `Something wrong ocurred when trying to upload the file`,
					})
				}

				next()
			})
	}

}