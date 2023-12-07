# akashic-keyboard-plugin

<p align="center">
<img src="https://github.com/akashic-games/akashic-keyboard-plugin/blob/main/img/akashic.png"/>
</p>

**akashic-keyboard-plugin** は、キーボード入力を取り扱うためのakashicゲーム向け操作プラグインです。

実装例は [サンプル](./sample) ディレクトリ以下にあるサンプルプロジェクトを参照してください。

## 利用方法

### インストール

[akashic-cli](https://github.com/akashic-games/akashic-cli)をインストールした後、

```sh
akashic install @akashic-extension/akashic-keyboard-plugin
```

でインストールできます。

### コンテンツへの適用

akashic-keyboard-plugin は、akashicゲームの操作プラグインです。

本プラグインをコンテンツへ登録し利用するには `g.OperationPluginManager#register() `を利用します。
`g.OperationPluginManager#register()` の第一引数にはプラグインのコンストラクタ、第二引数には識別コードを指定する必要があります。
識別コードは対象のプラグインを開始/停止する操作に必要となります。

```javascript
const { KeyboardOperationPlugin } = require("@akashic-extension/akashic-keyboard-plugin");
...
g.game.operationPluginManager.register(KeyboardOperationPlugin, 1); // プラグインを識別コード 1 で 登録
g.game.operationPluginManager.start(1); // プラグインを開始
...

g.game.operationPluginManager.stop(1) // プラグインを停止
```

## 仕様

### data

akashic-keyboard-plugin は、DOM の keydown, keyup の各イベントを契機に `g.OperationEvent` を生成してゲームに通知します。
akashic-keyboard-plugin が通知する `g.OperationEvent#data` は、次の名前のプロパティと対応する値を持つオブジェクトです。

- type
  - 文字列
  - "keydown", "keyup" のいずれか
- code
- shiftKey
- altKey
- ctrlKey
- metaKey
  - それぞれ KeyboardEvent の同名のプロパティ
  - 詳細は https://developer.mozilla.org/ja/docs/Web/API/KeyboardEvent などを参照してください

## ビルド方法

**akashic-keyboard-plugin** はTypeScriptで書かれたjsモジュールであるため、ビルドにはNode.jsが必要です。

`npm run build` によりビルドできます。

```sh
npm install
npm run build
```

## テスト方法

```sh
npm test
```

## ライセンス
本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](https://github.com/akashic-games/akashic-keyboard-plugin/blob/main/LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。
