const fs = require('fs')
const Handlebars = require('handlebars')
const path = require('path')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config = require('../config/defaultConf')
const mime = require('./mime')
const compress = require('./compress')
const isFresh = require('./cache')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())


module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath)
        if(stats.isFile()) {
            const contentType = mime(filePath).contentType
            if(isFresh(stats, req, res)) {
                console.log('返回 304 了')
                res.statusCode = 304
                res.end()
                return ;
            }
            console.log(isFresh(stats, req, res))
            console.log('返回 200 了')
            res.statusCode = 200
            res.setHeader('Content-Type', contentType)
            var rs = fs.createReadStream(filePath)
            if(filePath.match(config.compress)) {
                rs = compress(rs,req, res)
            }
            rs.pipe(res)
        } else if(stats.isDirectory()) {
            const files = await readdir(filePath)
            for (var i =0; i<files.length; i++){
                let testPath = path.join(filePath, files[i])
                let stats = await stat(testPath)
                if(stats.isDirectory()){
                    files[i] = {
                        file: files[i],
                        icon: 'dir'
                    }
                }else{
                    files[i] = {
                        file: files[i],
                        icon: mime(files[i]).icon
                    }
                }
            }
            const dir = path.relative(config.root, filePath)

            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files,
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(template(data))
        }
    } catch (error) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end(`${filePath} is not a directory or file`)
        return ;
    }
}