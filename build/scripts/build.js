/* eslint-disable */
const fs = require("fs")
const path = require("path")

// 获取命令行参数
const args = process.argv.slice(2)
const modeIndex = args.indexOf("--mode")
const env = modeIndex !== -1 ? args[modeIndex + 1] : ""

if (env) {
  const envFile = `.env.${env}`
  const envPath = path.join(__dirname, "..", "..", "env", envFile)
  const envVars = {}

  try {
    const envContent = fs.readFileSync(envPath, { encoding: "utf-8" })

    // 解析环境变量
    envContent.split("\n")?.forEach((line) => {
      const match = line.match(/^([^=]+)\s*=\s*['"]?([^'"]*?)['"]?$/)
      if (match) {
        const [, key, value] = match
        envVars[key.trim()] = value.trim()
      }
    })
  } catch (error) {
    console.error(`读取环境变量文件 ${envFile} 失败:`, error)
    process.exit(1)
  }

  try {
    const manifestPath = path.join(__dirname, "..", "..", "src", "manifest.json")
    const manifestContent = fs.readFileSync(manifestPath, { encoding: "utf-8" })
    const manifest = JSON.parse(manifestContent)
    // 根据环境变量设置 base 路径
    manifest.h5.router.base = envVars.VITE_BASE
    // 判断环境配置文件是否有APPID
    if (envVars.APPID) {
      manifest["mp-weixin"].appid = envVars.APPID
      // 读取并修改.minicirc文件
      const minicircPath = path.join(__dirname, "..", "..", ".minicirc")
      try {
        const minicircContent = fs.readFileSync(minicircPath, { encoding: "utf-8" })
        const minicirc = JSON.parse(minicircContent)

        // 修改微信小程序appid
        minicirc.weixin.appid = envVars.APPID

        // 如果存在PRIVATE_KEY_PATH则修改privateKeyPath
        if (envVars.PRIVATE_KEY_PATH) {
          minicirc.weixin.privateKeyPath = envVars.PRIVATE_KEY_PATH
        }

        // 写回文件
        fs.writeFileSync(minicircPath, JSON.stringify(minicirc, null, 2))
        console.log(`成功修改.minicirc中的weixin.appid为${envVars.APPID}`)
        console.log(`成功修改.minicirc中的weixin.privateKeyPath为${envVars.PRIVATE_KEY_PATH}`)
        console.log(`成功修改manifest.json中的mp-weixin.appid为${envVars.APPID}`)
      } catch (error) {
        console.error("修改.minicirc失败:", error)
        process.exit(1)
      }
    }

    // 写回文件
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 4))
    console.log(`成功修改manifest.json中的h5.router.base为${envVars.VITE_BASE}`)
  } catch (error) {
    console.error("修改manifest.json失败:", error)
    process.exit(1)
  }
}
