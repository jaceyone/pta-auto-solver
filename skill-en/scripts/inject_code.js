/**
 * Inject code into CodeMirror 6 editor
 * @param {string} codeText - The full code to insert
 */
async function injectCode(codeText) {
  const editorEl = document.querySelector('.cm-editor');
  if (!editorEl) {
    throw new Error('No .cm-editor element found');
  }

  // Try to get the CodeMirror 6 EditorView instance
  // In different PTA page versions, it may be on cmView, cmTile, etc.
  let view = null;
  if (editorEl.cmView && editorEl.cmView.view) {
    view = editorEl.cmView.view;
  } else if (editorEl.cmTile && editorEl.cmTile.view) {
    view = editorEl.cmTile.view;
  } else {
    const keys = Object.keys(editorEl);
    const viewKey = keys.find(k => k.startsWith('__cm') || k === 'cmView');
    if (viewKey && editorEl[viewKey]) {
      view = editorEl[viewKey].view || editorEl[viewKey];
    }
  }

  if (!view) {
    throw new Error('Could not find CodeMirror view on .cm-editor');
  }

  // Dispatch a transaction to replace all content
  view.dispatch({
    changes: {
      from: 0,
      to: view.state.doc.length,
      insert: codeText
    }
  });

  return { success: true, length: codeText.length };
}
