# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个Stark Tech前端评测项目，目标是创建一个台股月营收数据展示网站。项目需要严格按照指定的技术栈和设计要求进行开发。

## 技术栈要求

**必须使用的技术栈**:
- **TypeScript** (必须)
- **React** + **NextJS** (推荐)
- **React functional components** (必须)  
- **Material-UI (MUI)** + 自定义Theme (必须)
- **Chart.js** 或 **Recharts** (图表展示)
- **FinMind API** (数据源)

## 核心功能要求

### 数据展示重点
- **目标股票**: 台积电(2330)
- **数据类型**: 月营收数据
- **图表类型**: 线图 + 柱状图组合展示
- **数据表格**: 月份排列的营收详细数据

### API集成
- 使用FinMind API获取真实数据
- 数据集: `TaiwanStockInfo` (股票清单) 和 `TaiwanStockMonthRevenue` (月营收)
- 需要注册免费会员: https://finmindtrade.com/analysis/#/data/api

### 设计还原
- 严格按照Figma设计图实现UI: https://www.figma.com/file/nBCCS3g1xFDJnFShBBuVZB...
- 参考财报狗网站: https://statementdog.com/analysis/2330/monthly-revenue
- 蓝色主题色彩(#1976d2)，卡片式布局

## 组件架构

### 推荐的组件切分结构
```
src/
├── components/
│   ├── Chart/
│   │   └── RevenueChart.tsx          # 月营收图表组件
│   ├── Table/
│   │   └── RevenueTable.tsx          # 月营收数据表格
│   ├── Layout/
│   │   └── MainLayout.tsx            # 主布局组件
│   └── Common/
├── services/
│   └── finmindApi.ts                 # FinMind API服务
├── types/
│   └── revenue.types.ts              # TypeScript类型定义
├── theme/
│   └── muiTheme.ts                   # MUI主题配置
└── utils/
    └── dataProcessor.ts              # 数据处理工具
```

### 关键TypeScript接口
```typescript
interface MonthlyRevenue {
  date: string;           // 年月 (YYYY-MM)
  revenue: number;        // 营收金额
  yearOverYear: number;   // 同比增长率
  monthOverMonth: number; // 环比增长率
}

interface StockInfo {
  stockId: string;        // 股票代号 (2330)
  stockName: string;      // 公司名称 (台积电)
  monthlyRevenue: MonthlyRevenue[];
}
```

## 响应式设计要求

- **桌面端**: 左右分栏显示
- **移动端**: 垂直堆叠布局
- 使用MUI的Grid系统和断点系统
- 图表需要在不同屏幕尺寸下保持可读性

## 开发限制和要求

### 功能限制
- 只能展示台积电(2330)的财务信息
- 不能增减其他功能操作
- 仅能切换图表时间范围
- 必须包含数据来源信息

### 代码质量要求
- 良好的Component切分
- 完整的TypeScript类型定义  
- 适当的错误处理和加载状态
- 数值格式化(千分位分隔符)

## 项目文档

详细的项目需求和设计分析请参考:
- `requirements.md` - 完整项目需求文档
- `design-analysis.md` - Figma设计图详细分析
- `assets/` - 设计图和需求截图

## 评测标准

项目将按照以下标准进行评测:
- 技术栈使用正确性
- 设计图还原度  
- API数据集成准确性
- 代码组织和组件切分
- 项目可运行性
- 文档完整性
- 部署上线(加分项)