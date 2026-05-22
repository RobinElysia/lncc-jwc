# 静态应用实施指南

## 快速开始

### 方案 1：本地运行（推荐用于开发测试）

```bash
# 进入项目目录
cd /vercel/share/v0-project

# 运行启动脚本
bash start-server.sh

# 或手动启动
cd static
python3 -m http.server 8000

# 访问浏览器
# http://localhost:8000
```

### 方案 2：Vercel 部署（推荐用于生产）

```bash
# 1. 初始化 Vercel 项目
vercel

# 2. 配置输出目录为 static
# vercel.json 可配置为：
{
  "buildCommand": "",
  "outputDirectory": "static"
}

# 3. 部署
vercel --prod
```

### 方案 3：GitHub Pages 部署

```bash
# 1. 推送到 GitHub
git add static/
git commit -m "Add static application"
git push

# 2. 在 GitHub 设置中启用 Pages
# Settings → Pages → Deploy from a branch → main/static
```

## 字体配置（必需步骤）

### 需要进行的操作

目前应用会尝试加载本地字体文件，但这些文件还未下载。有两种解决方案：

#### 方案 A：使用 Google Fonts CDN（快速方案，推荐）

1. 编辑 `static/css/fonts.css`
2. 替换为以下内容：

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600&family=Noto+Serif+SC:wght@400;600&display=swap');
```

这样字体会自动从 Google Fonts 加载，无需本地文件。

#### 方案 B：本地字体文件（可选，用于完全离线）

1. 下载 Noto 字体：
   - https://github.com/notofonts/noto-cjk/releases

2. 选择文件（推荐使用 VF 可变字体）：
   - NotoSerifSC-VF.ttf
   - NotoSansSC-VF.ttf

3. 转换为 WOFF2 格式（推荐）：
   - 使用在线工具：https://convertio.co/ttf-woff2/
   - 或使用 fonttools：`pip install fonttools` 后运行转换

4. 放置文件到 `static/fonts/` 目录：
   ```
   noto-serif-sc-regular.woff2
   noto-serif-sc-bold.woff2
   noto-sans-sc-regular.woff2
   noto-sans-sc-bold.woff2
   ```

5. 保留 `static/css/fonts.css` 的本地路径配置

## 数据管理

### 添加新文章

编辑 `static/data/articles.json`，按照以下格式添加：

```json
{
  "slug": "unique-identifier-2026",
  "category": "教学通知",
  "title": "新文章标题",
  "date": "2026-05-22",
  "author": "作者名称",
  "source": "来源部门",
  "views": 100,
  "summary": "文章摘要",
  "content": [
    {"type": "p", "text": "段落文本"},
    {"type": "h", "text": "标题"},
    {"type": "ul", "items": ["项目1", "项目2"]},
    {"type": "quote", "text": "引用文本"}
  ],
  "attachments": [
    {"name": "文件名.pdf", "size": "100 KB", "type": "PDF"}
  ]
}
```

### 编辑样式

所有颜色在 `static/css/style.css` 的 `:root` 部分定义：

```css
:root {
  --primary: #0d3b66;        /* 主色（深蓝） */
  --accent: #ffa500;         /* 强调色（橙色） */
  --background: #ffffff;     /* 背景色 */
  --foreground: #1a1a1a;     /* 文字色 */
  --border: #e5e5e5;         /* 边框色 */
  /* ... 其他颜色 */
}
```

修改这些值可快速改变整个应用的配色。

## 功能检查清单

### 首页 (index.html)
- [ ] 正确显示校园图片和校徽
- [ ] 教学信息部分显示 7 条通知
- [ ] 考务信息部分显示 4 条通知和快捷入口
- [ ] 人才培养部分显示 6 个卡片
- [ ] 资料下载部分显示文件表格

### 列表页 (articles.html)
- [ ] 显示全部 11 篇文章
- [ ] 7 个分类按钮可切换
- [ ] 文章列表支持点击进入详情
- [ ] "全部" 按钮显示所有文章

### 详情页 (detail.html)
- [ ] 显示完整文章内容
- [ ] 显示元数据（分类、时间、作者）
- [ ] 显示附件列表
- [ ] 打印按钮可正常工作
- [ ] 相关文章导航可用

### 通用功能
- [ ] 导航链接正常工作
- [ ] 响应式设计在移动端显示正常
- [ ] 字体正确加载
- [ ] 颜色符合亮色主题

## 性能优化建议

1. **图片优化**：
   - 压缩 banner.jpg 和 logo.jpg
   - 使用 WebP 格式

2. **JavaScript 优化**：
   - 启用 gzip 压缩
   - 考虑内联关键脚本

3. **CSS 优化**：
   - 启用 CSS 压缩
   - 使用 PurgeCSS 移除未使用的样式

4. **字体优化**：
   - 使用可变字体（VF）
   - 考虑预加载关键字体

## 常见问题

### Q: 字体无法加载？
**A:** 检查以下几点：
- 确认 `css/fonts.css` 中的字体路径正确
- 如果使用本地字体，确认文件在 `static/fonts/` 目录
- 推荐改用 Google Fonts CDN

### Q: 文章无法显示？
**A:** 检查以下几点：
- 确认 `data/articles.json` 有效
- 检查浏览器控制台是否有错误
- 确认 JSON 文件编码为 UTF-8

### Q: 页面无法在线访问？
**A:** 
- 确保已部署到 Web 服务器或 CDN
- 检查 CORS 配置（如果从其他域加载资源）
- 验证服务器正确提供 JSON 文件

### Q: 搜索功能无法工作？
**A:** 这是设计限制 - 当前搜索仅在已加载的文章中进行。实现全文搜索需要额外库（Lunr.js）。

## 安全性考虑

1. **内容安全**：JSON 中的用户输入已通过 HTML 转义
2. **HTTPS**：生产环境应使用 HTTPS
3. **CSP**：建议设置 Content-Security-Policy 头
4. **CORS**：如需跨域访问，正确配置 CORS 头

## 技术支持资源

- [MDN - HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML/HTML5)
- [MDN - CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Google Fonts](https://fonts.google.com/?subset=chinese_simplified)

## 下一步建议

1. 配置字体（优先使用 Google Fonts CDN）
2. 本地测试应用完整流程
3. 部署到 Vercel 或其他托管服务
4. 定期更新文章数据
5. 监控应用性能和用户反馈

---

**应用已准备就绪，可根据上述步骤进行配置和部署！**
