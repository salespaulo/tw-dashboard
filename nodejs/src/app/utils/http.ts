
import axios from 'axios'

import logger from '../log'

const NetworkError = Error

const throwError = error => {
    throw new NetworkError(`Network status=${error.status} error=${error.data}`)
}

const padronize = (res, uri, body = null) => {
    if (body) console.log('Api uri=', uri, 'body=', body, 'response=', res)
    else console.log('Api uri=', uri, 'response=', res)

    if (res.status / 100 === 2) { // HttpStatus 200 >= x <=299
        return res.data
    }

    throwError(error(res, uri, body))
}

const error = (err, uri, body = null) => {
    if (err.response) err = err.response
    const status = err.status

    if (body) logger.error('Api uri=', uri, 'body=', body, 'status=', status, 'error=', JSON.stringify(err))
    else logger.error('Api uri=', uri, 'status=', status, 'error=', JSON.stringify(err))

    if (status === 401) {
        return { status: 401, statusText: "Unauthorized", data: err.data };
    } else if (status === 404) {
        return { status: 404, statusText: "NotFound", data: err.data };
    } else if (status / 100 === 3) {
        return { status: 300, statusText: "Redirect", data: err.data };
    } else if (status / 100 === 4) {
        return { status: 400, statusText: "BadRequest", data: err.data };
    } else if (status / 100 === 5) {
        return { status: 500, statusText: "InternalServer", data: err.data };
    }

    return { status: -1, statusText: 'Unknown', data: err }
}

/* public */
const request = config => {
    return axios(config)
        .then(res => padronize(res, config.url))
        .catch(err => error(err, config))
}

export { request }
