const path = require('path')

const mime = {
    'css': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'icon': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg',
    'js': 'text/javascript',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'swf': 'application/x-shockwave-flash/',
    'tiff': 'image/tiff',
    'txt': 'text/plain',
    'wav': 'audio/x-wave',
    'wma': 'audio/x-ms-wma',
    'wmv': 'audio/x-ms-wmv',
    'xml': 'text/xml'
};
module.exports = function(filePath) {
    var ext = path.extname(filePath).split('.').pop().toLowerCase() // 删除数组的最后一个元素并返回被删除的这个元素
    if(!ext){
        ext = 'txt'
    }

    return  {
        contentType: mime[ext] || mime['txt'],
        icon: mime[ext] ? ext : 'txt',
    }
}