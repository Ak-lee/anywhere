const http = require('http')
const conf = require('./config/defaultConf')
const chalk = require('chalk')
const path = require('path')
const router = require('./helper/router')

const server = http.createServer((req, res) => {
    console.log('接受到一次请求')
    const filePath = path.join(conf.root, req.url)
    router(req, res, filePath)
})

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`
    console.log(`server at: ${chalk.green(addr)}`)
})