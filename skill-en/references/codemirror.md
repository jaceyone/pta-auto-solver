# CodeMirror 6 Injection & Code Input Approach

PTA's code editor is built on CodeMirror 6 (CM6). Due to security and anti-cheating restrictions, directly modifying the DOM's `.cm-content` or using generic `type_text` causes cursor misalignment, lost indentation, and may result in empty-code rejection on submit.

## Injection Principle

CodeMirror 6 separates state from view. The underlying editor state is managed by `EditorView`, attached to the DOM node via a specific property. Calling `EditorView.dispatch()` with a transaction updates the editor content without breaking internal state.

On PTA pages, the CM6 `EditorView` instance is typically attached to the `.cm-editor` element's `cmView` property.

## Injection Script Logic

1. Locate the `.cm-editor` node.
2. Find the `cmView` property on that node (or look for an initialized `EditorView` instance on child/parent nodes):
   `const view = document.querySelector('.cm-editor').cmView.view;`
3. Construct an update transaction:
   ```javascript
   view.dispatch({
     changes: { from: 0, to: view.state.doc.length, insert: codeText }
   });
   ```
4. This clears the editor and inserts the latest `codeText` while preserving syntax highlighting, bracket matching, and line breaks.
