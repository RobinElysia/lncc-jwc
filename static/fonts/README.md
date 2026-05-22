关于字体文件

本静态应用使用以下字体：
- Noto Serif SC (宋体风格) - 用于标题
- Noto Sans SC (无衬线) - 用于正文

字体文件位置：
- noto-serif-sc-regular.woff2
- noto-serif-sc-regular.woff  
- noto-serif-sc-bold.woff2
- noto-serif-sc-bold.woff
- noto-sans-sc-regular.woff2
- noto-sans-sc-regular.woff
- noto-sans-sc-bold.woff2
- noto-sans-sc-bold.woff

下载地址：
可从以下位置下载 Noto 字体（CC0 许可）：
https://github.com/notofonts/noto-cjk/releases

具体文件选择：
1. 下载 "Noto Serif SC" VF（Variable Font）或特定 weight
2. 下载 "Noto Sans SC" VF 或特定 weight
3. 转换格式为 WOFF/WOFF2（可使用在线工具或 fonttools）
4. 放置到 static/fonts/ 目录

或直接使用 Google Fonts CDN（只需修改 fonts.css 中的 @import 指向）：
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600&family=Noto+Serif+SC:wght@400;600&display=swap');
