let qiniuTool = require('qiniu-tool')
let config = require('/Users/kyle/global-config/global-config.js')
console.log(config['www.webascii.cn'].qiniu)
qiniuTool.config({
  ak: config['www.webascii.cn'].qiniu.ak, // 七牛AccessKey
  sk: config['www.webascii.cn'].qiniu.sk, // 七牛SecretKey
  scope: 'webascii', // 七牛存储空间名称
  /**
   * 机房	Zone对象
   * 华东	qiniu.zone.Zone_z0
   * 华北	qiniu.zone.Zone_z1
   * 华南	qiniu.zone.Zone_z2
   * 北美	qiniu.zone.Zone_na0
   */
  zone: 'Zone_z1', // 七牛空间（默认Zone_z1）
  type: '.css|.js|.woff|.woff2|.ttf|.eot|.jpg|.png|.gif|.svg|.json|.png|.jpg|', // 允许上传的文件类型（详情请查看下文文档）
  pathCDN: 'webascii/mavon-editor/', // 上传到CDN的路径
  pathLocal: '/Users/kyle/seo-web/nuxt-seo-website-new/upload-static/', // 源文件夹路径(相对路径和绝对路径都行)
  random: false, // 是否产生随机数
  // randomNumber: '66666', //随机数，默认自动生成，有randomNumber则不自动生成random
})
qiniuTool.upload()
