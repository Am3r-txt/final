import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, HabitCategory } from '../context/AppContext';
import { Save, AlertCircle } from 'lucide-react';

const HabitLog: React.FC = () => {
  const navigate = useNavigate();
  const { addLog } = useApp();
  
  // 1. Usamos una categoría válida de las que definimos: 'ahorro'
  const [formData, setFormData] = useState({
    category: 'ahorro' as HabitCategory,
    description: '',
    impact: 5 // Cambiado de impactScore a impact
  });

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.description.trim()) {
      setError('Please provide a description of your activity.');
      return;
    }

    // 2. Enviamos 'impact' para que coincida con la función addLog del Context
    addLog({
      category: formData.category,
      description: formData.description,
      impact: Number(formData.impact)
    });

    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Definimos las opciones manualmente para evitar depender de Enums externos
  const categories: HabitCategory[] = ['ahorro', 'reciclaje', 'energia', 'transporte'];

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Log Activity</h1>
        <p className="text-slate-500 mt-1">Record your sustainable choices and earn points.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-semibold text-slate-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Took a 5 min shorter shower..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="impact" className="block text-sm font-semibold text-slate-700">
              Impact Score (1-10)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                id="impact"
                name="impact"
                min="1"
                max="10"
                value={formData.impact}
                onChange={handleChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="text-lg font-bold text-emerald-600 w-8 text-center">{formData.impact}</span>
            </div>
            <p className="text-xs text-slate-400">Rate the positive impact of this activity on the environment.</p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-sm flex justify-center items-center gap-2"
            >
              <Save size={18} />
              Save Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitLog;