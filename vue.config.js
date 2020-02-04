module.exports = {
    configureWebpack: (config) => {
        config.entry.app = process.env.NODE_ENV === 'production' ? './src/main.js' : './src/main.js';
    },
    publicPath: '/',
    devServer: {
        port:8090,
        compress: true,
        open:true,
        disableHostCheck: true,
        proxy: {
            '/api/demo': {
                // target: 'http://s.ngrok.zonybir.com',
                target: 'http://127.0.0.1:8009',
                //target: 'http://10.7.24.178:15000',
                // target: 'http://10.7.130.46:8888',
                changeOrigin: true,
                pathRewrite: {
                    '/api/demo': ''
                }
            }
        }
    }
}