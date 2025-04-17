import axios from 'axios';
import { QueueTicket, QueueStatus } from '../types/queue';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/queues';

export const queueService = {
  async getQueues(): Promise<QueueStatus[]> {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error : any) {
      console.error('Error fetching queues:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des files');
    }
  },

  async getQueueById(queueId: string): Promise<QueueStatus> {
    try {
      const response = await axios.get(`${API_URL}/${queueId}`);
      return response.data;
    } catch (error : any) {
      console.error('Error fetching queue:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération de la file');
    }
  },

  async takeTicket(queueId: string, userId: string, priority?: string): Promise<QueueTicket> {
    try {
      const response = await axios.post(`${API_URL}/${queueId}/tickets`, {
        userId,
        priorityType: priority || 'standard'
      });
      return response.data;
    } catch (error : any) {
      console.error('Error taking ticket:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la prise du ticket');
    }
  },

  async cancelTicket(ticketId: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/tickets/${ticketId}`);
    } catch (error : any) {
      console.error('Error canceling ticket:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'annulation du ticket');
    }
  },

  async getCurrentPosition(ticketId: string): Promise<{ position: number; estimatedTime: number }> {
    try {
      const response = await axios.get(`${API_URL}/tickets/${ticketId}/position`);
      return response.data;
    } catch (error : any) {
      console.error('Error getting position:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération de la position');
    }
  },

  async subscribeToQueueUpdates(queueId: string, callback: (update: QueueStatus) => void): Promise<() => void> {
    // Implémentation réelle nécessiterait WebSockets ou SSE
    const intervalId = setInterval(async () => {
      try {
        const update = await this.getQueueById(queueId);
        callback(update);
      } catch (error) {
        console.error('Update error:', error);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }
};