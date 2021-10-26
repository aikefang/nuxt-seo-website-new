// 获取ID地址，用于判断是否为服务器
function getIPAdress() {
  let interfaces = require('os').networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
let config = {}
if (getIPAdress() == '172.30.253.123') { // 服务器
  config = require('/home/wwwroot/global-config/prod-config.js')
} else { // 本地
  config = require('/Users/kyle/global-config/local-config.js')
}
let qiniuTool = require('qiniu-tool')
let fs = require('fs')
// 获取时间戳
let getTimeStamp = async () => {
  let content = await getFileContent()
  return JSON.parse(content).publicPath.replace('https://static.webascii.cn/webascii/business/', '').replace('/', '')
}
// 获取文件内容
let getFileContent = () => {
  return new Promise((resolve, reject) => {
    // 读取json文件
    fs.readFile('.nuxt/dist/server/client.manifest.json', 'utf-8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

let upload = async () => {
  let timeStamp = await getTimeStamp()
  config['www.webascii.cn'].qiniu.randomNumber = timeStamp
  qiniuTool.config(config['www.webascii.cn'].qiniu)
  qiniuTool.upload()
}
upload()
