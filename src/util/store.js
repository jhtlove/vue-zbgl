export default{
    fetch(STORAGE_KEY){
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)||'[]')
    },
    set(STORAGE_KEY,items){
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(items))
    },
    
    sessionSet: function (name, data) {
      window.sessionStorage.removeItem(name)
      window.sessionStorage.setItem(name, JSON.stringify(data))
    },
    // 获取缓存
    sessionGet: function (name) {
      return JSON.parse(window.sessionStorage.getItem(name))
    },
    // 清除缓存
    sessionRemove: function (name) {
      window.sessionStorage.removeItem(name)
    },
    // ==================localStorage设置缓存==================
    // 设置缓存
    localSet: function (name, data) {
      window.localStorage.removeItem(name)
      window.localStorage.setItem(name, JSON.stringify(data))
    },
    // 获取缓存
    localGet: function (name) {
        return JSON.parse(window.localStorage.getItem(name))
    },
    // 清除缓存
    localRemove: function (name) {
      window.localStorage.removeItem(name)
    }
}
