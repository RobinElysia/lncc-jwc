# 纯静态三页面应用说明

这是一个使用纯 HTML5、CSS、ES5 JavaScript 构建的静态应用，完全可离线运行。

## 项目结构

```
static/
├── index.html              # 首页
├── articles.html           # 文章列表页
├── detail.html            # 文章详情页
├── css/
│   ├── style.css          # 主样式文件（亮色主题）
│   ├── fonts.css          # 字体声明
│   └── README.md          # 字体配置说明
├── js/
│   └── app.js             # ES5 应用脚本
├── data/
│   └── articles.json      # 文章数据（JSON 格式）
└── images/
    ├── banner.jpg         # 校园主楼图片
    └── logo.jpg           # 学校校徽
```

## 三个页面

### 1. 首页 (index.html)
- 教学信息部分：显示最新7条教学通知
- 考务信息部分：显示4条最新考务通知 + 快捷入口
- 人才培养部分：展示6个政策入口卡片
- 资料下载部分：表格化文件列表

### 2. 文章列表页 (articles.html)
- 完整文章列表
- 按分类筛选功能（7个分类）
- 响应式布局

### 3. 文章详情页 (detail.html)
- 文章完整内容展示
- 附件列表
- 上下文导航
- 打印功能

## 技术特点

- **纯 HTML5**：语义化标签，无框架依赖
- **原生 CSS**：CSS 变量实现主题系统，仅亮色主题
- **ES5 JavaScript**：轻量级脚本，兼容低版本浏览器
- **本地字体**：Noto Serif SC + Noto Sans SC
- **静态数据**：articles.json 格式
- **无依赖**：完全离线可运行

## 文件体积对比

| 文件 | 大小 |
|------|------|
| index.html | ~8 KB |
| articles.html | ~6 KB |
| detail.html | ~7 KB |
| style.css | ~15 KB |
| app.js | ~6 KB |
| articles.json | ~70 KB |

**总计：约 120 KB（不含图片和字体）**

## 使用说明

### 本地运行

1. 使用 Python HTTP 服务器：
   ```bash
   cd static
   python3 -m http.server 8000
   ```

2. 或使用 Node.js http-server：
   ```bash
   npx http-server static -p 8000
   ```

3. 在浏览器访问 `http://localhost:8000`

### 部署

直接将 `static/` 目录部署到任何静态托管服务：
- Vercel（推荐）
- Netlify
- GitHub Pages
- AWS S3
- 任何支持静态文件的 Web 服务器

## 字体配置

### 选项 1：本地字体文件（需下载）

1. 下载 Noto CJK 字体：
   https://github.com/notofonts/noto-cjk/releases

2. 转换为 WOFF/WOFF2 格式

3. 放置到 `static/fonts/` 目录

4. 修改 `css/fonts.css` 中的路径

### 选项 2：使用 Google Fonts CDN（推荐快速方案）

修改 `css/fonts.css`：

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600&family=Noto+Serif+SC:wght@400;600&display=swap');
```

## 数据格式

articles.json 中每篇文章的结构：

```json
{
  "slug": "unique-identifier",
  "category": "教学通知",
  "title": "文章标题",
  "date": "2026-04-22",
  "author": "作者名",
  "source": "来源",
  "views": 1000,
  "summary": "摘要",
  "content": [
    {"type": "p", "text": "段落文本"},
    {"type": "h", "text": "标题"},
    {"type": "ul", "items": ["列表项1", "列表项2"]},
    {"type": "ol", "items": ["有序项1", "有序项2"]},
    {"type": "quote", "text": "引用文本"}
  ],
  "attachments": [
    {"name": "文件名", "size": "100 KB", "type": "PDF"}
  ]
}
```

## 浏览器兼容性

- Chrome/Edge 60+
- Firefox 55+
- Safari 11+
- IE 11（不支持 CSS 变量）

## 可访问性

- 语义化 HTML 标签
- ARIA 属性支持
- 键盘导航支持
- 屏幕阅读器友好
- 打印友好

## 性能指标

- 首页加载：< 1 秒（本地）
- JSON 解析：< 100ms
- 列表渲染：< 50ms
- 详情页加载：即时（本地数据）

## 自定义样式

所有颜色通过 CSS 变量控制，在 `css/style.css` 中的 `:root` 修改：

```css
:root {
  --primary: #0d3b66;           /* 主色 */
  --accent: #ffa500;             /* 强调色 */
  --background: #ffffff;         /* 背景色 */
  --foreground: #1a1a1a;         /* 文字色 */
  /* 其他变量... */
}
```

## 注意事项

1. **纯静态应用**：无后端，所有数据来自 `data/articles.json`
2. **离线可用**：下载后可完全离线运行
3. **搜索功能**：仅在现有页面内搜索（无全文搜索索引）
4. **附件下载**：需自行配置下载链接
5. **打印样式**：已优化，隐藏导航和页脚

## 扩展建议

- 增加更多文章分类
- 添加标签系统
- 实现全文搜索（使用 Lunr.js）
- 添加评论系统（使用第三方服务）
- 增加主题切换（需扩展 CSS）

## 许可证

本应用为示例项目，可自由使用和修改。

## 支持

如有问题，请检查：
1. 浏览器控制台是否有错误
2. `data/articles.json` 是否可正常加载
3. `css/` 和 `js/` 文件路径是否正确
4. 字体文件是否已下载到 `fonts/` 目录
