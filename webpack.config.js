// noinspection JSUnusedGlobalSymbols

const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globby = require('globby');
const path = require('path');
const { DefinePlugin } = require('webpack');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isProd = process.env.NODE_ENV === 'production';

function browserConfig(source) {
    function getEntries(patterns) {
        return globby.sync(patterns, { cwd: `src/${source}` })
            .reduce((prev, curr) => {
                const entryName = curr.split('.')[0];
                if (entryName !== 'shims-vue') {
                    prev[entryName] = `./${curr}`;
                }
                return prev;
            }, {});
    }

    const entries = getEntries(['./*.ts']);

    let plugins = [
        new VueLoaderPlugin(),
        ...Object.keys(entries).map((entryName) =>
            new HtmlWebpackPlugin({
                filename: `${entryName}.html`,
                chunks: [entryName],
                title: entryName,
                template: 'template.html'
            })
        ),
        new DefinePlugin({
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(!isProd)
        }),
        ...(isProd ? [] : [
            new LiveReloadPlugin({
                port: 0,
                appendScriptTag: true
            }),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    extensions: {
                        vue: {
                            enabled: true,
                            compiler: '@vue/compiler-sfc'
                        }
                    }
                }
            }),
        ])
    ];

    return {
        context: path.resolve(__dirname, `src/${source}`),
        mode: isProd ? 'production' : 'development',
        target: 'web',
        entry: {
            ...entries
        },
        output: {
            path: path.resolve(__dirname, source),
            filename: 'js/[name].js'
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.json'],
            alias: {
                vue: 'vue/dist/vue.runtime.esm-bundler.js',
            },
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: `${__dirname}/tsconfig-browser.json`
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        appendTsSuffixTo: [/\.vue$/],
                        configFile: 'tsconfig-browser.json'
                    }
                }
            ]
        },
        plugins,
        optimization: (isProd) ? {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    common: {
                        minChunks: 2
                    },
                    defaultVendors: false,
                    default: false
                }
            }
        } : undefined
    };
}

const extensionConfig = {
    entry: './src/extension/index.ts',
    resolve: {
        extensions: ['.js', '.ts', '.json'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: 'tsconfig-extension.json'
            })
        ]
    },
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'extension'),
        library: {
            type: 'commonjs2'
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: '/node_modules',
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig-extension.json',
                    transpileOnly: true
                }
            }
        ]
    },
    plugins: isProd ? [] : [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: 'tsconfig-extension.json',
                extensions: {
                    vue: {
                        enabled: true,
                        compiler: '@vue/compiler-sfc'
                    }
                },
                configOverwrite: {
                    exclude: [
                        'node_modules',
                        '**/jest.config.ts',
                        '**/__mocks__/**/*.ts',
                        '**/__tests__/**/*.ts'
                    ]
                }
            }
        })
    ],
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    externals: [nodeExternals()],
    externalsPresets: { node: true }
};

module.exports = [
    browserConfig('graphics'),
    browserConfig('dashboard'),
    extensionConfig
];
