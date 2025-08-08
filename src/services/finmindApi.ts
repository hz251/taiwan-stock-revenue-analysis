import axios from 'axios';
import { 
  FinMindApiResponse, 
  TaiwanStockInfo, 
  TaiwanStockMonthRevenue,
  StockInfo,
  MonthlyRevenue 
} from '@/types/revenue.types';
import { processMonthlyRevenueData } from '@/utils/dataProcessor';

// FinMind API 基础配置
const FINMIND_BASE_URL = 'https://api.finmindtrade.com/api/v4';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: FINMIND_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * 获取台股基本信息
 */
export const getTaiwanStockInfo = async (
  token?: string
): Promise<TaiwanStockInfo[]> => {
  try {
    const params: Record<string, string> = {
      dataset: 'TaiwanStockInfo',
    };
    
    if (token) {
      params.token = token;
    }

    const response = await apiClient.get<FinMindApiResponse<TaiwanStockInfo>>('/data', {
      params,
    });

    if (response.data.status !== 200) {
      throw new Error(response.data.msg || 'API request failed');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error fetching Taiwan stock info:', error);
    throw error;
  }
};

/**
 * 获取指定股票的月营收数据
 */
export const getTaiwanStockMonthRevenue = async (
  stockId: string = '2330',
  startDate?: string,
  endDate?: string,
  token?: string
): Promise<TaiwanStockMonthRevenue[]> => {
  try {
    const params: Record<string, string> = {
      dataset: 'TaiwanStockMonthRevenue',
      data_id: stockId,
    };

    if (startDate) {
      params.start_date = startDate;
    }
    
    if (endDate) {
      params.end_date = endDate;
    }
    
    if (token) {
      params.token = token;
    }

    const response = await apiClient.get<FinMindApiResponse<TaiwanStockMonthRevenue>>('/data', {
      params,
    });

    if (response.data.status !== 200) {
      throw new Error(response.data.msg || 'API request failed');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error fetching monthly revenue data:', error);
    throw error;
  }
};

/**
 * 获取台积电完整的股票信息和月营收数据
 */
export const getTSMCStockData = async (
  token?: string,
  months: number = 24 // 默认获取最近24个月数据
): Promise<StockInfo> => {
  try {
    // 计算开始日期 (最近N个月)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - months);
    
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    // 并行获取股票基本信息和月营收数据
    const [stockInfoData, monthlyRevenueData] = await Promise.all([
      getTaiwanStockInfo(token),
      getTaiwanStockMonthRevenue('2330', startDateStr, endDateStr, token),
    ]);

    // 查找台积电的基本信息
    const tsmcInfo = stockInfoData.find(stock => stock.stock_id === '2330');
    
    if (!tsmcInfo) {
      throw new Error('台积电股票信息未找到');
    }

    // 处理月营收数据
    const processedRevenue = processMonthlyRevenueData(monthlyRevenueData);

    return {
      stockId: tsmcInfo.stock_id,
      stockName: tsmcInfo.stock_name,
      industry: tsmcInfo.industry_category,
      monthlyRevenue: processedRevenue,
    };
  } catch (error) {
    console.error('Error fetching TSMC stock data:', error);
    throw error;
  }
};

/**
 * 获取最近N个月的台积电月营收数据 (不需要token的版本)
 */
export const getTSMCRevenueData = async (
  months: number = 24
): Promise<MonthlyRevenue[]> => {
  try {
    // 计算日期范围
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - months);
    
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    // 获取月营收数据
    const monthlyRevenueData = await getTaiwanStockMonthRevenue(
      '2330', 
      startDateStr, 
      endDateStr
    );

    // 处理数据
    return processMonthlyRevenueData(monthlyRevenueData);
  } catch (error) {
    console.error('Error fetching TSMC revenue data:', error);
    throw error;
  }
};

/**
 * 测试 API 连接
 */
export const testApiConnection = async (): Promise<boolean> => {
  try {
    // 尝试获取少量数据来测试连接
    const testData = await getTaiwanStockInfo();
    return Array.isArray(testData) && testData.length > 0;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};