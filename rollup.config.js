const nodeResolve = require('@rollup/plugin-node-resolve')
const typescript = require('rollup-plugin-typescript2')
const postcss = require('rollup-plugin-postcss')
const { terser } = require('rollup-plugin-terser')
const autoprefixer = require('autoprefixer')
const { resolve } = require('path')

const input = './src/index.ts'

const external = [
    'antd',
    'classnames',
    'react',
    'react-dom'
]

module.exports = [
    {
        input,
        output: [
            {
                dir: 'dist/umd',
                format: 'umd',
                name: 'AntdEasyForm',
                globals: {
                    'antd': 'antd',
                    'react': 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        ],
        plugins: [
            typescript(),
            postcss({
                extensions: ['.less'],
                minimize: true,
                extract: true,
                plugins: [
                    autoprefixer()
                ]
            }),
            terser()
        ],
        external
    },
    {
        input,
        output: [
            {
                dir: 'dist',
                format: 'es'
            }
        ],
        plugins: [
            nodeResolve(),
            typescript(),
            postcss({
                extensions: ['.less'],
                minimize: false,
                extract: false,
                plugins: [
                    autoprefixer()
                ]
            }),
        ],
        external
    }
]
