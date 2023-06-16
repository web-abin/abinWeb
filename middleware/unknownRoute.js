/**
 *   未知路由重定向 404页面
 */
export default ({store, route, redirect}) => {
  if (!route.matched.length) {
    redirect('/404')
  }
}

