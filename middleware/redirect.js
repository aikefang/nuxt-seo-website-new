function getMachine(req) {
  let deviceAgent = req.headers["user-agent"].toLowerCase();
  let agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  if (agentID) {
    return 'Mobile';
  } else {
    return 'PC';
  }
}

let getUrl = (route) => {
  switch (route.name) {
    case 'article-id':
      return {
        type: 4,
        url: `/m/article/${route.params.id}/`
      }
    case 'index':
      return {
        type: 3,
        url: `/m/`
      }
    case 'm':
      return {
        type: 1,
        url: `/`
      }
    case 'm-article-id':
      return {
        type: 2,
        url: `/article/${route.params.id}/`
      }
    default:
      return {
        type: 0,
        url: '/'
      }
  }
}

let redirectUrl = ({equipmentType, type, route}) => {
  // 移动端 访问了PC首页
  if (equipmentType === 'Mobile' && type === 3) {
    return getUrl(route, type).url
  }
  // 移动端 访问了PC文章详情页
  if (equipmentType === 'Mobile' && type === 4) {
    return getUrl(route, type).url
  }
  // PC端 访问了移动端首页
  if (equipmentType === 'PC' && type === 1) {
    return getUrl(route, type).url
  }
  // PC端 访问了移动端文章详情页
  if (equipmentType === 'PC' && type === 2) {
    return getUrl(route, type).url
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
                           $axios,
                           ctx
                         }) {
  if (!req) {
    return
  }
  let equipmentType = getMachine(req)
  let data = getUrl(route)
  if (data.type > 0) {
    const url = redirectUrl({
      type: data.type,
      equipmentType,
      route
    })
    if (url) {
      redirect(url)
    }
  }
}
