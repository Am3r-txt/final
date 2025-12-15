import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import StatsChart from '../components/StatsChart';
import { getEcoAdvice } from '../services/geminiService';
import { TrendingUp, Award, Leaf, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { stats, logs } = useApp();
  const [advice, setAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const handleGetAdvice = async () => {
    setLoadingAdvice(true);
    const result = await getEcoAdvice(logs.slice(0, 10)); // Analyze last 10 logs
    setAdvice(result);
    setLoadingAdvice(false);
  };

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Track your contribution to a better planet.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Impact Score</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalScore}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
            <Leaf size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Habits Logged</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalLogs}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Current Streak</p>
            <p className="text-2xl font-bold text-slate-900">{stats.streak} Days</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Impact by Category</h2>
          <StatsChart />
        </div>

        {/* AI Advice Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl shadow-sm border border-emerald-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-600">
            <Sparkles size={80} />
          </div>
          <div className="relative z-10">
            <h2 className="text-lg font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <Sparkles size={18} />
              AI Eco-Advisor
            </h2>
            <p className="text-sm text-emerald-800 mb-4">
              Get personalized tips based on your recent activity logs.
            </p>
            
            {advice ? (
              <div className="bg-white/60 p-4 rounded-xl text-emerald-900 text-sm italic mb-4 border border-emerald-100/50 backdrop-blur-sm">
                "{advice}"
              </div>
            ) : null}

            <button
              onClick={handleGetAdvice}
              disabled={loadingAdvice}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loadingAdvice ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                <>Get New Advice</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Logs List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
            <Link to="/log" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                Add New <ArrowRight size={16}/>
            </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No activities logged yet. Start today!</div>
          ) : (
            logs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800">{log.description}</p>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wide">
                    {log.category}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-emerald-600 font-bold">+{log.impactScore} pts</span>
                  <span className="text-xs text-slate-400">{new Date(log.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;