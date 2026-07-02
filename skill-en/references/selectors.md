# PTA Page Selectors & Problem Type Structure

This reference lists the key CSS selectors and problem DOM structures on the PTA platform, used to guide Playwright automation.

## Common Page Selectors
- Problem list: `ul.problem-list` or `.problem-list-container`
- Problem row/link: `a[href*="/problems/"]`
- Problem title: `.problem-title` or `h1.title`
- Submit button: `button.submit` or `button[type="submit"]`
- Save/draft button: `button.save` or `button.draft`

## Multiple Choice & True/False
PTA typically wraps problem options in a list or radio group:
- Option container: `.question-container` or `.option-list`
- Individual option: `.option-item` or `label`
- Radio/checkbox input: `input[type="radio"]` or `input[type="checkbox"]`
- Batch auto-click logic: match option text or index, then execute `element.click()` on the target element

## Fill-in-the-Blank
- Blank input field: `input[type="text"]` or `.blank-input`

## Programming Problems (CodeMirror 6)
PTA's code editor is built on CodeMirror 6, whose DOM structure differs from standard input fields:
- Editor container: `.cm-editor`
- Text content area: `.cm-content`
- Hidden textarea: `textarea.cm-hidden` (not recommended for direct typing — use API injection instead)
