import User  from '../models/User'
import { Request, Response } from 'express'
import * as async from 'async'
import * as bcrypt from 'bcrypt'
import JWTUtils from '../utils/JWTUtils'


export class UserController{

    private readonly EMAIL_REGEX: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    public readonly login: (req: Request, res: Response) => void = (req: Request, res: Response) => {                
        const username = req.body.username
        const password = req.body.password

        if(req.body.username == null || req.body.password == null){
            return res.status(500).json({
                error: "Paramètres manquants"
            })
        }     

        async.waterfall([
            (done: any) => {
                User.findOne({
                    where: {username: username}
                })
                .then((userFound: User) => {
                    done(null, userFound)
                })
                .catch(error => {
                    console.log('error:' + error)
                    return res.status(500).json({error: 'Impossible de vérifier l\'utilisateur'})
                })
            }, (userFound: User, done: any) => {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, (error: Error, result: boolean) => {
                        console.log(error)
                        done(null, userFound, result)
                    })
                }else{
                    return res.status(500).json({error: 'Nom d\'utilisateur incorrect'})
                }
            }, (userFound: User, result: boolean, done: any) => {
                if(result){
                    done(userFound)
                }else{
                    return res.status(403).json({error: 'Mot de passe incorrect'})
                }
            }
        ], (userFound: User) => {
            if(userFound){
                return res.status(200).json({
                    userId: userFound.id,
                    token: JWTUtils.generateTokenForUser(userFound)
                })
            }else{
                return res.status(500).json({error: 'Impossible de connecter l\'utilisateur'})
            }
        })

    }

    public readonly register: (req: Request, res: Response) => void = (req: Request, res: Response) => {                

        if(req.body.username == null || req.body.password == null || req.body.email == null){
            return res.status(400).json({error: "Paramètres manquants"})
        }       

        const username = req.body.username
        const password = req.body.password
        const email = req.body.email

        if(!this.EMAIL_REGEX.test(email)){
            return res.status(400).json({error: "L'adresse mail n'est pas valide"})
        }

        async.waterfall([
			(done: any) => {
				User.findOne({
					attributes: ['email'],
					where: { email: email }
				})
					.then((userFound: User) => {
						done(null, userFound)
					})
					.catch((error: Error) => {
						console.log('error:' + error)
						return res.status(500).json({ error: 'impossible de vérifier l\'utilisateur' });
					});
			},
			(userFound: User, done: any) => {
				if (!userFound) {
					bcrypt.hash(password, 5, (error: Error, encryptedPassword: string) => {
                        console.log('error:' + error);
						done(null, userFound, encryptedPassword);
					});
				} else {
					return res.status(400).json({ 'error': 'l\'utilisateur existe déjà' });
				}
			},
			(userFound: User, encryptedPassword: string, done: any) => {
				User.create({
					username: username,
                    email: email,
                    password: encryptedPassword
				})
					.then((newUser: User) => {
						done(newUser);
					})
					.catch((error: Error) => {
						console.log('error:' + error);
						return res.status(500).json({error: 'impossible d\'enregistrer l\'utilisateur' });
					})
			}
		], (newUser: User) => {
			if (newUser) {
				return res.status(201).json({
					'userId': newUser.id
				});
			} else {
				return res.status(500).json({ 'error': 'impossible d\'enregistrer l\'utilisateur' });
			}
		})

    }

    public readonly add: (req: Request, res: Response) => void = (req: Request, res: Response) => {                
        const username = req.body.username
        const password = req.body.password

        if(req.body.username == null || req.body.password == null || req.body.email == null){
            return res.status(500).json({
                error: "Paramètres manquants"
            })
        }       

        async.waterfall([
            (done: any) => {
                User.findOne({
                    where: {username: username}
                })
                .then((userFound: User) => {
                    done(null, userFound)
                })
                .catch(error => {
                    console.log('error:' + error)
                    return res.status(500).json({error: 'Impossible de vérifier l\'utilisateur'})
                })
            }, (userFound: User, done: any) => {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, (error: Error, result: boolean) => {
                        console.log(error)
                        done(null, userFound, result)
                    })
                }else{
                    return res.status(500).json({error: 'Nom d\'utilisateur incorrect'})
                }
            }, (userFound: User, result: boolean, done: any) => {
                if(result){
                    done(userFound)
                }else{
                    return res.status(403).json({error: 'Mot de passe incorrect'})
                }
            }
        ], (userFound: User) => {
            if(userFound){
                return res.status(200).json({
                    userId: userFound.id,
                    token: JWTUtils.generateTokenForUser(userFound)
                })
            }else{
                return res.status(500).json({error: 'Impossible de connecter l\'utilisateur'})
            }
        })

    }

    public readonly get: (req: Request, res: Response) => void = (req: Request, res: Response) => {                
        const username = req.body.username
        const password = req.body.password

        if(req.body.username == null || req.body.password == null || req.body.email == null){
            return res.status(500).json({
                error: "Paramètres manquants"
            })
        }       

        async.waterfall([
            (done: any) => {
                User.findOne({
                    where: {username: username}
                })
                .then((userFound: User) => {
                    done(null, userFound)
                })
                .catch(error => {
                    console.log('error:' + error)
                    return res.status(500).json({error: 'Impossible de vérifier l\'utilisateur'})
                })
            }, (userFound: User, done: any) => {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, (error: Error, result: boolean) => {
                        console.log(error)
                        done(null, userFound, result)
                    })
                }else{
                    return res.status(500).json({error: 'Nom d\'utilisateur incorrect'})
                }
            }, (userFound: User, result: boolean, done: any) => {
                if(result){
                    done(userFound)
                }else{
                    return res.status(403).json({error: 'Mot de passe incorrect'})
                }
            }
        ], (userFound: User) => {
            if(userFound){
                return res.status(200).json({
                    userId: userFound.id,
                    token: JWTUtils.generateTokenForUser(userFound)
                })
            }else{
                return res.status(500).json({error: 'Impossible de connecter l\'utilisateur'})
            }
        })

    }

    public readonly getAll: (req: Request, res: Response) => void = (req: Request, res: Response) => {                
        const username = req.body.username
        const password = req.body.password

        if(req.body.username == null || req.body.password == null || req.body.email == null){
            return res.status(500).json({
                error: "Paramètres manquants"
            })
        }       

        async.waterfall([
            (done: any) => {
                User.findOne({
                    where: {username: username}
                })
                .then((userFound: User) => {
                    done(null, userFound)
                })
                .catch(error => {
                    console.log('error:' + error)
                    return res.status(500).json({error: 'Impossible de vérifier l\'utilisateur'})
                })
            }, (userFound: User, done: any) => {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, (error: Error, result: boolean) => {
                        console.log(error)
                        done(null, userFound, result)
                    })
                }else{
                    return res.status(500).json({error: 'Nom d\'utilisateur incorrect'})
                }
            }, (userFound: User, result: boolean, done: any) => {
                if(result){
                    done(userFound)
                }else{
                    return res.status(403).json({error: 'Mot de passe incorrect'})
                }
            }
        ], (userFound: User) => {
            if(userFound){
                return res.status(200).json({
                    userId: userFound.id,
                    token: JWTUtils.generateTokenForUser(userFound)
                })
            }else{
                return res.status(500).json({error: 'Impossible de connecter l\'utilisateur'})
            }
        })

    }

    public readonly update: (req: Request, res: Response) => void = (req: Request, res: Response) => {                
        const username = req.body.username
        const password = req.body.password

        if(req.body.username == null || req.body.password == null || req.body.email == null){
            return res.status(500).json({
                error: "Paramètres manquants"
            })
        }       

        async.waterfall([
            (done: any) => {
                User.findOne({
                    where: {username: username}
                })
                .then((userFound: User) => {
                    done(null, userFound)
                })
                .catch(error => {
                    console.log('error:' + error)
                    return res.status(500).json({error: 'Impossible de vérifier l\'utilisateur'})
                })
            }, (userFound: User, done: any) => {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, (error: Error, result: boolean) => {
                        console.log(error)
                        done(null, userFound, result)
                    })
                }else{
                    return res.status(500).json({error: 'Nom d\'utilisateur incorrect'})
                }
            }, (userFound: User, result: boolean, done: any) => {
                if(result){
                    done(userFound)
                }else{
                    return res.status(403).json({error: 'Mot de passe incorrect'})
                }
            }
        ], (userFound: User) => {
            if(userFound){
                return res.status(200).json({
                    userId: userFound.id,
                    token: JWTUtils.generateTokenForUser(userFound)
                })
            }else{
                return res.status(500).json({error: 'Impossible de connecter l\'utilisateur'})
            }
        })

    }

    public readonly delete: (req: Request, res: Response) => void = (req: Request, res: Response) => {                
        const username = req.body.username
        const password = req.body.password

        if(req.body.username == null || req.body.password == null || req.body.email == null){
            return res.status(500).json({
                error: "Paramètres manquants"
            })
        }       

        async.waterfall([
            (done: any) => {
                User.findOne({
                    where: {username: username}
                })
                .then((userFound: User) => {
                    done(null, userFound)
                })
                .catch(error => {
                    console.log('error:' + error)
                    return res.status(500).json({error: 'Impossible de vérifier l\'utilisateur'})
                })
            }, (userFound: User, done: any) => {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, (error: Error, result: boolean) => {
                        console.log(error)
                        done(null, userFound, result)
                    })
                }else{
                    return res.status(500).json({error: 'Nom d\'utilisateur incorrect'})
                }
            }, (userFound: User, result: boolean, done: any) => {
                if(result){
                    done(userFound)
                }else{
                    return res.status(403).json({error: 'Mot de passe incorrect'})
                }
            }
        ], (userFound: User) => {
            if(userFound){
                return res.status(200).json({
                    userId: userFound.id,
                    token: JWTUtils.generateTokenForUser(userFound)
                })
            }else{
                return res.status(500).json({error: 'Impossible de connecter l\'utilisateur'})
            }
        })

    }

}