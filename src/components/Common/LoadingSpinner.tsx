'use client';

import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
  showPaper?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = '加载中...',
  size = 40,
  showPaper = true,
}) => {
  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      py={4}
    >
      <CircularProgress size={size} color="primary" />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );

  if (showPaper) {
    return (
      <Paper elevation={2} sx={{ padding: 2 }}>
        {content}
      </Paper>
    );
  }

  return content;
};

export default LoadingSpinner;