export function noop() {
  return false
}

// 转译换行
export function toHtml(v) {
  if (!v) {
    return ''
  }
  v = `${v}`
  // v = v.replace(/\\n/gm, '<br>')
  v = v.replace(/\n|\\n|↵/g, '<br>')
  // v = v.replace(/↵/gm, '<br>')
  return v || ''
}

/**
 * uuid
 */
export function uuid(): string {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

/**
 * 延时指定的时间后执行回调函数
 * @param delay - 延时时间（毫秒）
 */
export function delay(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

/**
 * 克隆对象
 * @param obj 要克隆的对象
 * @returns 克隆后的对象
 */
export function clone(obj: any): any {
  if ([null, undefined, Number.NaN, false].includes(obj))
    return obj
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    return obj
  }
  const o = Array.isArray(obj) ? [] : {}
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      o[i] = typeof obj[i] === 'object' ? clone(obj[i]) : obj[i]
    }
  }
  return o
}

/**
 * 合并两个对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
export function merge(target: Record<string, any> = {}, source: Record<string, any> = {}): Record<string, any> {
  target = clone(target)
  if (typeof target !== 'object' || typeof source !== 'object')
    return {}
  for (const prop in source) {
    if (!Object.prototype.hasOwnProperty.call(source, prop))
      continue
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop]
      }
      else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop]
        }
        else {
          if (target[prop]?.concat && source[prop]?.concat) {
            target[prop] = target[prop].concat(source[prop])
          }
          else {
            target[prop] = merge(target[prop], source[prop])
          }
        }
      }
    }
    else {
      target[prop] = source[prop]
    }
  }
  return target
}

/**
 * 加载脚本的方法，返回一个Promise对象。
 * @param {string} url - 要加载的脚本的URL。
 */
export function loadScript(url: string, force = false) {
  return new Promise<void>((resolve, reject) => {
    // 检查是否已经加载过相同的脚本
    if (!force) {
      const scripts: any = document.getElementsByTagName('script')
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === url && scripts[i].loaded) {
          resolve() // 已加载过，直接解析Promise
          return
        }
      }
    }

    // 创建新的脚本元素
    const script: any = document.createElement('script')
    script.src = url

    script.onload = () => {
      script.loaded = true
      resolve()
    }

    script.onerror = () => {
      reject(new Error(`加载脚本失败: ${url}`))
    }

    document.head.appendChild(script)
  })
}

/**
 * 将 URL 参数转换为对象
 * @param url - URL 参数字符串，默认为空字符串
 */
export function urlParamsToObject(url = ''): Record<string, any> {
  let params = {}
  // #ifdef H5
  decodeURIComponent(url || window.location.href).replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (params[k] = v))
  // #endif
  // #ifndef H5
  try {
    const queryString = url.includes('?') ? url.split('?')[1] : url // 获取 ? 后面的部分,如果没有?则使用整个url

    if (queryString) {
      const pairs = queryString.split('&') // 按 & 分割成参数对

      pairs?.forEach((pair) => {
        const [key, value] = pair.split('=') // 按 = 分割成键值对
        const decodedKey = decodeURIComponent(key) // 解码键
        const decodedValue = decodeURIComponent(value) // 解码值

        // 如果参数已经存在，转为数组以存储多个值
        if (params[decodedKey]) {
          if (Array.isArray(params[decodedKey])) {
            params[decodedKey].push(decodedValue)
          }
          else {
            params[decodedKey] = [params[decodedKey], decodedValue]
          }
        }
        else {
          params[decodedKey] = decodedValue
        }
      })
    }
  }
  catch (error) {
    params = {}
  }

  // #endif
  return params
}

/**
 * 对象转换为url参数
 * @description 对象转换为url参数
 * @param object 对象
 * @param isPrefix 是否自动加上?号，默认为true
 * @return url参数字符串
 */
export function objectToUrlParams(object = {}, isPrefix = true) {
  const prefix = isPrefix ? '?' : ''
  const _result = []
  for (const key in object) {
    const value = object[key]
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      continue
    }
    if (value.constructor === Array) {
      value?.forEach((_value) => {
        _result.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(_value)}`)
      })
    }
    else {
      _result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }
  return _result.length ? prefix + _result.join('&') : ''
}

/**
 * 对小于10的数补0
 * @param num 数字
 */
export function padZeroIfLessThanTen(num: string | number): string {
  if (Number(num) < 10)
    return `0${num}`
  return num.toString()
}

/**
 * 在数字后面补零直到达到指定的总长度。
 * @param number 需要被补零的原始数字。
 * @param targetLength 期望的最终字符串总长度。
 */
export function padWithZeroes(number: number | string, targetLength: number) {
  let numberStr = String(number)
  const zeroesNeeded = targetLength - numberStr.length
  if (zeroesNeeded > 0) {
    numberStr = numberStr + '0'.repeat(zeroesNeeded)
  }
  return numberStr
}

/**
 * 函数防抖 短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行
 * @param Function func 目标函数
 * @param Number wait 延迟执行毫秒数
 * @param Booleans immediate true - 立即执行， false - 延迟执行
 */
let timeout = null
export function debounce(func: (...args: any[]) => any, wait: number = 500, immediate: boolean = false): void {
  // 清除定时器
  if (timeout !== null)
    clearTimeout(timeout)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    const callNow = !timeout
    timeout = setTimeout(() => {
      timeout = null
    }, wait)
    if (callNow)
      typeof func === 'function' && func()
  }
  else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(() => {
      if (typeof func === 'function') {
        func()
        timeout = null
      }
    }, wait)
  }
}

/**
 * 函数节流 连续触发事件但是在 n 秒中只执行一次函数。即 2n 秒内执行 2 次
 * @param Function func 函数
 * @param Number wait 延迟执行毫秒数
 * @param Number type 1 表时间戳版，2 表定时器版
 */

let timer: any, flag: boolean
export function throttling(func: (...args: any[]) => any, wait: number = 500, immediate: boolean = true): void {
  if (immediate) {
    if (!flag) {
      flag = true
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func()
      timer = setTimeout(() => {
        flag = false
      }, wait)
    }
  }
  else {
    if (!flag) {
      flag = true
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(() => {
        flag = false
        typeof func === 'function' && func()
      }, wait)
    }
  }
}
