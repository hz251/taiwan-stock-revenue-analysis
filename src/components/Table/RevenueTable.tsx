'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import { MonthlyRevenue } from '@/types/revenue.types';
import { 
  formatRevenue, 
  formatPercentage, 
  formatMonthLabel 
} from '@/utils/dataProcessor';

interface RevenueTableProps {
  data: MonthlyRevenue[];
  title?: string;
  maxHeight?: number;
}

type SortDirection = 'asc' | 'desc';
type SortableColumns = 'date' | 'revenue' | 'yearOverYear' | 'monthOverMonth';

const RevenueTable: React.FC<RevenueTableProps> = ({
  data,
  title = '月营收详细数据',
  maxHeight = 600,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [sortColumn, setSortColumn] = useState<SortableColumns>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // 排序处理
  const handleSort = (column: SortableColumns) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  // 排序后的数据
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let aVal: Date | number, bVal: Date | number;
      
      switch (sortColumn) {
        case 'date':
          aVal = new Date(a.date);
          bVal = new Date(b.date);
          break;
        case 'revenue':
          aVal = a.revenue;
          bVal = b.revenue;
          break;
        case 'yearOverYear':
          aVal = a.yearOverYear;
          bVal = b.yearOverYear;
          break;
        case 'monthOverMonth':
          aVal = a.monthOverMonth;
          bVal = b.monthOverMonth;
          break;
        default:
          return 0;
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  // 获取增长率图标
  const getGrowthIcon = (value: number) => {
    if (value > 5) return <TrendingUp color="success" fontSize="small" />;
    if (value < -5) return <TrendingDown color="error" fontSize="small" />;
    return <TrendingFlat color="disabled" fontSize="small" />;
  };

  // 获取增长率颜色
  const getGrowthColor = (value: number) => {
    if (value > 0) return 'success.main';
    if (value < 0) return 'error.main';
    return 'text.secondary';
  };

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
          height={200}
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          {title}
        </Typography>
        <Chip 
          label={`共 ${data.length} 条记录`} 
          size="small" 
          color="primary" 
          variant="outlined" 
        />
      </Box>
      
      <TableContainer sx={{ maxHeight, overflowX: 'auto' }}>
        <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'date'}
                  direction={sortColumn === 'date' ? sortDirection : 'asc'}
                  onClick={() => handleSort('date')}
                >
                  <Box display="flex" alignItems="center" gap={0.5}>
                    时间
                    {sortColumn === 'date' && (
                      sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                    )}
                  </Box>
                </TableSortLabel>
              </TableCell>
              
              <TableCell align="right">
                <TableSortLabel
                  active={sortColumn === 'revenue'}
                  direction={sortColumn === 'revenue' ? sortDirection : 'asc'}
                  onClick={() => handleSort('revenue')}
                >
                  <Box display="flex" alignItems="center" gap={0.5} justifyContent="flex-end">
                    月营收
                    {sortColumn === 'revenue' && (
                      sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                    )}
                  </Box>
                </TableSortLabel>
              </TableCell>
              
              <TableCell align="center">
                <TableSortLabel
                  active={sortColumn === 'yearOverYear'}
                  direction={sortColumn === 'yearOverYear' ? sortDirection : 'asc'}
                  onClick={() => handleSort('yearOverYear')}
                >
                  <Box display="flex" alignItems="center" gap={0.5} justifyContent="center">
                    同比增长
                    {sortColumn === 'yearOverYear' && (
                      sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                    )}
                  </Box>
                </TableSortLabel>
              </TableCell>
              
              <TableCell align="center">
                <TableSortLabel
                  active={sortColumn === 'monthOverMonth'}
                  direction={sortColumn === 'monthOverMonth' ? sortDirection : 'asc'}
                  onClick={() => handleSort('monthOverMonth')}
                >
                  <Box display="flex" alignItems="center" gap={0.5} justifyContent="center">
                    环比增长
                    {sortColumn === 'monthOverMonth' && (
                      sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                    )}
                  </Box>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow 
                key={`${row.date}-${index}`}
                hover
                sx={{ 
                  '&:nth-of-type(odd)': { 
                    backgroundColor: 'action.hover' 
                  } 
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="body2" fontWeight="medium">
                    {formatMonthLabel(row.date)}
                  </Typography>
                </TableCell>
                
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="medium">
                    {formatRevenue(row.revenue)}
                  </Typography>
                </TableCell>
                
                <TableCell align="center">
                  <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                    {getGrowthIcon(row.yearOverYear)}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: getGrowthColor(row.yearOverYear),
                        fontWeight: 'medium' 
                      }}
                    >
                      {formatPercentage(row.yearOverYear)}
                    </Typography>
                  </Box>
                </TableCell>
                
                <TableCell align="center">
                  <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                    {getGrowthIcon(row.monthOverMonth)}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: getGrowthColor(row.monthOverMonth),
                        fontWeight: 'medium' 
                      }}
                    >
                      {formatPercentage(row.monthOverMonth)}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* 数据统计摘要 */}
      <Box mt={2} p={2} bgcolor="grey.50" borderRadius={1}>
        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
          数据摘要
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              最高月营收: 
            </Typography>
            <Typography variant="body2" fontWeight="medium" component="span" ml={0.5}>
              {formatRevenue(Math.max(...data.map(d => d.revenue)))}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              最低月营收: 
            </Typography>
            <Typography variant="body2" fontWeight="medium" component="span" ml={0.5}>
              {formatRevenue(Math.min(...data.map(d => d.revenue)))}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              平均同比增长: 
            </Typography>
            <Typography variant="body2" fontWeight="medium" component="span" ml={0.5}>
              {formatPercentage(data.reduce((sum, d) => sum + d.yearOverYear, 0) / data.length)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default RevenueTable;