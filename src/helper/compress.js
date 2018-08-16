const { createGzip, createDeflate } = require('zlib')

module.exports = function(readStream, req, res) {
    const acceptEncoding = req.headers['accept-encoding']
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        return readStream
    } else if(acceptEncoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding', 'gzip')
        return readStream.pipe(createGzip())
    }else if(acceptEncoding.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding', 'deflate')
        return readStream.pipe(createDeflate())
    }
}