type Handler = (...args: any[]) => void

const events = new Map()
export class Mitt {
  private namespace: string

  constructor(name: string = 'global') {
    this.namespace = name
  }

  /**
   * 生成带命名空间名称
   * @param name 事件名称
   */
  private name(name: string) {
    return `${this.namespace}.${name}`
  }

  /**
   * 初始化事件
   * @param list 事件列表
   */
  init(list: { [key: string]: Handler }) {
    if (list) {
      for (const key in list) {
        this.on(this.name(key), list[key])
      }
    }
  }

  // 设置命名空间
  setNamespace(name: string) {
    this.namespace = name
  }

  /**
   * 监听事件
   * @param name 事件名称
   * @param handler 事件处理函数
   */
  on(name: string, handler: Handler) {
    const handlers = events.get(this.name(name))
    if (handlers) {
      handlers.push(handler)
    }
    else {
      events.set(this.name(name), [handler])
    }
  }

  /**
   * 监听事件，但仅触发一次，在第一次触发之后移除该监听器
   * @param name 事件名称
   * @param handler 事件处理函数
   */
  once(name: string, handler: Handler) {
    const wrappedHandler = (...args: any[]) => {
      handler(...args)
      const handlers = events.get(this.name(name))
      handlers?.splice(handlers.indexOf(wrappedHandler) >>> 0, 1)
    }
    const handlers = events.get(this.name(name))
    if (handlers) {
      handlers.push(wrappedHandler)
    }
    else {
      events.set(this.name(name), [wrappedHandler])
    }
  }

  /**
   * 移除事件监听
   * @param name 事件名称
   * @param handler 事件处理函数，如果不传，则移除该事件名称的所有处理函数
   */
  off(name: string, handler?: Handler) {
    const handlers = events.get(this.name(name))
    if (handlers) {
      if (handler) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1)
      }
      else {
        events.set(this.name(name), [])
      }
    }
  }

  /**
   * 触发事件
   * @param name 事件名称
   * @param args 事件参数
   */
  emit(name: string, ...args: any[]) {
    let handlers = events.get(this.name(name))
    if (handlers) {
      handlers.slice()?.forEach((handler: Handler) => {
        if (typeof handler === 'function')
          handler(...args)
      })
    }

    handlers = events.get('*')
    if (handlers) {
      handlers.slice()?.forEach((handler: Handler) => {
        if (typeof handler === 'function')
          handler(this.name(name), ...args)
      })
    }
  }

  /**
   * 清空所有事件
   */
  clear(name: string = '') {
    const keys = Array.from(events.keys())
    for (const key of keys) {
      if (key.includes(name || this.namespace)) {
        events.delete(key)
      }
    }
  }
}

export default Mitt
