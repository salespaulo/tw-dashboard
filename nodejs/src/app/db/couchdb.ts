
import * as nano from 'nano'
import * as config from 'config'

import logger from '../log'
import { merge, inspect } from '../utils/objects'

import * as Agent from 'agentkeepalive'

const couchdb: any = nano({
    url: config.get('db.host'),
    log: (id, args) => 
        logger.silly(`CouchDB id="${inspect(id)}" args="${inspect(args)}"`),
    requestDefaults : { 
        agent : new Agent({
            maxSockets: 50,
            maxKeepAliveRequests: 0,
            maxKeepAliveTime: 30000
        })
    },
})

const create = dbname => couchdb.db.create(dbname, (err, body) => {
    if (err) {
      if (err.error === 'file_exists') {
        logger.silly(`CouchDB create db=${dbname} error=${inspect(err)}`)
      } else {
        logger.error(`CouchDB create db=${dbname} error=${inspect(err)}`)
      }
    } else logger.info(`CouchDB create db=${dbname} successfuly!`)
})

create('users')
create('tenancies')
create('schedules')
create('products')
create('prices')
create('sales')

export default (dbname: string): nano.DocumentScope<any> => couchdb.use(dbname)