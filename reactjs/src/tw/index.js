
import { post } from '../shared/http'

const account = (url, key) => post('/tw/account', { url: url, key: key })

export { account }