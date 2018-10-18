
import Api from '.'

import * as express from 'express'

import { request } from '../utils/http'

import { sendHttpResponse } from '../utils/errors'

const URI = '/tw'

class TeamWorkApi implements Api {
    routes() {
        return express.Router()
            .post('/account', (req, res, next) => {
                const url = req.body.url
                const key = req.body.key
                console.log('>>>>>>> body', req.body)

                request({
                    auth: {
                        username: key,
                        password: 'xxx'
                    },
                    method: 'get',
                    url: url + '/account.json'
                })
                .then(o => {
                    console.log('>>>>', o)
                    return o
                })
                .then(data => res.json(data))
                .catch(err => {
                    console.log('>>>>> ERROR>>>> ', err)
                    sendHttpResponse(err, res, next)
                })
            })
    }
}

const api = new TeamWorkApi()

export default server => server.use(URI, api.routes())