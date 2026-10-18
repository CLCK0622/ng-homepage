# Typst 简历

简历正文在 `main.typ`，PDF 输出到 `output/pdf/resume.pdf`。

本目录随 `ng-homepage` 仓库一起跟踪。网站提供下载的 PDF 位于 `../public/resume.pdf`。
在仓库根目录运行 `make -C resume publish`，即可编译并同步网站 PDF；随后一起提交源文件和 `public/resume.pdf`。

## 在 VS Code 中编辑

1. 在这个目录运行 `code .`（或在仓库根目录运行 `code resume`），让本目录的编辑器配置生效。
2. 打开 `main.typ`，点击右上角的 Typst 预览按钮，即可边改边看。
3. 保存时自动格式化并导出 PDF；按 `Cmd+Shift+B` 也可以手动编译。

项目使用 Tinymist Typst 插件，已配置输入时更新预览、保存时导出 PDF。

## 在终端中编译

```sh
make build     # 生成 PDF
make watch     # 保存后重新编译，Ctrl+C 停止
make preview   # 编译并用 macOS 默认程序打开 PDF
make publish   # 编译并同步到网站的 public/resume.pdf
```

也可以直接运行：

```sh
mkdir -p output/pdf
typst compile --root . main.typ output/pdf/resume.pdf
```

## 环境与依赖

- 本机已验证的版本：Typst CLI 0.15.1、Tinymist 0.15.2。
- 模板固定为 `@preview/basic-resume:0.2.8`，首次编译需要联网下载；后续可使用本机缓存。
- 当前字体为 macOS 自带的 Georgia。换电脑后用 `typst fonts` 检查字体是否可用。
- 新机器可以用 `brew install typst` 安装编译器，用 `code --install-extension myriad-dreamin.tinymist` 安装 VS Code 插件。

当前模板的间接依赖 `scienceicons:0.1.0` 在 Typst 0.15 中会提示 `no whitespace before raw text`。这是旧依赖的语法兼容性警告，当前 PDF 编译和 Tinymist 预览均已验证成功；将来升级 Typst 时需要重新检查模板兼容性。

本目录的编译产物及临时预览已加入 `.gitignore`；网站的 `public/resume.pdf` 仍纳入版本控制。更新项目经历时，编辑 `main.typ` 中的 `=== Projects` 段即可。

预览与自动导出设置参考 [Tinymist 官方文档](https://myriad-dreamin.github.io/tinymist/frontend/vscode.html)。
