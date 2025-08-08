# Stark Tech 前端评测项目需求

## 项目概述

**项目名称**: Stark Tech前端評測 (1)  
**项目类型**: 台股月营收数据展示网站  
**来源页面**: https://starktech.notion.site/Stark-Tech-1-2593796171d44c0b89af35dad29612fd

## 评测范畴

1. 参考提供的设计图与提供的网站，将该网站的功能按照敘述实作（一页）

## 评测技术要求

### 编程语言
- **TypeScript** (必须)

### 前端框架
- **React** (必须)
  - NextJS 佳
  - 使用React functional component (必须)

### 组件库要求
- **使用Component Library** (必须)
  - MUI 佳，並且有設定Theme
  
### 代码质量
- **良好的Component切分** (必须)

## 评测画面说明

- 画面主要参考财报狗的画面
- 因为财报狗上有些数据无法从finmind取得，因此有调整画面（包括选用的数据内容）
- 财报狗上的部分供参考操作情境、数据及计算结果可参考正确性
- **重要**: 需留意不是完全按照财报狗开发

## 参考相似功能网站

### 主要参考
- **财报狗**: https://statementdog.com/analysis/2330/monthly-revenue
- **雅虎股市**: https://tw.stock.yahoo.com/quote/2330.TW/revenue

## 数据API要求

### API提供商
- **FinMind API** (免费会员)
- 注册地址: https://finmindtrade.com/analysis/#/data/api

### 需要使用的数据集
1. **股票的清单**: 
   - 数据集: 技术面的台股总览（TaiwanStockInfo）
   
2. **每月营收**: 
   - 数据集: 基本面的月营收表（TaiwanStockMonthRevenue）

## 缴交内容

### 1. Github Repo (必须)
- **a.** 可以运行的程式
- **b.** README说明启动方式、部署规划、任何需要补充的内容等

### 2. 真实部署网址 (加分项)
- 提供真实部署的网址

## 设计图信息

- **Figma链接**: https://www.figma.com/file/nBCCS3g1xFDJnFShBBuVZB?embed_host=notion&kind=file&mode=design&node-id=0-1&page-selector=0&t=zkzG36fgrHo7VSkX-0&type=design&viewer=1
- **设计主题**: 每月营收数据展示
- **最后编辑**: 1 year ago

## 项目重点

1. **技术规范**: 严格按照TypeScript + React + MUI的技术栈
2. **设计还原**: 按照Figma设计图实现UI界面
3. **数据集成**: 正确集成FinMind API获取真实股票数据
4. **代码质量**: 良好的组件切分和代码组织
5. **文档完善**: 详细的README和部署说明
6. **可运行性**: 确保项目可以正常启动和运行

## 评测标准

- ✅ 技术栈使用正确性
- ✅ 设计图还原度
- ✅ API数据集成
- ✅ 代码组织和组件切分
- ✅ 项目可运行性
- ✅ 文档完整性
- 🔥 部署上线 (加分项)