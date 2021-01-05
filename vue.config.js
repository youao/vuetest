module.exports = {
    publicPath: process.env.VUE_APP_PUBLICPATH,
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // sass 全局变量
                    resources: ['./src/assets/css/var.scss']
                })
                .end()
        })
    }
}