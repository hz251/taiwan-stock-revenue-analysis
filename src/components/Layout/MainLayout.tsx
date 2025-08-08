'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Link,
} from '@mui/material';
import { TrendingUp, Assessment } from '@mui/icons-material';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: 'background.default',
      paddingTop: 2,
      paddingBottom: 4,
    }}>
      {/* Header */}
      <Container maxWidth="xl">
        <Paper 
          elevation={2} 
          sx={{ 
            padding: 3, 
            marginBottom: 3,
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white',
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <TrendingUp fontSize="large" />
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                台积电(2330) 月营收分析
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Stark Tech 前端评测项目 - 基于 FinMind API 的真实数据展示
              </Typography>
            </Box>
          </Box>
          
          {/* 功能限制说明 */}
          <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
            <Chip 
              icon={<Assessment />}
              label="仅展示台积电数据" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                '& .MuiChip-icon': { color: 'white' }
              }} 
            />
            <Chip 
              label="可切换时间范围" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white' 
              }} 
            />
            <Chip 
              label="真实API数据" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white' 
              }} 
            />
          </Box>
        </Paper>

        {/* Main Content */}
        <Box>
          {children}
        </Box>

        {/* Footer */}
        <Paper 
          elevation={1} 
          sx={{ 
            padding: 2, 
            marginTop: 4, 
            textAlign: 'center',
            backgroundColor: 'grey.50',
          }}
        >
          <Typography variant="body2" color="text.secondary" gutterBottom>
            数据来源: FinMind API | 参考设计: 财报狗
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            <Link 
              href="https://finmindtrade.com" 
              target="_blank" 
              rel="noopener noreferrer"
              color="primary"
              underline="hover"
            >
              FinMind API
            </Link>
            <Link 
              href="https://statementdog.com/analysis/2330/monthly-revenue" 
              target="_blank" 
              rel="noopener noreferrer"
              color="primary"
              underline="hover"
            >
              财报狗 (参考)
            </Link>
            <Link 
              href="https://tw.stock.yahoo.com/quote/2330.TW/revenue" 
              target="_blank" 
              rel="noopener noreferrer"
              color="primary"
              underline="hover"
            >
              雅虎股市 (参考)
            </Link>
          </Box>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            © 2024 Stark Tech Frontend Assessment Project
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default MainLayout;