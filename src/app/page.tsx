'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import MainLayout from '@/components/Layout/MainLayout';
import RevenueChart from '@/components/Chart/RevenueChart';
import RevenueTable from '@/components/Table/RevenueTable';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import ErrorDisplay from '@/components/Common/ErrorDisplay';
import { getTSMCRevenueData } from '@/services/finmindApi';
import { filterDataByTimeRange } from '@/utils/dataProcessor';
import { MonthlyRevenue, TimeRangeOption } from '@/types/revenue.types';

// 时间范围选项
const timeRangeOptions: TimeRangeOption[] = [
  { label: '最近12个月', value: '12', months: 12 },
  { label: '最近18个月', value: '18', months: 18 },
  { label: '最近24个月', value: '24', months: 24 },
  { label: '最近36个月', value: '36', months: 36 },
  { label: '全部数据', value: 'all', months: 0 },
];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allData, setAllData] = useState<MonthlyRevenue[]>([]);
  const [displayData, setDisplayData] = useState<MonthlyRevenue[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('24');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // 获取数据
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 获取台积电月营收数据
      const data = await getTSMCRevenueData(48); // 获取更多数据供筛选
      
      if (data && data.length > 0) {
        setAllData(data);
        // 默认显示最近24个月数据
        const filtered = filterDataByTimeRange(data, 24);
        setDisplayData(filtered);
        
        setSnackbarOpen(true);
      } else {
        throw new Error('未获取到有效数据');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取数据失败';
      setError(`数据加载失败: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // 处理时间范围变更
  const handleTimeRangeChange = (value: string) => {
    setSelectedTimeRange(value);
    
    if (value === 'all') {
      setDisplayData(allData);
    } else {
      const months = parseInt(value);
      const filtered = filterDataByTimeRange(allData, months);
      setDisplayData(filtered);
    }
  };

  // 初始化数据加载
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <Box>
        {/* 时间范围选择器 */}
        <Box mb={3}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>时间范围</InputLabel>
            <Select
              value={selectedTimeRange}
              label="时间范围"
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              disabled={loading}
            >
              {timeRangeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* 错误显示 */}
        {error && (
          <Box mb={3}>
            <ErrorDisplay 
              error={error} 
              onRetry={fetchData}
            />
          </Box>
        )}

        {/* 加载状态 */}
        {loading && (
          <Box mb={3}>
            <LoadingSpinner 
              message="正在获取台积电月营收数据..." 
              size={50}
            />
          </Box>
        )}

        {/* 主要内容 */}
        {!loading && !error && displayData.length > 0 && (
          <Box>
            {/* 图表区域 */}
            <Box mb={3}>
              <RevenueChart 
                data={displayData}
                title="台积电(2330) 月营收趋势分析"
                height={450}
              />
            </Box>

            {/* 数据表格区域 */}
            <Box>
              <RevenueTable 
                data={displayData}
                title="完整月营收数据表"
                maxHeight={600}
              />
            </Box>
          </Box>
        )}

        {/* 无数据提示 */}
        {!loading && !error && displayData.length === 0 && allData.length === 0 && (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="400px"
          >
            <Alert severity="info">
              暂无可显示的数据，请检查网络连接或稍后重试
            </Alert>
          </Box>
        )}

        {/* 成功提示 Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity="success" 
            sx={{ width: '100%' }}
          >
            数据加载成功！显示 {displayData.length} 条月营收记录
          </Alert>
        </Snackbar>
      </Box>
    </MainLayout>
  );
}