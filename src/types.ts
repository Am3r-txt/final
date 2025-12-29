import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Definimos los tipos aquí directamente para evitar errores de importación
export type HabitCategory = 'ahorro' | 'reciclaje' | 'energia' | 'transporte';

export interface HabitLog {
  id: string;
  category: HabitCategory;
  description: string;
  impact: number;
  date: string;
}

export interface UserStats {
  totalImpact: number;
  completedHabits: number;
  streak: number;
}

// Borra la línea 