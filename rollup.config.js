import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

let pkg = require('./package.json')
let external = Object.keys(pkg.dependencies)
let plugins = [
  resolve(),
  babel(),
  commonjs(),
  terser({
    sourcemap: true
  })
]

export default [
  {
    input: 'src/index.js',
    plugins,
    external,
    output: [
      {
        file: 'dist/things-scene-table.js',
        name: 'things-scene-table',
        format: 'umd',
        globals: {
          '@hatiolab/things-scene': 'scene'
        },
        sourcemap: true
      }
    ]
  },
  {
    input: 'src/index.js',
    plugins,
    external,
    output: [
      {
        file: 'dist/things-scene-table.mjs',
        format: 'esm',
        sourcemap: true
      }
    ]
  }
]
