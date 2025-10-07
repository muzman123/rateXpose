'use client'

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendData } from '@/lib/supabase';

interface PriceTrendChartProps {
  data: TrendData[];
  title: string;
  serviceType: 'mobile' | 'internet' | 'utility';
  valueLabel?: string;
  isAuthenticated: boolean;
}

const PriceTrendChart: React.FC<PriceTrendChartProps> = ({ 
  data, 
  title, 
  serviceType,
  valueLabel = 'Average Price ($)',
  isAuthenticated 
}) => {
  if (!data || data.length === 0) {
    return null; // Don't show anything if no data
  }

  // Format dates for display
  const chartData = data.map(item => ({
    ...item,
    displayDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-secondary-200 rounded-lg shadow-lg">
          <p className="font-semibold text-secondary-900">
            Week of {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-sm text-secondary-700">Average: ${data.avgPrice}</p>
          <p className="text-sm text-secondary-500">{data.count} submissions</p>
        </div>
      );
    }
    return null;
  };

  const lineColor = serviceType === 'mobile' ? '#3b82f6' 
    : serviceType === 'internet' ? '#10b981' 
    : '#f59e0b';

  return (
    <div className="card relative">
      {/* Blur overlay for non-authenticated users */}
      {!isAuthenticated && (
        <div className="absolute inset-0 z-10 backdrop-blur-md bg-white/30 rounded-lg flex items-center justify-center">
          <div className="text-center bg-white/95 p-6 rounded-lg shadow-lg max-w-md">
            <svg className="w-12 h-12 mx-auto mb-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              Unlock Price Trends
            </h3>
            <p className="text-sm text-secondary-600 mb-4">
              See how prices have changed over the last 90 days and identify the best time to switch.
            </p>
            <a href="/sign-up" className="btn btn-primary inline-block">
              Sign Up to View
            </a>
          </div>
        </div>
      )}

      {/* Chart content */}
      <div className={isAuthenticated ? '' : 'filter blur-sm pointer-events-none'}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
          <p className="text-sm text-secondary-600 mt-1">
            90-day price trend based on real submissions
          </p>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="displayDate" 
              tick={{ fontSize: 11 }}
              stroke="#6b7280"
            />
            <YAxis 
              label={{ value: valueLabel, angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="avgPrice" 
              stroke={lineColor}
              strokeWidth={2}
              dot={{ fill: lineColor, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 flex items-center justify-between text-xs text-secondary-500">
          <span>Based on {data.reduce((sum, item) => sum + item.count, 0)} submissions over 90 days</span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-success-500 rounded-full mr-1"></div>
            Live data
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceTrendChart;