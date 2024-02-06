//@ts-check
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import { defineConfig } from 'rollup';
import replace from '@rollup/plugin-replace'
import { readFileSync } from 'fs';
import { join } from 'path';
const configTs = JSON.parse(readFileSync(join(__dirname, './tsconfig.json')).toString())
const /** @type {Record<string, any>} */ env = {}
readFileSync(join(__dirname, `.env.local`)).toString().split('\n').map(s => s.split('=')).map(v => env[v[0]] = v[1])
export default defineConfig({
  input: './src/main.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].js',
  },
  plugins: [
    resolve(),
    commonjs(),
    replace({
      preventAssignment: true,
      ...env
    }),
    typescript(configTs),
    json(),
    cleanup(),
    // terser()
  ]
})
