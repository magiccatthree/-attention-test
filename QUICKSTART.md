# 快速部署指南 (Quick Start)

## ⚠️ 重要：GitHub Pages 不支持此应用

**GitHub Pages 只能托管静态网站**，无法运行 Flask（Python 后端）应用。

## ✅ 推荐的免费部署方案

### 🥇 方案一：Vercel（最快最简单）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel
```

⏱️ **3分钟完成** | 🆓 **完全免费** | 🌐 **自动获得公网地址**

---

### 🥈 方案二：PythonAnywhere（无需命令行）

1. 访问 https://www.pythonanywhere.com 注册
2. 上传代码或 Git 克隆
3. 点击创建 Web App
4. 选择 Flask 
5. 完成！

⏱️ **5分钟完成** | 🆓 **完全免费** | 🎯 **最适合新手**

---

### 🥉 方案三：Render（GitHub 自动部署）

1. 访问 https://render.com 注册
2. 连接你的 GitHub 仓库
3. 选择 Web Service
4. 自动检测并部署

⏱️ **5分钟完成** | 🆓 **免费额度充足** | 🔄 **自动更新**

---

## 📚 详细教程

完整的图文教程请查看：**[DEPLOYMENT.md](DEPLOYMENT.md)**

包含：
- ✅ 每个平台的详细步骤
- ✅ 配置文件说明
- ✅ 常见问题解答
- ✅ 云服务器部署指南

---

## ❓ 为什么不能用 GitHub Pages？

| 特性 | GitHub Pages | Flask 应用 |
|------|-------------|-----------|
| 文件类型 | 纯静态（HTML/CSS/JS） | 需要 Python 后端 |
| 服务器 | ❌ 不需要 | ✅ 必需 |
| 动态功能 | ❌ 不支持 | ✅ 支持 |
| 数据处理 | ❌ 仅前端 | ✅ 后端处理 |

**结论**：此项目需要 Python 后端运行，必须使用支持 Python 的托管平台。

---

## 🎯 我该选哪个？

- **从未部署过网站** → PythonAnywhere（最简单）
- **想要最快部署** → Vercel（最快）
- **代码经常更新** → Render（自动部署）
- **需要完全控制** → 云服务器

---

## 🆘 需要帮助？

在 GitHub Issues 提问：https://github.com/magiccatthree/-attention-test/issues
