const { KeyboardOperationPlugin } = require("@akashic-extension/akashic-keyboard-plugin");

const game = g.game;
const code = 1;

// プラグインの登録
game.operationPluginManager.register(KeyboardOperationPlugin, code);

module.exports = () => {
  const scene = new g.Scene({ game });

  scene.onStateChange.add((state) => {
    if (state === "active") {
      // プラグインの開始
      game.operationPluginManager.start(code);
    } else if (state === "deactive") {
      // プラグインの停止
      game.operationPluginManager.start(code);
    }
  });

  const font = new g.DynamicFont({
    game,
    fontFamily: ["Courier", "Courier New", "Consolas", "Menlo", "Andale Mono", "monospace"],
    size: 30,
  });

  scene.onLoad.addOnce(() => {
    const lineHeight = 24;

    const container = new g.E({
      scene,
      width: g.game.width,
      height: g.game.height,
    });
    scene.append(container);

    const createCursor = () => {
      const cursor = new g.Label({
        scene,
        font,
        text: "█",
        fontSize: 20,
        textColor: "#666",
      });

      let currentCount = 0;
      let blinkDuration = 15;
      let isVisible = true;

      cursor.onUpdate.add(() => {
        if (currentCount++ % blinkDuration === 0) {
          isVisible = !isVisible;
          cursor.opacity = isVisible ? 1 : 0;
          cursor.modified();
        }
      });
      return cursor;
    };

    const cursor = createCursor();
    container.append(cursor);

    /** @type {g.Label[]} */
    const labels = [];

    const createLabel = () => {
      const label = new g.Label({
        scene,
        font,
        x: 30,
        y: 30,
        text: "",
        fontSize: 20,
        height: 20,
        textColor: "black",
      });
      labels.push(label);
      container.append(label);
      return label;
    };

    const getCurrentLabel = () => {
      return labels.at(-1);
    };

    const popCurrentLabel = () => {
      if (1 < labels.length) {
        const l = labels.pop();
        l.destroy();
      }
    };

    /**
     * @param {g.Label} label
     */
    const measureText = (label) => {
      const { width } = font.measureText(label.text);
      return ((width * label.fontSize) / font.size) | 0;
    };

    const trackCursor = () => {
      const currentLabel = getCurrentLabel();
      cursor.x = currentLabel.x + measureText(currentLabel);
      cursor.y = currentLabel.y;
      cursor.modified();

      // ページスクロール
      if (game.height < cursor.y + lineHeight) {
        container.y = game.height - (cursor.y + lineHeight);
      }
    };

    createLabel();
    trackCursor();

    // OperationEvent のハンドリング
    scene.onOperation.add((e) => {
      if (e.code !== code) return;

      const currentLabel = getCurrentLabel();

      if (e.data.type === "keydown") {
        const key = e.data.key;
        if (key === "Backspace") {
          if (currentLabel.text === "") {
            popCurrentLabel();
          } else {
            currentLabel.text = currentLabel.text.slice(0, -1);
          }
        } else if (key === "Enter") {
          const label = createLabel();
          label.y = currentLabel.y + lineHeight;
        } else if (key === "Shift") {
          //
        } else if (key === "Control") {
          //
        } else if (key === "Alt") {
          //
        } else if (key === "Escape") {
          //
        } else if (key === "Tab") {
          //
        } else if (key === "Meta") {
          //
        } else if (key === "CapsLock") {
          //
        } else if (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowRight" || key === "ArrowLeft") {
          //
        } else if (
          key === "F1" ||
          key === "F2" ||
          key === "F3" ||
          key === "F4" ||
          key === "F5" ||
          key === "F6" ||
          key === "F7" ||
          key === "F8" ||
          key === "F9" ||
          key === "F10" ||
          key === "F11" ||
          key === "F12"
        ) {
          //
        } else {
          currentLabel.text += key;
        }
        currentLabel.invalidate();
        trackCursor();
      }
    });
  });

  game.pushScene(scene);
};
