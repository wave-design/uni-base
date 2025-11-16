import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

// 基础配置文件生成脚本

// 获取当前文件的目录路径（替代 CommonJS 中的 __dirname）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 从 manifest.config.ts 获取配置（失败时回退为空对象）
async function loadManifestFromConfig() {
  try {
    const server = await createServer({ configFile: false, logLevel: 'error', envDir: './env' })
    const mod = await server.ssrLoadModule('/manifest.config.ts')
    await server.close()
    return mod?.default ?? {}
  }
  catch {
    return {}
  }
}
const pages = {
  pages: [
    {
      path: 'pages/tabbar/home/index',
      type: 'home',
      style: {
        navigationBarTitleText: '首页',
      },
    },
    {
      path: 'pages/tabbar/person/index',
      type: 'page',
      style: {
        navigationBarTitleText: '我的',
      },
    },
  ],
  subPackages: [],
}

// 统一的 JSON 写入函数：文件不存在或为空时才写入，避免覆盖
function ensureJSON(filePath, data) {
  const write = () => fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
  if (!fs.existsSync(filePath))
    return write()
  try {
    const content = fs.readFileSync(filePath, 'utf-8').trim()
    if (!content || content === '{}' || content === '[]')
      write()
  }
  catch {
    write()
  }
}

// 解析目标路径并确保目录存在（递归创建，无需额外判断）
const srcDir = path.resolve(__dirname, '../src')
fs.mkdirSync(srcDir, { recursive: true })

const pagesPath = path.join(srcDir, 'pages.json')
const manifestPath = path.join(srcDir, 'manifest.json')

// 执行生成（仅在缺失或空文件时写入）
async function run() {
  const manifest = await loadManifestFromConfig()
  ensureJSON(manifestPath, manifest)
  ensureJSON(pagesPath, pages)
}

await run()
