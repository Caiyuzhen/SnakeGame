//引入一个 node.js 模块包
const path = require('path')

//引入 html-webpack 插件(名字可自定义)
const HTMLWebpackPlugin = require('html-webpack-plugin')

//引入 clean 插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')



//👇 webpack 的所有配置信息都写在这里
module.exports = {
  
  entry: './src/index.ts',//指定入口文件(主文件)
  output: {//指定打包文件（打包后放在哪里）
    path: path.resolve(__dirname, 'dist'), //打包后的目录(__dirname 表示会自动拼接目录的路径名称)
    filename: 'bundle.js',// 打包后的文件名称
    environment:{//配置打包环境（用来兼容 ie）
      arrowFunction: false //🔥不使用箭头函数
    }
  },
  mode: 'production',//指定打包模式(development 开发模式，开发模式，production 生产模式)

  //如何编译？指定打包时使用的模块
  module: {
    rules: [//指定要用到的 loader，加载的规则
      {  
        test: /\.ts?$/,//指定规则生效的文件(用正则表达式) 来匹配所有的 ts 或 tsx 文件
        use: [// 要使用的 loader 加载器（比如加载资源？）
          {
            loader:"babel-loader",//指定加载器
            options:{//设置 babel要兼容哪些浏览器
                presets:[//预定义的环境（来假设我们的代码要在种环境去运行）
                  [
                    "@babel/preset-env",//指定 @babel/preset-env 这个环境插件
                    
                    {//指定配置信息
                      targets:{//代码要兼容哪些浏览器上
                        "chrome":"88",
                        // "ie":"11"   //超老版本
                      },
                      "corejs":"3",//用哪个版本的 js 来做兼容
                      "useBuiltIns":"usage"//🔥🔥使用 core js 的方式,"usage" 表示按需加载,不需要一次性引入所有 core js, 影响性能, 用了哪个新功能就兼容哪个
                    }
                  ]
                ]
            }
          },'ts-loader'], //因为加载器是从后往前执行的，所以这里先加载 ts-loader，把 ts 转为 js ，然后再用 js 去适配浏览器！
        // 指定要排除的文件（一般排除node_modules)
        exclude: /node_modules/
      },
      {
        //指定设置 less 文件的 loader
        test: /\.less$/,
        use: [ //⚠️⚠️，loader 的执行顺序是由下往上
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ],
  },

  //🔥🔥配置 webpack 插件
  plugins: [
    new HTMLWebpackPlugin( //将会自动执行一个插件，生成一个 index.html 文件
      {  
        template: './src/index.html', // title:"这是一个自定义的 title", 这是编译后的 html title , 指定要使用的模板 html 文件
      }),
    new CleanWebpackPlugin(), //每次编译前会先自动清除 dist 目录下的所有文件,
  ],
  
  resolve:{//🔥🔥设置要解析的 ts 模块，否则 export 的 ts 没法被 import  
    extensions:['.ts', '.js', '.jsx'], //⚡️⚡️哪些文件能被 export 【很关键！】
  }
}
