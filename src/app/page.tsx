'use client'

import React, { useState, useEffect } from 'react';
import {
  Clock, Warehouse, AlertCircle, CheckCircle, Package,
  Users, TrendingUp, RefreshCw, X, ChevronRight
} from 'lucide-react';

// Tipos para dados
interface Activity {
  id: number;
  time: string;
  text: string;
  type: 'start' | 'complete' | 'reassign' | 'substitute';
}

interface Sector {
  name: string;
  status: 'ok' | 'alerta' | 'ruptura';
  items: number;
}

export default function LogisticsDashboard() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showRuptureModal, setShowRuptureModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, time: '08:15', text: 'Marcos iniciou coleta do Pedido #1054', type: 'start' },
    { id: 2, time: '08:12', text: 'Fernanda finalizou Pedido #1051', type: 'complete' },
    { id: 3, time: '08:05', text: 'João iniciou separação de Pedido #1053', type: 'start' },
  ]);

  const [sectors, setSectors] = useState<Sector[]>([
    { name: 'A1', status: 'ok', items: 245 },
    { name: 'A2', status: 'ok', items: 198 },
    { name: 'A3', status: 'ruptura', items: 87 },
    { name: 'B1', status: 'ok', items: 312 },
    { name: 'B2', status: 'alerta', items: 156 },
    { name: 'C1', status: 'ok', items: 278 },
  ]);

  // Atualiza hora a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Formata hora
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Define cor do setor
  const getSectorColor = (status: Sector['status']): string => {
    switch (status) {
      case 'ok': return 'bg-green-500';
      case 'alerta': return 'bg-yellow-500';
      case 'ruptura': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  // Ações
  const handleReassign = (): void => {
    setShowSuccessModal(true);
    setShowRuptureModal(false);
    setTimeout(() => {
      setActivities(prev => [
        { id: Date.now(), time: formatTime(new Date()).slice(0, 5), text: 'Pedido #1054 reatribuído para Ana Costa', type: 'reassign' },
        ...prev
      ]);
      setSectors(prev => prev.map(s =>
        s.name === 'A3' ? { ...s, status: 'alerta' } : s
      ));
    }, 1000);
  };

  const handleSubstitute = (): void => {
    setShowSuccessModal(true);
    setShowRuptureModal(false);
    setTimeout(() => {
      setActivities(prev => [
        { id: Date.now(), time: formatTime(new Date()).slice(0, 5), text: 'Itens substituídos no Pedido #1054', type: 'substitute' },
        ...prev
      ]);
    }, 1000);
  };

  const handleResolve = (): void => {
    setShowSuccessModal(true);
    setShowRuptureModal(false);
    setTimeout(() => {
      setActivities(prev => [
        { id: Date.now(), time: formatTime(new Date()).slice(0, 5), text: 'Ruptura do Pedido #1054 resolvida', type: 'complete' },
        ...prev
      ]);
      setSectors(prev => prev.map(s =>
        s.name === 'A3' ? { ...s, status: 'ok' } : s
      ));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Warehouse className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold">Painel Logístico</h1>
                <p className="text-blue-100 text-sm">Depósito Central</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Clock size={20} />
                <span className="font-mono font-semibold">{formatTime(currentTime)}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-100">Supervisor</p>
                <p className="font-semibold">Carlos Silva</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header com botão de alerta */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Visão Geral de Operações</h2>
          <button
            onClick={() => setShowRuptureModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transform transition hover:scale-105"
          >
            <AlertCircle size={20} />
            Resolver Ruptura
          </button>
        </div>

        {/* Cards de Resumo */}
        {/* (restante do seu layout aqui, sem mudanças) */}
      </main>

      {/* Modais (Ruptura e Sucesso) */}
      {/* ... seu código dos modais permanece o mesmo ... */}
    </div>
  );
}
