// 台股月营收数据类型定义

export interface MonthlyRevenue {
  date: string;           // 年月 (YYYY-MM)
  revenue: number;        // 营收金额 (千元)
  yearOverYear: number;   // 同比增长率 (%)
  monthOverMonth: number; // 环比增长率 (%)
}

export interface StockInfo {
  stockId: string;        // 股票代号 (2330)
  stockName: string;      // 公司名称 (台积电)
  industry: string;       // 行业
  monthlyRevenue: MonthlyRevenue[];
}

// FinMind API 响应类型
export interface FinMindApiResponse<T> {
  msg: string;
  status: number;
  data: T[];
}

// 台股基本信息 API 响应数据
export interface TaiwanStockInfo {
  stock_id: string;       // 股票代号
  stock_name: string;     // 公司名称
  industry_category: string; // 行业类别
  market_type: string;    // 市场类型
}

// 月营收 API 响应数据
export interface TaiwanStockMonthRevenue {
  date: string;           // 日期 YYYY-MM-DD
  stock_id: string;       // 股票代号
  revenue: number;        // 营收 (千元)
}

// 图表数据类型
export interface ChartDataPoint {
  label: string;          // X轴标签 (月份)
  revenue: number;        // Y轴数值 (营收)
  yearOverYear?: number;  // 同比增长率
}

// 表格行数据类型
export interface TableRowData {
  date: string;           // 日期
  revenue: string;        // 格式化后的营收金额
  yearOverYear: string;   // 格式化后的同比增长率
  monthOverMonth: string; // 格式化后的环比增长率
  revenueRaw: number;     // 原始营收数值
}

// API 加载状态
export interface ApiLoadingState {
  loading: boolean;
  error: string | null;
  data: unknown | null;
}

// 时间范围选择
export interface TimeRangeOption {
  label: string;
  value: string;
  months: number;        // 显示最近几个月的数据
}