'use client'

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { PriceDistributionData } from '@/lib/supabase';

interface PriceDistributionChartProps {
  data: PriceDistributionData[];
  title: string;
  valueLabel?: string;
  isAuthenticated: boolean;
}

const COLORS = {
  Bell: '#0066cc',
  Rogers: '#cc0000',
  Telus: '#4d0099',
  Shaw: '#00cc66',
  Fido: '#ff6600',
  Koodo: '#00cc99',
  Freedom: '#ff3366',
  Chatr: '#9933ff',
  ENMAX: '#ff9900',
  'Direct Energy': '#0099ff',
  ATCO: '#cc3300',
};

const PriceDistributionChart: React.FC<PriceDistributionChartProps> = ({ 
  data, 
  title, 
  valueLabel = 'Price ($)',
  isAuthenticated 
}) => {
  if (!data || data.length === 0) {
    return null; // Don't show anything if no data
  }

  // Prepare data for the chart
  const chartData = data.map(item => ({
    provider: item.provider,
    min: item.min,
    avg: item.avg,
    max: item.max,
    count: item.count,
    range: item.max - item.min,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-secondary-200 rounded-lg shadow-lg">
          <p className="font-semibold text-secondary-900">{data.provider}</p>
          <p className="text-sm text-secondary-700">Min: ${data.min}</p>
          <p className="text-sm text-secondary-700">Average: ${data.avg}</p>
          <p className="text-sm text-secondary-700">Max: ${data.max}</p>
          <p className="text-sm text-secondary-500 mt-1">{data.count} submissions</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card relative">
      {/* Blur overlay for non-authenticated users */}
      {!isAuthenticated && (
        <div className="absolute inset-0 z-10 backdrop-blur-md bg-white/30 rounded-lg flex items-center justify-center">
          <div className="text-center bg-white/95 p-6 rounded-lg shadow-lg max-w-md">
            <svg className="w-12 h-12 mx-auto mb-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              Unlock Price Insights
            </h3>
            <p className="text-sm text-secondary-600 mb-4">
              Sign up for free to view detailed price distribution charts and compare rates across providers.
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
            Showing price ranges from real Canadian submissions
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="provider" 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis 
              label={{ value: valueLabel, angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="min" name="Minimum" fill="#93c5fd" />
            <Bar dataKey="avg" name="Average" fill="#3b82f6">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.provider as keyof typeof COLORS] || '#3b82f6'} />
              ))}
            </Bar>
            <Bar dataKey="max" name="Maximum" fill="#dbeafe" />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 flex items-center justify-between text-xs text-secondary-500">
          <span>Based on {data.reduce((sum, item) => sum + item.count, 0)} real submissions</span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-success-500 rounded-full mr-1"></div>
            Live data
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceDistributionChart;