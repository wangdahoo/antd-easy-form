import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'

const input = './src/index.ts'

const external = [
    'antd',
    'classnames',
    'react',
    'react-dom'
]

const extensions = [ '.js', '.jsx', '.ts', '.tsx' ]

const plugins = [
    nodeResolve({
        customResolveOptions: {
            moduleDirectory: 'src',
        },
        extensions,
    }),
    babel({
        exclude: 'node_modules/**',
        extensions,
    }),
]

export default [
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
            ...plugins,
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
            ...plugins,
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
