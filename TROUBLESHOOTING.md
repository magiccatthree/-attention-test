# GitHub Pages 404 错误故障排查

## 问题：访问 https://magiccatthree.github.io/-attention-test/ 显示 404

这是常见的 GitHub Pages 配置问题。以下是解决步骤：

## 🔍 可能的原因和解决方案

### 原因 1：GitHub Pages 未启用或配置错误 ⭐（最常见）

**检查步骤：**

1. 打开仓库页面：`https://github.com/magiccatthree/-attention-test`

2. 点击 **Settings**（设置）

3. 在左侧菜单找到 **Pages**

4. 检查配置：
   - **Source**: 必须选择 "Deploy from a branch"
   - **Branch**: 选择 `copilot/add-attention-test-website`（或 `main`）
   - **Folder**: 必须选择 `/docs` ⚠️ **非常重要！**
   
5. 如果配置不对，修改后点击 **Save**

6. 等待 1-2 分钟让 GitHub 重新部署

7. 刷新 Settings → Pages 页面，查看部署状态

**预期结果：**
- 部署成功后会显示：
  ```
  Your site is live at https://magiccatthree.github.io/-attention-test/
  ```

---

### 原因 2：代码在错误的分支上

**当前代码位置：** `copilot/add-attention-test-website` 分支

**解决方案 A：配置 GitHub Pages 使用此分支**
- 在 Settings → Pages 中选择 `copilot/add-attention-test-website` 分支

**解决方案 B：合并到 main 分支（推荐）**
1. 合并 PR 到 main 分支
2. 在 Settings → Pages 中选择 `main` 分支

---

### 原因 3：部署正在进行中

GitHub Pages 部署需要时间（通常 1-5 分钟）。

**检查部署状态：**
1. 进入仓库主页
2. 点击顶部的 **Actions** 标签
3. 查看 "pages build and deployment" 工作流
4. 如果显示黄色圆圈（进行中）或红色叉号（失败），等待完成或查看错误

---

### 原因 4：仓库名称问题

仓库名以 `-` 开头可能导致 URL 问题。

**访问地址可能是：**
- ❌ `https://magiccatthree.github.io/-attention-test/` （可能不工作）
- ✅ `https://magiccatthree.github.io/%2D-attention-test/` （URL 编码）

**建议：** 重命名仓库去掉开头的 `-`，改为 `attention-test`

---

## ✅ 详细配置步骤（图文）

### 步骤 1：进入 Settings

![Settings](https://docs.github.com/assets/cb-28266/images/help/repository/repo-actions-settings.png)

### 步骤 2：找到 Pages

在左侧菜单向下滚动，找到 "Pages" 选项

### 步骤 3：配置 Source

```
┌─────────────────────────────────────────┐
│ Build and deployment                    │
│                                         │
│ Source: Deploy from a branch ▼         │
│                                         │
│ Branch: copilot/add-attention... ▼     │
│         /docs ▼                   Save │
│                                         │
└─────────────────────────────────────────┘
```

**必须选择：**
- Branch: `copilot/add-attention-test-website`
- Folder: `/docs`

### 步骤 4：等待部署

保存后，页面会显示：
```
Your site is ready to be published at 
https://magiccatthree.github.io/-attention-test/
```

等待几分钟后会变成：
```
✅ Your site is live at 
https://magiccatthree.github.io/-attention-test/
```

---

## 🔧 快速诊断命令

如果你有仓库的 push 权限，可以检查：

```bash
# 检查分支
git branch -a

# 检查 docs 文件夹
ls -la docs/

# 确认文件存在
ls docs/index.html
```

---

## ⚠️ 常见错误

### 错误 1：选错了文件夹
- ❌ 选择 `/ (root)` - 这会导致 404，因为 HTML 文件在 `docs/` 中
- ✅ 选择 `/docs` - 正确

### 错误 2：选错了分支
- ❌ 选择不存在 `docs/` 文件夹的分支
- ✅ 选择 `copilot/add-attention-test-website` 或包含代码的分支

### 错误 3：等待时间不够
- 首次部署可能需要 5 分钟
- 后续更新通常 1-2 分钟

---

## 📞 仍然无法访问？

### 方法 1：使用备用 URL

尝试访问：
```
https://magiccatthree.github.io/-attention-test/index.html
```

### 方法 2：检查 Actions 日志

1. 进入 Actions 标签
2. 点击最新的 "pages build and deployment"
3. 查看错误信息

### 方法 3：查看仓库可见性

确保仓库是 Public（公开），Private 仓库需要 GitHub Pro

---

## 🎯 推荐操作流程

1. **立即检查**：Settings → Pages 是否配置正确
2. **等待 3 分钟**：让 GitHub 完成部署
3. **查看 Actions**：确认部署成功
4. **访问网站**：刷新浏览器
5. **如仍失败**：检查仓库名称，考虑重命名

---

## 📝 配置示例

**正确的配置：**
```yaml
Repository: magiccatthree/-attention-test
Branch: copilot/add-attention-test-website
Folder: /docs
Status: ✅ Published
URL: https://magiccatthree.github.io/-attention-test/
```

---

## 需要更多帮助？

如果按照以上步骤操作后仍然无法访问，请提供：
1. Settings → Pages 的截图
2. Actions 中的部署日志
3. 访问网站时的具体错误信息

这样我可以进一步诊断问题。
