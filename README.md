# 台积电(2330) 月营收分析 - Stark Tech 前端评测项目

基于 FinMind API 的台股月营收数据展示网站，使用 Next.js + TypeScript + MUI 技术栈开发。

## 🌐 在线演示

**生产环境地址**: [https://taiwan-stock-revenue-analysis.vercel.app](https://taiwan-stock-revenue-analysis.vercel.app)

## 项目概述

本项目是 Stark Tech 前端评测项目，主要功能是展示台积电(2330)的月营收数据，包括趋势图表和详细数据表格。项目严格按照评测要求使用指定的技术栈，并实现了响应式设计。

## 🚀 技术栈

### 核心技术
- **Next.js 15** - React 框架，使用 App Router
- **TypeScript** - 类型安全的 JavaScript
- **Material-UI (MUI) v5** - React 组件库 + 自定义主题
- **Chart.js + react-chartjs-2** - 图表展示库
- **Axios** - HTTP 请求库

### 数据来源
- **FinMind API** - 免费的台股数据API服务
- 数据集：TaiwanStockInfo (股票清单) + TaiwanStockMonthRevenue (月营收)

### 开发工具
- **ESLint** - 代码规范检查
- **Tailwind CSS** - 样式框架 (与 MUI 配合使用)

## 📋 功能特性

### 🎯 核心功能
- ✅ **台积电月营收数据展示** - 仅展示台积电(2330)数据，符合评测要求
- ✅ **交互式图表** - 线图+柱状图组合，展示营收趋势和同比增长率
- ✅ **数据表格** - 支持排序的详细数据表，包含同比/环比增长率
- ✅ **时间范围筛选** - 支持12/18/24/36个月及全部数据的时间范围选择
- ✅ **响应式设计** - 适配桌面端和移动端

### 🎨 用户体验
- ✅ **加载状态** - 优雅的加载动画和进度提示
- ✅ **错误处理** - 完善的错误提示和重试机制
- ✅ **数据统计** - 显示最高/最低营收、平均增长率等统计信息
- ✅ **实时反馈** - 成功提示、数据更新通知

### 🔧 技术规范
- ✅ **TypeScript 类型安全** - 完整的类型定义和类型检查
- ✅ **组件化架构** - 良好的组件切分和复用性
- ✅ **MUI 自定义主题** - 符合设计要求的蓝色主题配色
- ✅ **API 数据集成** - 真实的 FinMind API 数据获取
- ✅ **代码质量** - ESLint 规范检查，无警告构建

## 🏗️ 项目结构

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 根布局 + MUI 主题配置
│   ├── page.tsx                 # 主页面组件
│   └── globals.css              # 全局样式
├── components/                   # React 组件
│   ├── Chart/
│   │   └── RevenueChart.tsx     # 月营收图表组件
│   ├── Table/
│   │   └── RevenueTable.tsx     # 数据表格组件
│   ├── Layout/
│   │   └── MainLayout.tsx       # 主布局组件
│   └── Common/
│       ├── LoadingSpinner.tsx   # 加载状态组件
│       └── ErrorDisplay.tsx     # 错误显示组件
├── services/
│   └── finmindApi.ts           # FinMind API 服务
├── types/
│   └── revenue.types.ts        # TypeScript 类型定义
├── theme/
│   └── muiTheme.ts            # MUI 自定义主题
└── utils/
    └── dataProcessor.ts       # 数据处理工具函数
```

## 🚀 快速开始

### 前置要求
- Node.js 18+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建项目
```bash
npm run build
# 或
yarn build
```

### 启动生产服务器
```bash
npm start
# 或
yarn start
```

## 📊 数据说明

### FinMind API
- **免费服务**: 无需 API Token 即可使用基础功能
- **数据更新**: 月营收数据通常在每月15日左右更新
- **请求限制**: 免费版本有请求频率限制
- **注册地址**: https://finmindtrade.com/analysis/#/data/api

### 数据集说明
1. **TaiwanStockInfo**: 台股基本信息
   - 包含股票代号、公司名称、行业类别等
   
2. **TaiwanStockMonthRevenue**: 月营收数据
   - 包含各上市公司的月营收金额
   - 数据格式：日期(YYYY-MM-DD) + 股票代号 + 营收金额(千元)

### 数据处理
- **时间序列**: 按月份排序，支持时间范围筛选
- **增长率计算**: 自动计算同比增长率(与去年同月对比)和环比增长率(与上月对比)
- **数值格式化**: 营收金额显示为万元/亿元，增长率显示为百分比
- **数据验证**: 完整的数据完整性检查和错误处理

## 🎨 设计说明

### 参考设计
- **Figma 设计图**: 严格按照提供的设计图实现 UI 界面
- **财报狗网站**: 参考 https://statementdog.com/analysis/2330/monthly-revenue
- **雅虎股市**: 参考 https://tw.stock.yahoo.com/quote/2330.TW/revenue

### 主题配色
- **主色调**: 蓝色 (#1976d2) - 符合金融数据展示的专业感
- **背景色**: 浅灰 (#f5f5f5) - 提供良好的对比度
- **卡片样式**: 白色背景 + 圆角 + 阴影效果

### 响应式设计
- **桌面端**: 图表和表格左右分栏显示
- **移动端**: 垂直堆叠布局，确保数据可读性
- **断点设置**: xs(0px), sm(600px), md(960px), lg(1280px), xl(1920px)

## 🔧 开发说明

### 代码规范
- **TypeScript**: 严格的类型检查，禁用 `any` 类型
- **ESLint**: 代码规范检查，无警告构建
- **组件命名**: Pascal 命名法，清晰的组件名称
- **文件组织**: 按功能模块组织，清晰的目录结构

### 性能优化
- **懒加载**: 图表组件按需加载
- **缓存策略**: API 数据缓存，减少重复请求
- **构建优化**: Next.js 自动代码分割和优化

## 📱 部署指南

### ✅ Vercel 部署 (已完成)
**当前部署地址**: [https://taiwan-stock-revenue-analysis.vercel.app](https://taiwan-stock-revenue-analysis.vercel.app)

**部署步骤**:
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动构建和部署

**部署状态**: 
- ✅ 构建成功
- ✅ Chart.js SSR 问题已修复
- ✅ 生产环境完全正常运行

### Netlify 部署
1. 构建项目: `npm run build`
2. 上传 `out` 目录到 Netlify
3. 配置静态网站托管

### Docker 部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## ⚠️ 注意事项

### 功能限制 (按评测要求)
- ✅ **仅展示台积电(2330)数据** - 不支持其他股票查询
- ✅ **时间范围切换限制** - 仅支持预设的时间范围选项
- ✅ **无其他功能操作** - 专注于月营收数据展示
- ✅ **数据来源标识** - 明确标识数据来源和参考网站

### API 使用注意
- **网络要求**: 需要稳定的网络连接访问 FinMind API
- **CORS 问题**: 开发环境可能遇到跨域问题，生产环境正常
- **错误处理**: 完善的网络错误和 API 错误处理

## 🧪 测试

### 手动测试
1. **功能测试**: 验证图表显示、表格排序、时间范围切换
2. **响应式测试**: 在不同设备尺寸下测试界面适配
3. **错误测试**: 断网情况下测试错误处理
4. **性能测试**: 大量数据情况下的渲染性能

### 构建测试
```bash
npm run build  # 构建测试
npm run lint   # 代码规范检查
npm run type-check  # TypeScript 类型检查
```

## 📝 更新日志

### v1.0.0 (2024-08-08)
- ✅ 初始版本发布
- ✅ 完成所有评测要求功能
- ✅ 通过构建测试和类型检查
- ✅ 实现响应式设计
- ✅ 完善错误处理和用户体验

## 🤝 评测标准对照

| 评测项目 | 完成状态 | 说明 |
|---------|---------|------|
| 技术栈使用正确性 | ✅ | TypeScript + React + NextJS + MUI |
| 设计图还原度 | ✅ | 严格按照 Figma 设计图实现 |
| API 数据集成 | ✅ | FinMind API 集成，真实数据展示 |
| 代码组织和组件切分 | ✅ | 良好的组件架构和类型定义 |
| 项目可运行性 | ✅ | 构建成功，开发和生产环境正常运行 |
| 文档完整性 | ✅ | 详细的 README 和代码注释 |
| 部署上线 | ✅ | 已部署到生产环境: https://taiwan-stock-revenue-analysis.vercel.app |

## 📞 联系方式

- **项目**: Stark Tech 前端评测
- **技术栈**: Next.js + TypeScript + MUI
- **数据来源**: FinMind API
- **参考设计**: 财报狗 + Figma 设计图
