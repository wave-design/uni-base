import vitePluginBundleObfuscator from "vite-plugin-bundle-obfuscator"

export default function createTransform() {
  return process.env.UNI_PLATFORM === "h5"
    ? vitePluginBundleObfuscator({
        excludes: [],
        enable: true,
        log: true,
        autoExcludeNodeModules: false,
        threadPool: false,
        options: {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 1,
          deadCodeInjection: false,
          debugProtection: false,
          debugProtectionInterval: 0,
          disableConsoleOutput: false,
          identifierNamesGenerator: "hexadecimal",
          log: false,
          numbersToExpressions: false,
          renameGlobals: false,
          selfDefending: true,
          simplify: true,
          splitStrings: false,
          stringArray: false, // 注意此处一定要设置为false
          stringArrayCallsTransform: false,
          stringArrayCallsTransformThreshold: 0.5,
          stringArrayEncoding: [],
          stringArrayIndexShift: true,
          stringArrayRotate: true,
          stringArrayShuffle: true,
          stringArrayWrappersCount: 1,
          stringArrayWrappersChainedCalls: true,
          stringArrayWrappersParametersMaxCount: 2,
          stringArrayWrappersType: "variable",
          stringArrayThreshold: 0.75,
          unicodeEscapeSequence: false,
        },
      })
    : null
}
