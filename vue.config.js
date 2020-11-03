const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },

    devServer: {
        proxy: "http://localhost:8081" // 对应的是反向代理的地址
    }
};