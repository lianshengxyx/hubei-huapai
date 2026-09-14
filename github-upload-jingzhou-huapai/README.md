# 荆州花牌文化网站

这是“荆州花牌文化网站”的静态网页版本，可直接上传到 GitHub 仓库。

## 文件说明

- `index.html`：网站首页
- `styles.css`：全站样式
- `script.js`：首页交互脚本
- `places.js`：地图页交互脚本
- `assets/`：图片、牌面素材与参考图
- `origin.html`、`play-*.html`、`stories.html`、`places.html`：详情页

## GitHub Pages 部署

1. 新建 GitHub 仓库。
2. 上传本文件夹内的全部内容，注意是内容本身，不是外层文件夹。
3. 进入仓库 `Settings` → `Pages`。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub Pages 生成网址。

## Vercel 部署

也可以直接把这个仓库导入 Vercel。该项目是纯静态网站，不需要构建命令。

Build Command 留空，Output Directory 留空即可。
