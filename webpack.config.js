const htmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: __dirname + "/src/main.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            //modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        //name: '[path][name].[ext]',
                        name: '[name].[ext]', //最后生成的文件名是 output.path+ outputPaht+ name，[name],[ext],[path]表示原来的文件名字，扩展名，路径
                        //useRelativePath:true,
                        outputPath: 'img/' // 后面的/不能少生成图片的文件名
                    }
                },
            },
            {
                test: /\.(html|htm)$/,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                },
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            hash: false,
            minify: {
                removeAttributeQuotes: false //生成的index是否去掉引号
            },
            template: './src/index.html', //指定生成模板
            htmlWebpackPlugin: {
                files: {
                    js: ['bundle.js'] //生成文件里插入JS文件
                }
            }
        })
    ]
}