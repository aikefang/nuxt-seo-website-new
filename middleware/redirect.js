function getMachine(req) {
  var deviceAgent = req.headers["user-agent"].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  if (agentID) {
    return 'Mobile';
  } else {
    return 'PC';
  }
}
let getUrl = (route) => {
  switch (route.name) {
    case 'article-id':
      return route.fullPath
    case 'index':
      return route.fullPath
    default:
      return '/'
  }
}
let redirectUrl = ({ host, type, route }) => {
  if (type === 'Mobile' && host === 'www.webascii.cn') {
    console.log('移动端 - 域名：www.webascii.cn')
    return 'https://m.webascii.cn' + getUrl(route)
  }
  if (type === 'PC' && host === 'm.webascii.cn') {
    console.log('PC端 - 域名：m.webascii.cn')
    return 'https://www.webascii.cn' + getUrl(route)
  }
  return false
}
export default function ({
                           isStatic,
                           isDev,
                           isHMR,
                           app,
                           store,
                           payload,
                           error,
                           base,
                           env,
                           req,
                           res,
                           redirect,
                           beforeNuxtRender,
                           next,
                           _redirected,
                           _errored,
                           route,
                           params,
                           query,
                           $axios
                         }) {
  if (!req) {
    return
  }
  let equipmentTyle = getMachine(req)
  let url = redirectUrl({
    host: req.headers.host,
    type: equipmentTyle,
    route
  })
  if (url) {
    redirect(url)
  }
}