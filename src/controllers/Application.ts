import User from '../models/User'
import { Request, Response } from 'express'
import * as async from 'async'
import * as bcrypt from 'bcrypt'
import JWTUtils from '../utils/JWTUtils'
import Application from 'models/Application'


export class ApplicationController {
    public readonly add: (req: Request, res: Response) => void = (req: Request, res: Response) => {
        //FIXME handle the request and insert the data here
        const targetUserId = Number.parseInt(req.params.userId)

        return res.status(200).json('Application téléchargé avec succès')

    }

    public readonly update: (req: Request, res: Response) => void = (req: Request, res: Response) => {
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

    public readonly delete: (req: Request, res: Response) => void = (req: Request, res: Response) => {
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

    public readonly getAll: (req: Request, res: Response) => void = (req: Request, res: Response) => {
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

}