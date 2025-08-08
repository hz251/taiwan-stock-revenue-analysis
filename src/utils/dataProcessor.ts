import { 
  MonthlyRevenue, 
  TaiwanStockMonthRevenue, 
  ChartDataPoint, 
  TableRowData 
} from '@/types/revenue.types';

/**
 * 格式化数字，添加千分位分隔符
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('zh-TW').format(num);
};

/**
 * 格式化营收金额，单位转换为万元
 */
export const formatRevenue = (revenue: number): string => {
  const revenueInWan = revenue / 10000; // 千元转万元
  if (revenueInWan >= 10000) {
    return `${(revenueInWan / 10000).toFixed(2)}亿`;
  } else if (revenueInWan >= 1) {
    return `${revenueInWan.toFixed(2)}万`;
  } else {
    return `${formatNumber(revenue)}千`;
  }
};

/**
 * 格式化百分比
 */
export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

/**
 * 计算同比增长率
 */
export const calculateYearOverYear = (
  current: number, 
  previous: number
): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * 计算环比增长率
 */
export const calculateMonthOverMonth = (
  current: number, 
  previous: number
): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * 处理 FinMind API 的月营收数据
 */
export const processMonthlyRevenueData = (
  apiData: TaiwanStockMonthRevenue[]
): MonthlyRevenue[] => {
  // 按日期排序
  const sortedData = apiData.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return sortedData.map((item, index) => {
    const date = item.date.substring(0, 7); // 提取 YYYY-MM
    const revenue = item.revenue || 0;
    
    // 计算同比增长率 (与去年同月比较)
    const lastYearIndex = index - 12;
    const lastYearRevenue = lastYearIndex >= 0 ? sortedData[lastYearIndex].revenue || 0 : 0;
    const yearOverYear = calculateYearOverYear(revenue, lastYearRevenue);
    
    // 计算环比增长率 (与上个月比较)
    const lastMonthRevenue = index > 0 ? sortedData[index - 1].revenue || 0 : 0;
    const monthOverMonth = calculateMonthOverMonth(revenue, lastMonthRevenue);

    return {
      date,
      revenue,
      yearOverYear,
      monthOverMonth,
    };
  });
};

/**
 * 准备图表数据
 */
export const prepareChartData = (data: MonthlyRevenue[]): ChartDataPoint[] => {
  return data.map(item => ({
    label: formatMonthLabel(item.date),
    revenue: item.revenue / 10000, // 转换为万元显示
    yearOverYear: item.yearOverYear,
  }));
};

/**
 * 准备表格数据
 */
export const prepareTableData = (data: MonthlyRevenue[]): TableRowData[] => {
  return data.map(item => ({
    date: formatMonthLabel(item.date),
    revenue: formatRevenue(item.revenue),
    yearOverYear: formatPercentage(item.yearOverYear),
    monthOverMonth: formatPercentage(item.monthOverMonth),
    revenueRaw: item.revenue,
  }));
};

/**
 * 格式化月份标签
 */
export const formatMonthLabel = (dateStr: string): string => {
  const [year, month] = dateStr.split('-');
  return `${year}年${parseInt(month)}月`;
};

/**
 * 获取指定时间范围的数据
 */
export const filterDataByTimeRange = <T extends { date: string }>(
  data: T[], 
  months: number
): T[] => {
  if (months <= 0) return data;
  
  // 按日期倒序排序，取最近的N个月
  const sortedData = [...data].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return sortedData.slice(0, months).reverse();
};

/**
 * 验证数据完整性
 */
export const validateRevenueData = (data: unknown[]): boolean => {
  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }
  
  return data.every((item): item is { date: string; revenue: number } => {
    if (item == null || typeof item !== 'object') {
      return false;
    }
    
    const obj = item as Record<string, unknown>;
    return (
      'date' in obj &&
      'revenue' in obj &&
      typeof obj.date === 'string' && 
      typeof obj.revenue === 'number'
    );
  });
};