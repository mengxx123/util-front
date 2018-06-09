let debug = process.env.NODE_ENV !== 'production'

let domain
if (process.env.NODE_ENV === 'production') {
    domain = {
        api: 'https://nodeapi.yunser.com',
        imgApi: 'https://nodeapi.yunser.com',
        img1: 'http://img1.yunser.com'
    }
} else {
    domain = {
        api: 'http://localhost:1026',
        // api: 'http://java.api.yunser.com/',
        // imgApi: 'https://nodeapi.yunser.com',
        imgApi: 'http://localhost:1026',
        img1: 'http://img1.yunser.com'
    }
}

module.exports = {
    debug,
    domain
}
