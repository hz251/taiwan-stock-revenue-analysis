'use client';

import React, { useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { MonthlyRevenue } from '@/types/revenue.types';
import { formatMonthLabel, formatRevenue } from '@/utils/dataProcessor';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueChartProps {
  data: MonthlyRevenue[];
  height?: number;
  title?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  height = 400,
  title = '月营收趋势图',
}) => {
  const theme = useTheme();

  // 处理图表数据
  const chartData = useMemo(() => {
    const labels = data.map(item => formatMonthLabel(item.date));
    const revenueData = data.map(item => item.revenue / 10000); // 转换为万元
    const yoyData = data.map(item => item.yearOverYear);

    return {
      labels,
      datasets: [
        // 月营收柱状图
        {
          type: 'bar' as const,
          label: '月营收 (万元)',
          data: revenueData,
          backgroundColor: theme.palette.primary.light + '80', // 80% 透明度
          borderColor: theme.palette.primary.main,
          borderWidth: 1,
          yAxisID: 'y',
          order: 2,
        },
        // 同比增长率折线图
        {
          type: 'line' as const,
          label: '同比增长率 (%)',
          data: yoyData,
          borderColor: theme.palette.error.main,
          backgroundColor: theme.palette.error.main + '20',
          pointBackgroundColor: theme.palette.error.main,
          pointBorderColor: theme.palette.error.dark,
          pointHoverBackgroundColor: theme.palette.error.dark,
          pointHoverBorderColor: theme.palette.common.white,
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.2,
          yAxisID: 'y1',
          order: 1,
        },
      ],
    };
  }, [data, theme]);

  // 图表配置选项
  const options: ChartOptions<'bar' | 'line'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
          },
          color: theme.palette.text.primary,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || '';
            const value = context.parsed.y;
            
            if (datasetLabel.includes('营收')) {
              return `${datasetLabel}: ${formatRevenue(value * 10000)}`;
            } else if (datasetLabel.includes('增长率')) {
              const sign = value >= 0 ? '+' : '';
              return `${datasetLabel}: ${sign}${value.toFixed(2)}%`;
            }
            
            return `${datasetLabel}: ${value}`;
          },
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: '时间',
          color: theme.palette.text.secondary,
          font: {
            size: 12,
          },
        },
        ticks: {
          color: theme.palette.text.secondary,
          maxRotation: 45,
          minRotation: 0,
        },
        grid: {
          color: theme.palette.divider + '30',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '月营收 (万元)',
          color: theme.palette.primary.main,
          font: {
            size: 12,
          },
        },
        ticks: {
          color: theme.palette.primary.main,
          callback: (value) => {
            return `${Number(value).toLocaleString()}万`;
          },
        },
        grid: {
          color: theme.palette.divider + '20',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: '同比增长率 (%)',
          color: theme.palette.error.main,
          font: {
            size: 12,
          },
        },
        ticks: {
          color: theme.palette.error.main,
          callback: (value) => {
            const sign = Number(value) >= 0 ? '+' : '';
            return `${sign}${Number(value).toFixed(1)}%`;
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }), [theme]);

  if (!data || data.length === 0) {
    return (
      <Paper elevation={2} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          height={height}
        >
          <Typography color="text.secondary">
            暂无数据
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
        {title}
      </Typography>
      <Box height={height}>
        <Chart type="bar" data={chartData} options={options} />
      </Box>
    </Paper>
  );
};

export default RevenueChart;