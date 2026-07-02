# PTA 页面选择器与题型结构

本参考文件列出了 PTA 平台上的关键 CSS 选择器和题型 DOM 结构，用于指导 Playwright 自动化定位。

## 页面通用选择器
- 题目列表：`ul.problem-list` 或 `.problem-list-container`
- 题目行/链接：`a[href*="/problems/"]`
- 题目标题：`.problem-title` 或 `h1.title`
- 提交按钮：`button.submit` 或 `button[type="submit"]`
- 保存/暂存按钮：`button.save` 或 `button.draft`

## 选择题 & 判断题
PTA 选择题通常将题目选项封装在列表或单选组中：
- 选项卡容器：`.question-container` 或 `.option-list`
- 单个选项：`.option-item` 或 `label`
- 单选框/复选框输入：`input[type="radio"]` 或 `input[type="checkbox"]`
- 批量自动点击逻辑：通过寻找选项文本或索引匹配，对目标元素执行 `element.click()`

## 填空题
- 填空输入框：`input[type="text"]` 或 `.blank-input`

## 编程题（CodeMirror 6）
PTA 的代码编辑器底层为 CodeMirror 6，其 DOM 结构与经典输入框不同：
- 编辑器容器：`.cm-editor`
- 文本活动区域：`.cm-content`
- 隐藏的文本域：`textarea.cm-hidden` (不推荐直接 type，应该使用 API 注入)
