module.exports = {
    root: process.cwd(),
    hostname: '127.0.0.1',
    port: 8080,
    compress: /\.(html|js|css|md)/,
    maxAge: 600,    // 缓存设置10分钟, 600秒
}