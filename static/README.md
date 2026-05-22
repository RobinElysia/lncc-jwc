# 辽宁省交通高等专科学校 教务处 —— 静态站点

忠实复刻原 Next.js 项目设计的 **纯静态三页面应用**：

```
static/
├── index.html       # 主页（教学信息 / 考务信息 / 人才培养 / 资料下载）
├── articles.html    # 子页面：通知公告列表（带分类筛选）
├── detail.html      # 子页面详情：文章详情 + 相关推荐 + 上下篇
├── css/
│   ├── fonts.css    # 本地字体声明
│   └── style.css    # 主样式（亮色主题，复刻 Tailwind 设计令牌）
├── js/
│   ├── data.js      # 文章/下载/导航数据（纯 ES5）
│   └── app.js       # 渲染与交互逻辑（纯 ES5）
├── fonts/           # 放置本地字体文件（需手动下载，详见下文）
└── images/
    ├── nybanner.png   # 顶部 banner
    ├── logo.png       # 校徽
    ├── main-logo.png  # 页脚校名标
    ├── footerbg.png   # 页脚背景
    ├── icon.svg       # 站点图标
    └── icons.svg      # 内置 SVG 图标 sprite（替代 lucide-react）
```

## 技术特性

- **纯 HTML5** — 三个独立 `.html` 文件，无构建步骤
- **本地化样式** — 单一 `style.css`，复刻原项目 oklch 配色与所有 Tailwind 类，仅亮色主题
- **本地字体** — 通过 `@font-face` 加载 Noto Serif SC（思源宋体）+ Noto Sans SC（思源黑体）
- **纯原生 ES5** — 不使用 ES6 语法，无任何外部依赖（无 jQuery / 无框架）
- **保留原链接** — 智慧化教学管理系统、考试管理系统等所有外部链接保持原样
- **无 mock 数据** — 文章、附件、下载列表全部直接从原项目 `lib/articles.ts` 与组件迁移而来

## 运行

直接用任意静态 HTTP 服务器打开 `static/` 目录即可：

```bash
cd static
python3 -m http.server 8000
# 浏览器访问 http://localhost:8000/index.html
```

> 由于使用了 SVG sprite 的 `<use href>`，必须通过 HTTP 协议访问，**不要直接 `file://` 双击打开**。

## 需要您手动完成的下载操作

为了让字体在离线环境也能正常显示，**需要您下载以下 6 个 woff2 字体文件**并放入 `static/fonts/` 目录：

| 文件名 | 来源 |
| --- | --- |
| `NotoSerifSC-Regular.woff2` | [Google Fonts: Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC) |
| `NotoSerifSC-Bold.woff2` | 同上 |
| `NotoSerifSC-Black.woff2` | 同上 |
| `NotoSansSC-Regular.woff2` | [Google Fonts: Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) |
| `NotoSansSC-Medium.woff2` | 同上 |
| `NotoSansSC-Bold.woff2` | 同上 |

### 推荐下载方式（任选其一）

**方式 A：使用 google-webfonts-helper（推荐，直接给 woff2）**

打开 https://gwfh.mranftl.com/fonts ，分别搜索 `Noto Serif SC` 和 `Noto Sans SC`，按需勾选 weights 后下载 zip，解压重命名后放入 `static/fonts/`。

**方式 B：从 Google Fonts 下载 ttf 后转 woff2**

1. https://fonts.google.com/noto/specimen/Noto+Serif+SC 下载整套 ttf
2. 用 [woff2 转换工具](https://github.com/google/woff2) 或在线工具（如 https://cloudconvert.com/ttf-to-woff2 ）转为 woff2
3. 按上表命名后放入 `static/fonts/`

**方式 C：暂时使用系统字体（不下载）**

字体未就位时，CSS 已经声明了系统字体回退（`PingFang SC` / `Microsoft YaHei` / `Songti SC` 等），页面仍然可读，仅外观与原版有差异。

## 三个页面之间的导航

- 主页 `index.html` 中的「查看更多」、列表项点击 → 跳转到对应页面
- 列表页 `articles.html` 支持 URL 参数 `?cat=教学通知` 进行分类筛选
- 详情页 `detail.html` 通过 URL 参数 `?slug=xxx` 加载对应文章

## 兼容性

- 现代浏览器全部支持
- IE 11 因不支持 `oklch()` 与 CSS 变量动态混色，颜色会显著降级，建议使用 Edge / Chrome / Firefox / Safari
