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
    'moment',
    'react',
    'react-dom'
]

// globals for umd
const globals = {
    'antd': 'antd',
    'classnames': 'classNames',
    'moment': 'moment',
    'react': 'React',
    'react-dom': 'ReactDOM'
}

const extensions = [ '.js', '.jsx', '.ts', '.tsx' ]

const plugins = [
    nodeResolve({
        customResolveOptions: {
            moduleDirectory: 'src',
        },
        extensions,
    }),
    babel({
        babelrc: false,
        presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript'
        ],
        plugins: [
            '@babel/plugin-proposal-export-default-from'
        ],
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
                globals
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
    // esm
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
                extract: true,
                plugins: [
                    autoprefixer()
                ]
            }),
        ],
        external
    }
]
