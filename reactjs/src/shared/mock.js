
import MockAdapter from 'axios-mock-adapter'
import mocks from './mock.json'

const isMock = false && process.env.NODE_ENV === 'development'
                || process.env.NODE_ENV === 'test'

export default axios => {
    if (!isMock) return axios

    const mock = new MockAdapter(axios, { delayResponse: 200 })
    mock.onAny().reply(config => {
        const findMock = mocks.find(m => m.method === config.method.toUpperCase() && m.url === config.url)
        return findMock ? [findMock.code, findMock.response] : [500, {}]
    })

    return axios
}
