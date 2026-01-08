# GitHub Pages 部署完整指南

## 🎉 静态版本已创建完成！

静态版本位于 `docs/` 文件夹，可以直接部署到 GitHub Pages。

## 📋 快速部署（3步）

### 第一步：推送代码到 GitHub

代码已经推送完成 ✅

### 第二步：配置 GitHub Pages

1. 打开你的仓库页面：
   ```
   https://github.com/magiccatthree/-attention-test
   ```

2. 点击顶部的 **Settings**（设置）标签

3. 在左侧菜单找到 **Pages**

4. 在 "Build and deployment" 部分：
   - **Source**: 选择 "Deploy from a branch"
   - **Branch**: 选择 `copilot/add-attention-test-website` 或 `main`（看你想从哪个分支部署）
   - **Folder**: 选择 `/docs` ⚠️ 重要：必须选择 `/docs`
   - 点击 **Save**

### 第三步：等待部署完成

- GitHub 会自动构建和部署（大约 1-2 分钟）
- 部署完成后，在 Settings → Pages 页面会显示访问地址
- 地址格式：`https://magiccatthree.github.io/-attention-test/`

## 🌐 访问网站

部署成功后，任何人都可以通过以下地址访问：

```
https://magiccatthree.github.io/-attention-test/
```

## 📱 功能说明

### ✅ 完整功能
- 三种测试模式（视觉、听觉、视听结合）
- 完整的 IVA-CPT 测试流程
- 详细的测试报告和分析
- 响应式设计（支持手机、平板、电脑）
- "仅供娱乐"标注

### 💾 数据存储
- 使用浏览器 localStorage 存储
- 关闭浏览器后数据依然保留
- 清除浏览器数据会丢失
- 每个浏览器独立存储

### ⚠️ 限制
- 不支持多用户数据共享
- 不支持服务器端数据库
- 更换设备无法查看历史记录

## 🔧 自定义域名（可选）

如果你有自己的域名：

1. 在域名提供商处添加 CNAME 记录：
   ```
   CNAME  @  magiccatthree.github.io
   ```

2. 在 GitHub Pages 设置中的 "Custom domain" 填入你的域名

3. 等待 DNS 生效（可能需要几小时）

## 📝 更新网站

修改 `docs/` 文件夹中的任何文件后：

```bash
git add docs/
git commit -m "更新网站内容"
git push
```

GitHub Pages 会自动重新部署。

## 🐛 常见问题

### Q: 404 Not Found
**A**: 检查 GitHub Pages 设置中是否选择了正确的分支和 `/docs` 文件夹。

### Q: 页面样式丢失
**A**: 确保所有资源文件（CSS、JS）路径正确，使用相对路径（如 `static/css/style.css`）。

### Q: 测试结果消失了
**A**: 如果清除了浏览器缓存或使用隐私模式，localStorage 数据会丢失。

### Q: 能否多人共享测试结果？
**A**: 静态版本不支持。如需此功能，请使用 Flask 版本并部署到支持 Python 的平台。

## 📊 版本对比

| 特性 | 静态版本（docs/） | Flask版本（根目录） |
|------|------------------|-------------------|
| GitHub Pages | ✅ 支持 | ❌ 不支持 |
| 部署难度 | ⭐ 简单 | ⭐⭐ 中等 |
| 服务器 | ❌ 不需要 | ✅ 需要 |
| 数据存储 | localStorage | Session/数据库 |
| 多用户 | ❌ | ✅ |
| 费用 | 🆓 完全免费 | 🆓 免费（多个平台） |

## 🔗 相关文档

- [docs/README.md](docs/README.md) - 静态版本详细说明
- [DEPLOYMENT.md](DEPLOYMENT.md) - Flask版本部署指南
- [QUICKSTART.md](QUICKSTART.md) - 快速开始指南

## 📧 需要帮助？

如有问题，在 GitHub Issues 中提问：
https://github.com/magiccatthree/-attention-test/issues

---

## ✨ 完成！

现在你可以：
1. 配置 GitHub Pages（Settings → Pages → 选择分支和 /docs 文件夹）
2. 等待 1-2 分钟部署完成
3. 通过 `https://magiccatthree.github.io/-attention-test/` 访问网站
4. 分享给任何人使用！

🎊 恭喜！你的注意力测试网站即将上线！
