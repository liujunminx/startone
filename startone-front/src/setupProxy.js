const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')

const app = express()

app.use(
    'api',
    createProxyMiddleware({
        target: 'http://startone:9999/api',
        changeOrigin: true
    })
)

app.listen(3000)