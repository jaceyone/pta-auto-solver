# PTA Page Selectors & Problem Structure

This reference lists key CSS selectors and problem DOM structures on the PTA platform for Playwright automation.

## General Page Selectors
- Problem list: `ul.problem-list` or `.problem-list-container`
- Problem row/link: `a[href*="/problems/"]`
- Problem title: `.problem-title` or `h1.title`
- Submit button: `button.submit` or `button[type="submit"]`
- Save/Draft button: `button.save` or `button.draft`

## Multiple Choice & True-False
PTA multiple choice questions typically wrap options in lists or radio groups:
- Option container: `.question-container` or `.option-list`
- Single option: `.option-item` or `label`
- Radio/Checkbox input: `input[type="radio"]` or `input[type="checkbox"]`
- Batch click logic: match by option text or index, then call `element.click()`

## Fill-in-the-Blank
- Blank input: `input[type="text"]` or `.blank-input`

## Programming Problems (CodeMirror 6)
PTA's code editor uses CodeMirror 6 with a different DOM structure from standard inputs:
- Editor container: `.cm-editor`
- Text content area: `.cm-content`
- Hidden textarea: `textarea.cm-hidden` (not recommended for direct input; use API injection)
