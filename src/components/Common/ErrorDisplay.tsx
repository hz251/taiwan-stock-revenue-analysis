'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
} from '@mui/material';
import { Error as ErrorIcon, Refresh } from '@mui/icons-material';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  showPaper?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  showPaper = true,
}) => {
  const content = (
    <Box py={2}>
      <Alert 
        severity="error" 
        icon={<ErrorIcon />}
        action={
          onRetry && (
            <Button 
              color="inherit" 
              size="small" 
              onClick={onRetry}
              startIcon={<Refresh />}
            >
              重试
            </Button>
          )
        }
      >
        <Typography variant="body2">
          {error}
        </Typography>
      </Alert>
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

export default ErrorDisplay;