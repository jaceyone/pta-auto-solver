# CodeMirror 6 注入与代码输入方案

PTA 平台的代码编辑区基于 CodeMirror 6（简称 CM6）。由于安全和防作弊限制，直接修改 DOM 的 `.cm-content` 或调用一般的 `type_text` 会导致光标错位、丢失缩进，甚至在提交时被判定为空代码。

## 注入原理

CodeMirror 6 采用状态与视图分离的设计。其底层编辑状态由 `EditorView` 管理，挂载在 DOM 节点的特定属性上。通过调用 `EditorView.dispatch()` 发送一个事务（Transaction），可以直接更新编辑器内容而不会破坏内部状态。

在 PTA 页面中，CM6 的 `EditorView` 实例通常挂载在 `.cm-editor` 元素的 `cmView` 属性上。

## 注入脚本逻辑

1. 定位到 `.cm-editor` 节点。
2. 查找该节点上的 `cmView` 属性，或从子节点/父节点寻找已初始化的 `EditorView` 实例：
   `const view = document.querySelector('.cm-editor').cmView.view;`
3. 构造更新事务：
   ```javascript
   view.dispatch({
     changes: { from: 0, to: view.state.doc.length, insert: codeText }
   });
   ```
4. 这将清空编辑器并插入最新的 `codeText`，同时保留代码高亮、大括号自动对齐和换行符。
