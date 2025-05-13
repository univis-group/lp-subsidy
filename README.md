## 概要
univis.co.jp/site/lp-subsidy について扱う。  
主にwebpackによる静的HTMLとメールフォームプロCGIによって構成される。

### 開発ルール
以下のREADME.mdを参照のこと  
<https://github.com/univis-group/docs-server/>  
ただし、WordPressを利用しないことやwebpackによりソースコードを処理していることから、サーバー上のファイルとの一致確認は省略することを検討すべきである。（GitHubのmasterが常に最新であると信用すべき）

### 主なパッケージ
| パッケージ | 機能 |
|:-----------|:------------|
|  tailwind  |  CSSフレームワーク  |
|  alpinejs  |  JSフレームワーク（状態保持や状態に応じた処理等）  |
|  aos  |  シンプルなJSアニメーション  |
|  body-scroll-lock  |  モバイルでのスクロール制御  |
|  domurl  |  URLオブジェクトの操作  |
|  font-awesome  |  アイコン  |
|  gsap  |  複雑なJSアニメーション  |
|  moveto  |  内部リンクのスクロール  |

### コマンド
`npm start` 開発サーバー起動  
`npm run build` 本番資源出力

### ブラウザキャッシュ対策
js, cssに関してはwebpackでファイル名にハッシュを追加する設定をしている  
html内のimgはパラメータ追加などの対策必要

### 構成のポイント
webpackにおいて`src/templates`内の生htmlを各htmlに挿入することでhead等を共通化している。  
環境依存のURIは`src/app.js`でDOM構築後に動的に挿入している。  
`mailform/`はwebpack管理外である。  
本番環境では `dist`内の各資源 + `mailform/` の構成で稼働している。  
開発環境ではmailformは動作しない。

### 理解のポイント
mfp（mailformpro）の一部CSSを上書きするために`src/css/input.css`でmfpのCSSと同じセレクタにスタイルを定義している。  
mfpの設定箇所は`mailform/mailformpro/config.cgi`で十分である。  
`src/contact/index.html`でname属性に日本語を使用しているのは、mfpがエラーメッセージなどユーザーの見えるところに出力するからである。  
フォーム送信で500エラーとなる場合はサーバーのパーミッション、javascriptエラーとなる場合はコード内におけるjs記述不足の可能性を考える。
mailformpro.cgiのパーミッションは755

### その他
なし