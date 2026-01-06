# 注意力测试 (Attention Test)

基于IVA-CPT（整合视听持续性注意力测试）的在线注意力测试网站。

## 功能特点

- 🎯 **三种测试模式**：
  - 视觉测试：通过屏幕显示的数字进行测试
  - 听觉测试：通过声音信号进行测试
  - 视听结合测试：同时使用视觉和听觉信号
  
- 📊 **详细测试报告**：
  - 正确响应率
  - 漏报次数（遗漏目标）
  - 误报次数（错误响应）
  - 平均反应时间
  - 表现分析和建议

- 🎨 **友好的用户界面**：
  - 响应式设计，支持移动端和桌面端
  - 美观的渐变背景
  - 清晰的测试说明

- ⚠️ **免责声明**：网站右下角标注"仅供娱乐"，测试结果仅供参考

## 安装和运行

### 环境要求

- Python 3.7+
- pip

### 安装步骤

1. 克隆仓库：
```bash
git clone https://github.com/magiccatthree/-attention-test.git
cd -attention-test
```

2. 安装依赖：
```bash
pip install -r requirements.txt
```

3. 运行应用：
```bash
python app.py
```

4. 打开浏览器访问：
```
http://localhost:5000
```

### 公开访问

如果需要让其他人访问（在局域网或公网），应用已配置为监听所有网络接口（0.0.0.0）。

- **局域网访问**：其他设备可通过您的局域网IP访问，例如：`http://192.168.1.100:5000`
- **公网访问**：需要配置端口转发或使用反向代理（如Nginx）

## 测试说明

### 如何进行测试

1. 选择一种测试模式（视觉、听觉或视听结合）
2. 阅读测试说明
3. 点击"开始测试"按钮
4. 当看到数字"1"或听到高音调时，快速按下**空格键**
5. 其他情况不要按键
6. 完成40个测试项后，系统自动生成测试报告

### 测试原理

本测试基于IVA-CPT（Integrated Visual and Auditory Continuous Performance Test），这是一种常用的注意力评估工具：

- **目标刺激**：数字"1"（视觉）或800Hz高音调（听觉）
- **非目标刺激**：数字2-9（视觉）或400Hz低音调（听觉）
- **测试指标**：
  - 反应速度（reaction time）
  - 准确性（accuracy）
  - 遗漏错误（omission errors）- 未能响应目标刺激
  - 误报错误（commission errors）- 响应非目标刺激

## 技术栈

- **后端**：Flask (Python)
- **前端**：HTML5, CSS3, JavaScript
- **音频**：Web Audio API

## 项目结构

```
-attention-test/
├── app.py                 # Flask应用主文件
├── requirements.txt       # Python依赖
├── static/
│   ├── css/
│   │   └── style.css     # 样式文件
│   └── js/
│       └── test.js       # 测试逻辑
└── templates/
    ├── index.html        # 首页
    ├── test.html         # 测试页面
    └── results.html      # 结果页面
```

## 注意事项

⚠️ **重要提醒**：
- 本测试仅供娱乐和教育目的
- 测试结果不能作为医学诊断依据
- 如有注意力相关困扰，请咨询专业医疗机构

## 许可证

本项目开源，供学习和研究使用。