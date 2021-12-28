export function mapMenusToRoutes(userMenus) {
  let routes = []
  const allRoutes = []

  return new Promise((resolve) => {
    // 找到 router/main 目录下的 .js 文件
    const modules = import.meta.glob('../router/main/*/*/*.js')
  
    for (const path in modules) {
      modules[path]().then((mod) => {
        mod.default.path = '/' + mod.default.path
        allRoutes.push(mod.default)
        if (allRoutes.length === Object.keys(modules).length) {
          resolve(allRoutes)
        }
      })
    }
  })
  // require.context 是 webpack 的函数啊！！！而我们当前是 vite 啊！！！
}
