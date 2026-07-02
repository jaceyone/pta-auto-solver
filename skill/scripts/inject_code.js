/**
 * 注入代码到 CodeMirror 6 编辑器的脚本
 * @param {string} codeText - 要输入的完整代码
 */
async function injectCode(codeText) {
  const editorEl = document.querySelector('.cm-editor');
  if (!editorEl) {
    throw new Error('未找到 .cm-editor 元素');
  }

  // 尝试获取 CodeMirror 6 的 EditorView 实例
  // 在不同的 PTA 页面版本中，可能挂载在 cmView 或 cmTile 等内部属性上
  let view = null;
  if (editorEl.cmView && editorEl.cmView.view) {
    view = editorEl.cmView.view;
  } else if (editorEl.cmTile && editorEl.cmTile.view) {
    view = editorEl.cmTile.view;
  } else {
    // 备用寻找方案
    const keys = Object.keys(editorEl);
    const viewKey = keys.find(k => k.startsWith('__cm') || k === 'cmView');
    if (viewKey && editorEl[viewKey]) {
      view = editorEl[viewKey].view || editorEl[viewKey];
    }
  }

  if (!view) {
    throw new Error('无法在 .cm-editor 上找到 CodeMirror 视图实例');
  }

  // 执行分发更新，替换全部内容
  view.dispatch({
    changes: {
      from: 0,
      to: view.state.doc.length,
      insert: codeText
    }
  });

  return { success: true, length: codeText.length };
}
