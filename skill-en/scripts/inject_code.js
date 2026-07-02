/**
 * Script to inject code into the CodeMirror 6 editor
 * @param {string} codeText - The complete code to insert
 */
async function injectCode(codeText) {
  const editorEl = document.querySelector('.cm-editor');
  if (!editorEl) {
    throw new Error('.cm-editor element not found');
  }

  // Attempt to obtain the CodeMirror 6 EditorView instance
  // In different PTA page versions, it may be mounted on internal properties
  // such as cmView or cmTile
  let view = null;
  if (editorEl.cmView && editorEl.cmView.view) {
    view = editorEl.cmView.view;
  } else if (editorEl.cmTile && editorEl.cmTile.view) {
    view = editorEl.cmTile.view;
  } else {
    // Fallback search method
    const keys = Object.keys(editorEl);
    const viewKey = keys.find(k => k.startsWith('__cm') || k === 'cmView');
    if (viewKey && editorEl[viewKey]) {
      view = editorEl[viewKey].view || editorEl[viewKey];
    }
  }

  if (!view) {
    throw new Error('Unable to find CodeMirror view instance on .cm-editor');
  }

  // Execute dispatch update, replacing all content
  view.dispatch({
    changes: {
      from: 0,
      to: view.state.doc.length,
      insert: codeText
    }
  });

  return { success: true, length: codeText.length };
}
