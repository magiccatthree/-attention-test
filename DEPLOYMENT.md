# 部署指南 (Deployment Guide)

本文档提供详细的部署步骤，帮助您将注意力测试网站部署到公网，让所有人都能访问。

## ⚠️ 重要说明：GitHub Pages 不支持 Flask

**GitHub Pages 只能托管静态网站**（纯 HTML/CSS/JavaScript），**无法运行 Flask 这样的 Python 后端应用**。

因此，我们推荐使用以下专门支持 Python/Flask 的免费托管平台。

---

## 🚀 推荐方案

### 方案一：Vercel（⭐⭐⭐⭐⭐ 最推荐）

**特点**：
- ✅ 完全免费（100GB 流量/月）
- ✅ 自动化部署，3分钟完成
- ✅ 支持自定义域名
- ✅ 自动 HTTPS

**部署步骤**：

1. 安装 Vercel CLI：
```bash
npm install -g vercel
```

2. 登录：
```bash
vercel login
```

3. 在项目目录运行：
```bash
cd -attention-test
vercel
```

4. 按提示操作，完成后获得公网地址（如：`https://attention-test.vercel.app`）

✅ **完成！** 任何人都可以通过链接访问。

---

### 方案二：PythonAnywhere（⭐⭐⭐⭐ 最简单）

**特点**：
- ✅ 专为 Python 设计
- ✅ 无需配置
- ✅ 完全免费（有限制）

**部署步骤**：

1. 注册账号：https://www.pythonanywhere.com

2. 上传代码（使用 Git）：
```bash
git clone https://github.com/magiccatthree/-attention-test.git
```

3. 创建 Web App：
   - 点击 "Web" → "Add a new web app"
   - 选择 "Flask" 和 Python 3.10+

4. 配置 WSGI 文件（`/var/www/username_pythonanywhere_com_wsgi.py`）：
```python
import sys
path = '/home/username/-attention-test'
if path not in sys.path:
    sys.path.append(path)

from app import app as application
```

5. 安装依赖：
```bash
cd -attention-test
pip install -r requirements.txt
```

6. 在 Web 页面点击 "Reload"

✅ **完成！** 访问 `https://username.pythonanywhere.com`

---

### 方案三：Render（⭐⭐⭐⭐ GitHub 集成）

**特点**：
- ✅ 自动从 GitHub 部署
- ✅ 代码更新自动重新部署
- ✅ 免费额度充足

**部署步骤**：

1. 注册：https://render.com

2. 连接 GitHub：
   - 点击 "New +" → "Web Service"
   - 选择 `-attention-test` 仓库

3. 配置：
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`

4. 点击 "Create Web Service"

✅ **完成！** Render 自动部署并提供公网地址。

---

### 方案四：Railway（⭐⭐⭐⭐）

**步骤**：

1. 访问 https://railway.app
2. 点击 "Start a New Project" → "Deploy from GitHub repo"
3. 选择此仓库
4. Railway 自动检测并部署

---

## 🔧 使用云服务器部署（适合有经验的用户）

如果你有腾讯云、阿里云、AWS 等云服务器：

```bash
# 1. 连接服务器
ssh username@your-server-ip

# 2. 安装依赖
sudo apt update
sudo apt install python3 python3-pip nginx

# 3. 克隆项目
git clone https://github.com/magiccatthree/-attention-test.git
cd -attention-test
pip3 install -r requirements.txt

# 4. 启动应用
gunicorn -w 4 -b 0.0.0.0:8000 app:app

# 5. 配置 Nginx 反向代理（可选）
```

---

## 📊 平台对比

| 平台 | 免费额度 | 难度 | 速度 | 推荐度 |
|------|---------|------|------|--------|
| **Vercel** | 100GB/月 | ⭐ | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ |
| **PythonAnywhere** | 512MB | ⭐ | ⚡⚡ | ⭐⭐⭐⭐ |
| **Render** | 750小时/月 | ⭐⭐ | ⚡⚡ | ⭐⭐⭐⭐ |
| **Railway** | $5额度/月 | ⭐ | ⚡⚡⚡ | ⭐⭐⭐⭐ |

## 💡 推荐选择

- **想要最快部署**：Vercel（3分钟完成）
- **第一次部署**：PythonAnywhere（最简单）
- **需要自动更新**：Render 或 Railway
- **学生/学习用**：PythonAnywhere

---

## ❓ 常见问题

**Q: 为什么不能用 GitHub Pages？**
A: GitHub Pages 只支持静态网站（HTML/CSS/JS），不支持 Python 后端。Flask 需要服务器运行。

**Q: 这些平台真的免费吗？**
A: 是的，都提供免费额度，足够个人项目使用。

**Q: 部署后能自定义域名吗？**
A: Vercel、Render、Railway 都支持绑定自己的域名。

**Q: 数据会丢失吗？**
A: 当前版本使用内存存储，重启会清空。如需持久化，需要添加数据库。

---

如有问题，欢迎在 GitHub Issues 提问。
