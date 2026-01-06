# 注意力测试 - GitHub Pages 静态版本

这是注意力测试网站的静态版本，专门为 GitHub Pages 部署而设计。

## ⚠️ 与Flask版本的区别

### 静态版本（当前）
- ✅ 可以部署到 GitHub Pages
- ✅ 无需服务器
- ✅ 完全免费
- ⚠️ 测试结果保存在浏览器 localStorage（关闭浏览器后仍保留，清除浏览器数据会丢失）
- ⚠️ 不支持多用户数据共享
- ⚠️ 不支持数据库存储

### Flask版本（在项目根目录）
- ✅ 支持服务器端数据存储
- ✅ 可以使用数据库
- ✅ 支持多用户
- ⚠️ 需要部署到支持 Python 的托管平台（Vercel、PythonAnywhere等）
- ⚠️ 不能部署到 GitHub Pages

## 🚀 如何部署到 GitHub Pages

### 方法一：使用 GitHub 设置（推荐）

1. **将 docs 文件夹推送到 GitHub**
   ```bash
   git add docs/
   git commit -m "Add static version for GitHub Pages"
   git push
   ```

2. **配置 GitHub Pages**
   - 进入仓库的 Settings → Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择你的分支（如 `main` 或 `copilot/add-attention-test-website`）
   - 文件夹选择 `/docs`
   - 点击 Save

3. **等待部署**
   - GitHub 会自动部署（通常需要 1-2 分钟）
   - 部署完成后，访问地址会显示在 Settings → Pages

4. **访问网站**
   - URL 格式：`https://username.github.io/repository-name/`
   - 例如：`https://magiccatthree.github.io/-attention-test/`

### 方法二：使用 GitHub Actions（可选）

如果你想更高级的控制，可以创建 GitHub Actions 工作流来自动部署。

## 📁 文件结构

```
docs/
├── index.html              # 主页
├── test-visual.html        # 视觉测试页面
├── test-auditory.html      # 听觉测试页面
├── test-combined.html      # 视听结合测试页面
├── results.html            # 结果页面
└── static/
    ├── css/
    │   └── style.css       # 样式文件
    └── js/
        ├── test-static.js  # 测试逻辑（使用 localStorage）
        └── results-static.js # 结果显示逻辑
```

## 💾 数据存储说明

静态版本使用浏览器的 **localStorage** 存储测试结果：

- ✅ 数据保存在用户的浏览器中
- ✅ 关闭浏览器后数据依然存在
- ⚠️ 清除浏览器数据会丢失测试结果
- ⚠️ 更换浏览器或设备无法查看之前的结果
- ⚠️ 无法在多个用户间共享数据

## 🌐 访问地址

部署完成后，你的网站将可以通过以下地址访问：

```
https://[你的GitHub用户名].github.io/[仓库名]/
```

例如：
```
https://magiccatthree.github.io/-attention-test/
```

## 🔧 本地测试

如果想在本地测试静态版本：

1. **使用 Python 的简单 HTTP 服务器**：
   ```bash
   cd docs
   python -m http.server 8000
   ```
   然后访问 `http://localhost:8000`

2. **使用 Node.js 的 http-server**：
   ```bash
   npx http-server docs -p 8000
   ```
   然后访问 `http://localhost:8000`

3. **直接在浏览器中打开**：
   某些浏览器可能会因为安全限制而无法正常工作，推荐使用上述方法。

## ❓ 常见问题

### Q: 为什么测试结果消失了？
A: 静态版本使用 localStorage 存储，如果清除了浏览器数据或使用了隐私模式，数据会丢失。

### Q: 能否保存测试结果到云端？
A: 静态版本无法保存到云端。如需云端存储，请使用 Flask 版本并部署到支持 Python 的平台。

### Q: 可以自定义域名吗？
A: 可以！在 GitHub Pages 设置中可以配置自定义域名。

### Q: 部署后网站显示异常？
A: 检查 GitHub Pages 设置中的源分支和文件夹是否正确选择为 `/docs`。

## 📝 更新网站

修改 docs 文件夹中的文件后：

```bash
git add docs/
git commit -m "Update static website"
git push
```

GitHub Pages 会自动重新部署（通常需要 1-2 分钟）。

## 🔗 相关链接

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Flask 版本部署指南](../DEPLOYMENT.md)
- [快速开始指南](../QUICKSTART.md)

## 📧 获取帮助

如有问题，请在 GitHub Issues 中提问。
