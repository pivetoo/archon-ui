import { useState, useEffect, useCallback } from 'react';
import { httpClient } from '../services/http/client';
import type { NotificationItem } from '../components/ui/navbar';

interface Notificacao {
  id: number;
  usuarioId: number;
  titulo: string;
  mensagem: string;
  tipo: number;
  lida: boolean;
  lidaEm: string | null;
  criadoEm: string;
}

const mapTipoToType = (tipo: number): 'info' | 'success' | 'warning' | 'error' => {
  switch (tipo) {
    case 1: return 'success';
    case 2: return 'warning';
    case 3: return 'error';
    default: return 'info';
  }
};

const mapToNotificationItem = (notificacao: Notificacao): NotificationItem => ({
  id: notificacao.id.toString(),
  title: notificacao.titulo,
  message: notificacao.mensagem || '',
  timestamp: new Date(notificacao.criadoEm),
  read: notificacao.lida,
  type: mapTipoToType(notificacao.tipo)
});

interface UseNotificationsOptions {
  pollingInterval?: number;
  enabled?: boolean;
}

interface UseNotificationsReturn {
  notifications: NotificationItem[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearAll: () => Promise<void>;
}

export function useNotifications(options: UseNotificationsOptions = {}): UseNotificationsReturn {
  const { pollingInterval = 30000, enabled = true } = options;

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);
      const response = await httpClient.get<Notificacao[]>('/Notificacao/GetMinhas');
      const mapped = response.data.map(mapToNotificationItem);
      setNotifications(mapped);
    } catch {
      setError('Erro ao carregar notificações');
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await httpClient.put(`/Notificacao/${id}/marcar-lida`);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch {
      // silently fail
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await httpClient.put('/Notificacao/marcar-todas-lidas');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch {
      // silently fail
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      await httpClient.delete('/Notificacao/limpar-todas');
      setNotifications([]);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (!enabled || pollingInterval <= 0) return;

    const interval = setInterval(fetchNotifications, pollingInterval);
    return () => clearInterval(interval);
  }, [enabled, pollingInterval, fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refresh: fetchNotifications,
    markAsRead,
    markAllAsRead,
    clearAll
  };
}
