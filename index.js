import fs from 'fs/promises'
import { transform } from '@babel/core'
import vue3Jsx from '@vue/babel-plugin-jsx'
import TS from '@babel/plugin-syntax-typescript'

const isTS = (id) => /\.tsx?$/.test(id)

export default (options) => {
  return {
    name: 'esbuild-plugin-jsx',
    setup(build) {
      build.onLoad({ filter: /\.[jt]sx$/ }, async (args) => {
        const fileId = args.path
        const source = await fs.readFile(fileId, 'utf8')
        const transformOptions = {
          babelrc:    false,
          configFile: false,
          plugins:    [
            [ vue3Jsx, options ]
          ],
          sourceFileName: args.path
        }
        const _isTs = isTS(fileId)
        _isTs && transformOptions.plugins.push([ TS, { isTSX: true } ])
        const result = transform(source, transformOptions)
        if (result?.code) {
          return {
            contents: result.code,
            loader:   _isTs ? 'ts' : 'js'
          }
        }
      })
    }
  }
}