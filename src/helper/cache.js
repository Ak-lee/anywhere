const { maxAge } = require('../config/defaultConf')

function refreshRes(stats, res) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
    res.setHeader('Last-Modified', stats.mtime.toUTCString())
    // 生成 ETag 的包很多,这里是简单的处理
    res.setHeader('ETag', `${stats.size}`)
}

module.exports = function isFresh(stats, req, res) {
    refreshRes(stats, res)
    const lastModified = req.headers['if-modified-since']
    const etag = req.headers['if-none-match']
    if(!lastModified && !etag) {
        // 第一次请求
        return false
    }
    if(lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return false
    }
    if(etag && etag !== res.getHeader('ETag')) {
       return false
    }

    return true
}