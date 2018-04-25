
import logger from '../log'

import * as profileService from './profile-service'
import * as crypt from '../utils/crypto'
import * as jwt from '../utils/jwt'

import { merge, inspect } from '../utils/objects'
import { User, Session } from '../model/user'
import { 
    newNotFound, 
    newRequiredParameters, 
    newInvalidParameters, 
    sendHttpResponse 
} from '../utils/errors'

const getDomain = email => email.substring(email.lastIndexOf('@') + 1)

const getUsername = email => email.substring(1, email.lastIndexOf('@'))

const verifyToken = token => {
    const result = jwt.verify(token)
    logger.debug(`Token verify result=${inspect(result)}`)
    return result
}
  
const findById = (id: string): Promise<User> => new Promise((resolve, reject) => {
    if (!id) {
        return reject(newRequiredParameters(`id="${id}"`))
    }

    return Promise.resolve(new User())
})

const newUser = (name: string, email: string, password: string, photoUrl: string = null, 
        providerId: string = null): Promise<User> => new Promise((resolve, reject) => {

    if (!name || !email || !password) { 
        return reject(newRequiredParameters(`name=${name} email=${email} password=${password}`)) 
    }

    const toInsert = new User()
    toInsert._id = email
    toInsert.name = name || getUsername(email)
    toInsert.password = crypt.encode(password)
    toInsert.providerId = providerId || 'system'
    toInsert.photoUrl = photoUrl || 'http://www.gravatar.com/avatar/?d=mysteryman&s=50'
    toInsert.session = new Session()
    delete toInsert._rev

    logger.info(`Register new user=${inspect(toInsert)}`)

    return Promise.resolve(toInsert)
})

const login = (username, password, tenancyId: string = null)=> new Promise((resolve, reject) => {
    return findById(username)
        .then(user => {
            logger.debug(`Login findById id=${username} result=${inspect(user)}`)
            if (crypt.compare(password, user.password)) {
                logger.debug('Login crypt compare password OK!')
                jwt.sign({
                    id: user._id,
                    name: user.name
                })
                .then(token => {
                    logger.debug(`Login from user=${username} sign token=${token}`)
                    profileService.fromUserId(user._id, tenancyId)
                    .then(profiles => {
                        logger.debug(`Login from user=${username} profiles=${profiles}`)
                        user.profiles = profiles
                        user.session.logged = true
                        user.session.token = token
                        return Promise.resolve(user)
                    })
                    .catch(err => reject(
                        newInvalidParameters(`username=${username} profile error=${inspect(err)}`)))
                })
            } else reject(newInvalidParameters(`username=${username} with this password`))
        })
        .catch(err => reject(newNotFound('User', 'username', username)))
})

const forgotPassword = (email: string) => new Promise((resolve, reject) => {

})

export { 
    login, 
    newUser, 
    findById,
    forgotPassword, 
    verifyToken 
}
