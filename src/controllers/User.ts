import User from '../models/User'
import { Request, Response } from 'express'
import * as async from 'async'
import * as bcrypt from 'bcrypt'
import JWTUtils from '../utils/JWTUtils'
import Application from '../models/Application'


export class UserController {

    private readonly EMAIL_REGEX: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    private readonly PASSWORD_REGEX = /^(?=.*\d).{4,12}$/

    public readonly login: (req: Request, res: Response) => void = (req: Request, res: Response) => {

        if (req.body.username == null || req.body.password == null) {
            return res.status(500).json({
                error: "Paramètres manquants"
            })
        }

        const username = req.body.username
        const password = req.body.password

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

    public readonly register: (req: Request, res: Response) => void = (req: Request, res: Response) => {

        if (req.body.username == null || req.body.password == null || req.body.email == null) {
            return res.status(400).json({ error: "Paramètres manquants" })
        }

        const username = req.body.username
        const password = req.body.password
        const email = req.body.email

        if (!this.EMAIL_REGEX.test(email)) {
            return res.status(400).json({ error: "L'adresse mail n'est pas valide" })
        }

        //Uncomment this block to add the password regex verification

        // if (!this.PASSWORD_REGEX.test(password)) {
		// 	return res.status(400).json({ 'error': 'Mot de passe invalide (il doit être entre 4 et 12 caractères et contenir aumoins un caractère spécial)' });
		// }

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
                        console.log(error)
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
                        return res.status(500).json({ error: 'impossible d\'enregistrer l\'utilisateur' });
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

    public readonly get: (req: Request, res: Response) => void = (req: Request, res: Response) => {
        const authorization = req.headers.authorization
        const userId = JWTUtils.getUserFromToken(authorization)

        if (userId < 0) return res.status(400).json({ error: 'Token invalide' })

        const targetUserId = Number.parseInt(req.params.userId)

        if (Number.isNaN(targetUserId) || targetUserId <= 0) return res.status(400).json({ error: 'id de l\'utilisateur invalide' })

        //TODO check if the user is admin
        //if(userId != req.params['userId'] as unknown as number) return res.status(400).json({error: 'Token invalide'})

        async.waterfall([
            (done: any) => {
                User.findOne({
                    attributes: ['id', 'username', 'email', 'avatar'],
                    where: { id: targetUserId },
                    include: [{
                        model: Application,
                        attributes: ['id', 'hash', 'name', 'comment', 'status']
                    }]
                })
                    .then((userFound: User) => {
                        done(userFound)
                    })
                    .catch(error => {
                        console.log(error)
                        return res.status(500).json({ error: 'Impossible de vérifier l\'utilisateur' })
                    })
            }],
            (userFound: User) => {
                if (userFound) {
                    return res.status(200).json({ user: userFound })
                } else {
                    return res.status(500).json({ error: 'L\'utilisateur n\'existe pas' })
                }
            })


    }

    public readonly getAll: (req: Request, res: Response) => void = (req: Request, res: Response) => {
        const username = req.body.username
        const password = req.body.password

        if (req.body.username == null || req.body.password == null || req.body.email == null) {
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
                        console.log('error:' + error)
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

}