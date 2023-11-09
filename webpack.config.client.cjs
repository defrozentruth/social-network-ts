const TerserPlugin = require("terser-webpack-plugin");
const {resolve} = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = [
    {
        entry: {
            index: './client/scripts/index.ts',
        },
        output: {
            filename: '[name].js',
            path: resolve(__dirname,'build/client/scripts')
        },
        resolve: {
            extensions: ['.ts', '.js', '.less'],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: ['babel-loader', 'ts-loader'],
                    exclude: /node_modules/
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'data', // Путь к папке со статическими файлами
                        to: '../server/data', // Путь, куда копировать файлы (в директорию build)
                    },
                    {
                        from: 'ssl_keys',
                        to: '../server/ssl_keys',
                    },
                    {
                        from: './client/views',
                        to: '../views'
                    }
                ],
            }),
        ],
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
        },
        mode: 'production'
    },
    {
        entry: {
            style: './client/styles/style.less', // Путь к вашему LESS-файлу
        },
        output: {
            path: resolve(__dirname,'build/client/styles')
        },
        resolve: {
            extensions: ['.less'],
        },
        module: {
            rules: [
                // Загрузчик для LESS
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader, // Используйте MiniCssExtractPlugin.loader вместо style-loader
                        'css-loader', // Для обработки CSS
                        'less-loader' // Для компиляции LESS в CSS
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',// Имя выходного CSS-файла
            }),
        ],
        mode: 'production',
    },
]