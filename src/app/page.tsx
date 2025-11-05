'use client'

import React, { useState, useEffect } from 'react';
import {
  Clock, Warehouse, AlertCircle, CheckCircle, Package,
  Users, TrendingUp, RefreshCw, X, ChevronRight
} from 'lucide-react';

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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getSectorColor = (status: Sector['status']): string => {
    switch (status) {
      case 'ok': return '#22c55e';
      case 'alerta': return '#eab308';
      case 'ruptura': return '#ef4444';
      default: return '#9ca3af';
    }
  };

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
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarContent}>
          <div style={styles.navbarLeft}>
            <div style={styles.iconBox}>
              <Warehouse color="white" size={28} />
            </div>
            <div>
              <h1 style={styles.navTitle}>Painel Logístico</h1>
              <p style={styles.navSubtitle}>Depósito Central</p>
            </div>
          </div>

          <div style={styles.navbarRight}>
            <div style={styles.clockBox}>
              <Clock size={20} color="white" />
              <span style={styles.clockText}>{formatTime(currentTime)}</span>
            </div>
            <div style={styles.supervisorBox}>
              <p style={styles.supervisorLabel}>Supervisor</p>
              <p style={styles.supervisorName}>Carlos Silva</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.mainTitle}>Visão Geral de Operações</h2>
          <button
            onClick={() => setShowRuptureModal(true)}
            style={styles.alertButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
          >
            <AlertCircle size={20} />
            Resolver Ruptura
          </button>
        </div>

        {/* Cards de Resumo */}
        <div style={styles.cardsGrid}>
          <div style={{...styles.card, borderLeft: '4px solid #3b82f6'}}>
            <div style={styles.cardContent}>
              <div>
                <p style={styles.cardLabel}>Pedidos Pendentes</p>
                <p style={styles.cardValue}>18</p>
              </div>
              <div style={{...styles.cardIcon, backgroundColor: '#dbeafe'}}>
                <Package color="#3b82f6" size={28} />
              </div>
            </div>
            <div style={styles.cardFooter}>
              <TrendingUp size={16} color="#22c55e" />
              <span style={{color: '#22c55e'}}>-12% vs ontem</span>
            </div>
          </div>

          <div style={{...styles.card, borderLeft: '4px solid #ef4444'}}>
            <div style={styles.cardContent}>
              <div>
                <p style={styles.cardLabel}>Rupturas Hoje</p>
                <p style={styles.cardValue}>2</p>
              </div>
              <div style={{...styles.cardIcon, backgroundColor: '#fee2e2'}}>
                <AlertCircle color="#ef4444" size={28} />
              </div>
            </div>
            <div style={styles.cardFooter}>
              <TrendingUp size={16} color="#ef4444" />
              <span style={{color: '#ef4444'}}>+1 desde às 8h</span>
            </div>
          </div>

          <div style={{...styles.card, borderLeft: '4px solid #22c55e'}}>
            <div style={styles.cardContent}>
              <div>
                <p style={styles.cardLabel}>Tempo Médio</p>
                <p style={styles.cardValue}>24 min</p>
              </div>
              <div style={{...styles.cardIcon, backgroundColor: '#dcfce7'}}>
                <Clock color="#22c55e" size={28} />
              </div>
            </div>
            <div style={styles.cardFooter}>
              <TrendingUp size={16} color="#22c55e" />
              <span style={{color: '#22c55e'}}>-3 min vs média</span>
            </div>
          </div>
        </div>

        {/* Grid Principal */}
        <div style={styles.mainGrid}>
          {/* Mapa de Setores */}
          <div style={styles.mapSection}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                <Warehouse size={24} color="#3b82f6" />
                Mapa do Depósito
              </h3>
              <button style={styles.refreshButton}>
                <RefreshCw size={16} />
                Atualizar
              </button>
            </div>

            <div style={styles.sectorsGrid}>
              {sectors.map((sector) => (
                <div
                  key={sector.name}
                  style={{
                    ...styles.sectorCard,
                    backgroundColor: getSectorColor(sector.status)
                  }}
                >
                  <div style={styles.sectorHeader}>
                    <h4 style={styles.sectorName}>{sector.name}</h4>
                    {sector.status === 'ok' && <CheckCircle size={20} color="white" />}
                    {sector.status === 'alerta' && <AlertCircle size={20} color="white" />}
                    {sector.status === 'ruptura' && <X size={20} color="white" />}
                  </div>
                  <p style={styles.sectorItems}>{sector.items} itens</p>
                  <p style={styles.sectorStatus}>{sector.status}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Feed de Atividades */}
          <div style={styles.activitiesSection}>
            <h3 style={styles.sectionTitle}>
              <Users size={24} color="#3b82f6" />
              Atividades Recentes
            </h3>

            <div style={styles.activitiesList}>
              {activities.map((activity) => (
                <div key={activity.id} style={styles.activityItem}>
                  <div style={styles.activityIconWrapper}>
                    <div style={{
                      ...styles.activityIcon,
                      backgroundColor: 
                        activity.type === 'complete' ? '#dcfce7' :
                        activity.type === 'reassign' ? '#dbeafe' :
                        activity.type === 'substitute' ? '#fef3c7' :
                        '#f3f4f6'
                    }}>
                      {activity.type === 'complete' && <CheckCircle size={18} color="#22c55e" />}
                      {activity.type === 'reassign' && <RefreshCw size={18} color="#3b82f6" />}
                      {activity.type === 'substitute' && <Package size={18} color="#eab308" />}
                      {activity.type === 'start' && <Clock size={18} color="#6b7280" />}
                    </div>
                  </div>
                  <div style={styles.activityContent}>
                    <p style={styles.activityText}>{activity.text}</p>
                    <p style={styles.activityTime}>{activity.time}</p>
                  </div>
                  <ChevronRight size={16} color="#9ca3af" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Ruptura */}
      {showRuptureModal && (
        <div style={styles.modalOverlay} onClick={() => setShowRuptureModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>🚨 Resolver Ruptura</h3>
              <button
                onClick={() => setShowRuptureModal(false)}
                style={styles.closeButton}
              >
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalContent}>
              {/* Detalhes do Pedido */}
              <div style={styles.orderDetails}>
                <div style={styles.orderGrid}>
                  <div>
                    <p style={styles.orderLabel}>Pedido</p>
                    <p style={styles.orderValue}>#1054</p>
                  </div>
                  <div>
                    <p style={styles.orderLabel}>Setor</p>
                    <p style={styles.orderValue}>A3</p>
                  </div>
                  <div style={{gridColumn: '1 / -1'}}>
                    <p style={styles.orderLabel}>Funcionário</p>
                    <p style={styles.orderValue}>Carlos Almeida</p>
                  </div>
                </div>
              </div>

              {/* Itens Faltantes */}
              <div>
                <h4 style={styles.itemsTitle}>Itens Faltantes:</h4>
                <div style={styles.itemsList}>
                  <div style={styles.itemRow}>
                    <span style={styles.itemName}>Detergente 1L</span>
                    <span style={styles.itemBadge}>3 un.</span>
                  </div>
                  <div style={styles.itemRow}>
                    <span style={styles.itemName}>Sabão em pó 500g</span>
                    <span style={styles.itemBadge}>2 un.</span>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div style={styles.actionsContainer}>
                <button
                  onClick={handleReassign}
                  style={{...styles.actionButton, backgroundColor: '#3b82f6'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                  <RefreshCw size={20} />
                  Reatribuir Pedido
                </button>

                <button
                  onClick={handleSubstitute}
                  style={{...styles.actionButton, backgroundColor: '#eab308'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ca8a04'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eab308'}
                >
                  <Package size={20} />
                  Substituir Itens
                </button>

                <button
                  onClick={handleResolve}
                  style={{...styles.actionButton, backgroundColor: '#22c55e'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
                >
                  <CheckCircle size={20} />
                  Marcar como Resolvido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div style={styles.modalOverlay} onClick={() => setShowSuccessModal(false)}>
          <div style={styles.successModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.successIcon}>
              <CheckCircle size={40} color="#22c55e" />
            </div>
            <h3 style={styles.successTitle}>Ação Concluída!</h3>
            <p style={styles.successText}>A ruptura foi tratada com sucesso.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              style={styles.successButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
  },
  navbar: {
    background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  navbarContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  iconBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  navSubtitle: {
    color: '#bfdbfe',
    fontSize: '0.875rem',
    margin: 0,
  },
  navbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    color: 'white',
  },
  clockBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    backdropFilter: 'blur(8px)',
  },
  clockText: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  supervisorBox: {
    textAlign: 'right',
  },
  supervisorLabel: {
    fontSize: '0.875rem',
    color: '#bfdbfe',
    margin: 0,
  },
  supervisorName: {
    fontWeight: 'bold',
    margin: 0,
  },
  main: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  mainTitle: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  alertButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.3s',
    fontSize: '1rem',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    transition: 'box-shadow 0.3s',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  cardLabel: {
    color: '#6b7280',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.25rem',
  },
  cardValue: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  cardIcon: {
    padding: '1rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1.5rem',
  },
  mapSection: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: 0,
  },
  refreshButton: {
    color: '#3b82f6',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  sectorsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  sectorCard: {
    borderRadius: '0.5rem',
    padding: '1.5rem',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
  sectorHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  sectorName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  sectorItems: {
    fontSize: '0.875rem',
    opacity: 0.9,
    margin: 0,
  },
  sectorStatus: {
    fontSize: '0.75rem',
    opacity: 0.75,
    marginTop: '0.25rem',
    textTransform: 'capitalize',
  },
  activitiesSection: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '1.5rem',
  },
  activitiesList: {
    marginTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  activityItem: {
    display: 'flex',
    gap: '0.75rem',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  },
  activityIconWrapper: {
    flexShrink: 0,
  },
  activityIcon: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
    minWidth: 0,
  },
  activityText: {
    fontSize: '0.875rem',
    color: '#1f2937',
    lineHeight: '1.5',
    margin: 0,
  },
  activityTime: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.25rem',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    padding: '1rem',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
    maxWidth: '32rem',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  closeButton: {
    color: '#9ca3af',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s',
    padding: 0,
    display: 'flex',
  },
  modalContent: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  orderDetails: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '0.5rem',
    padding: '1rem',
  },
  orderGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  orderLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.25rem',
  },
  orderValue: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  itemsTitle: {
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.75rem',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    padding: '0.75rem',
    borderRadius: '0.5rem',
  },
  itemName: {
    color: '#1f2937',
  },
  itemBadge: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e5e7eb',
  },
  actionButton: {
    width: '100%',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s',
    fontSize: '1rem',
  },
  successModal: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
    maxWidth: '28rem',
    width: '100%',
    padding: '2rem',
    textAlign: 'center',
  },
  successIcon: {
    backgroundColor: '#dcfce7',
    width: '5rem',
    height: '5rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
  },
  successTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  successText: {
    color: '#6b7280',
    marginBottom: '1.5rem',
  },
  successButton: {
    backgroundColor: '#22c55e',
    color: 'white',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '1rem',
  },
};