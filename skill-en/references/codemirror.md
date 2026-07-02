# CodeMirror 6 Injection & Code Input Solution

PTA's code editor is based on CodeMirror 6 (CM6). Due to security and anti-cheating restrictions, directly modifying the `.cm-content` DOM or using generic `type_text` calls causes cursor misalignment, loss of indentation, and may be flagged as empty code upon submission.

## Injection Principle

CodeMirror 6 adopts a design where state and view are separated. The underlying editor state is managed by `EditorView`, mounted on a specific property of the DOM node. By calling `EditorView.dispatch()` to send a Transaction, you can directly update the editor content without breaking the internal state.

On PTA pages, the CM6 `EditorView` instance is typically mounted on the `.cm-editor` element's `cmView` property.

## Injection Script Logic

1. Locate the `.cm-editor` node.
2. Look for the `cmView` property on that node, or find an initialized `EditorView` instance from child/parent nodes:
   `const view = document.querySelector('.cm-editor').cmView.view;`
3. Construct the update transaction:
   ```javascript
   view.dispatch({
     changes: { from: 0, to: view.state.doc.length, insert: codeText }
   });
   ```
4. This clears the editor and inserts the latest `codeText`, preserving syntax highlighting, brace auto-closing, and line breaks.
