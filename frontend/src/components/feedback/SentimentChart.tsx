import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { SentimentDataPoint } from '../../types/api';
import { TrendingUp, Activity } from 'lucide-react';

interface SentimentChartProps {
  data: SentimentDataPoint[];
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const formattedData = data.map((d) => ({
    ...d,
    formattedDate: new Date(d.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  const latestScore = data.length > 0 ? data[data.length - 1].overall_score : 0;
  const initialScore = data.length > 0 ? data[0].overall_score : 0;
  const scoreDiff = latestScore - initialScore;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Customer Sentiment Velocity
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Aggregated rolling net sentiment score across G2, Zendesk tickets, and sales calls
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
              {latestScore}%
            </span>
            <div className="flex items-center justify-end gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{scoreDiff}% vs Q2 baseline</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="positiveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="neutralGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="negativeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="overallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis
              dataKey="formattedDate"
              tickLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              stroke="#cbd5e1"
            />
            <YAxis
              tickLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              stroke="#cbd5e1"
              domain={[0, 100]}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
              }}
              labelStyle={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', paddingTop: '4px' }}
            />

            <Area
              type="monotone"
              dataKey="positive"
              name="Positive Mentions (%)"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#positiveGrad)"
            />
            <Area
              type="monotone"
              dataKey="neutral"
              name="Neutral Mentions (%)"
              stroke="#f59e0b"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#neutralGrad)"
            />
            <Area
              type="monotone"
              dataKey="negative"
              name="Negative Mentions (%)"
              stroke="#f43f5e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#negativeGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
