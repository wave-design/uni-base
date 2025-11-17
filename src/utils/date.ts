import dayjs from 'dayjs'

/**
 * 格式化时间
 * @param {string | Date} date - 需格式化的时间，可以是字符串或Date对象
 * @param {string} [format] - 时间格式，默认为"YYYY-MM-DD"
 * @returns {string} 返回格式化后的时间字符串
 */
export function formatDate(date: string | Date, format: string = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format)
}

/**
 * 格式化时间
 * @param {string | number} value - 日期值，可以是时间戳或日期字符串
 * @param {string} [format] - 格式化字符串，支持 YYYY(年)、MM(月)、DD(日)、HH(时)、mm(分)、ss(秒)、SSS(毫秒)
 * @returns {string} 返回格式化后的时间字符串
 */
export function formatTime(value: string | number, format: string = 'YYYY-MM-DD'): string {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  const hours = `0${date.getHours()}`.slice(-2)
  const minutes = `0${date.getMinutes()}`.slice(-2)
  const seconds = `0${date.getSeconds()}`.slice(-2)
  const milliseconds = `00${date.getMilliseconds()}`.slice(-3)

  const formattedTime = format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
    .replace('SSS', milliseconds)

  return formattedTime
}
