const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const rfs = require("rfs");

// ヘッダーとフッターの内容を読み込み
const head = fs.readFileSync(path.resolve(__dirname, 'src/templates/head.html'), 'utf8');
const header = fs.readFileSync(path.resolve(__dirname, 'src/templates/header.html'), 'utf8');
const footer = fs.readFileSync(path.resolve(__dirname, 'src/templates/footer.html'), 'utf8');

// HTMLファイルの情報をオブジェクトで管理
const htmlFiles = [
  { filename: 'index.html', template: './src/index.html', title: 'ユニヴィスの補助金申請支援 - 戦略・人財・会計・ITコンサルタントの総合力で貴社の補助金採択をサポートいたします。' },
  { filename: 'thanks/index.html', template: './src/contact/thanks.html', title: 'お問い合わせありがとうございます - ユニヴィスの補助金申請支援' }
];

// HtmlWebpackPluginのインスタンス生成用の配列を作成
const htmlWebpackPlugins = htmlFiles.map(file => {
  return new HtmlWebpackPlugin({
    title: file.title,
    filename: file.filename,
    template: file.template,
    head: head,
    header: header,
    footer: footer,
    minify: false,
  });
});

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'js/bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // CSSを別ファイルに抽出
          'css-loader',
          {
            loader: "postcss-loader", // PostCSS
            options: {
              postcssOptions: {
                plugins: [
                  rfs({
                    baseValue: 20,
                    unit: "rem",
                    breakpoint: 1200,
                    breakpointUnit: "px",
                    factor: 10,
                    remValue: 16,
                    twoDimensional: false,
                    class: false,
                    safariIframeResizeBugFix: false,
                    unitPrecision: 5,
                    functionName: "rfs",
                    enableRfs: true,
                    mode: "min-media-query",
                  }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...htmlWebpackPlugins, // HtmlWebpackPluginのインスタンスを展開して追加
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/img', to: 'img' }, // src/imgをdist/imgにコピー
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
