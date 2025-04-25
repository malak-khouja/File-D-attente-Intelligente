// frontend/services/queueService.ts
import axios from 'axios';
import { QueueTicket, QueueStatus } from '../types/queue';

const API_URL =  'http://localhost:3000/api/queues'; // Utilisez /api/queues
const TICKET_API_URL = 'http://localhost:3000/ticket'; // Gardez ceci pour les opérations sur les tickets


export const queueService = {
  async getQueues(): Promise<QueueStatus[]> {
    try {
      const response = await axios.get(`${API_URL}/getall`); // Utilisez /api/queues/getall
      return response.data.data; // Accédez aux données dans la réponse
    } catch (error: any) {
      console.error('Error fetching queues:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des files');
    }
  },

  async getQueueById(queueId: string): Promise<QueueStatus> {
    try {
      const response = await axios.get(`${API_URL}/${queueId}`); // Utilisez /api/queues/:queueId
      return response.data.data;  // Accédez aux données
    } catch (error: any) {
      console.error('Error fetching queue:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération de la file');
    }
  },

  async takeTicket(queueId: string, userId: string, priority?: string): Promise<QueueTicket> {
    try {
      const response = await axios.post(`${API_URL}/${queueId}/tickets`, { // POST à la bonne URL
        userId,
        priorityType: priority || 'standard',
      });
      return response.data.data; // Accédez aux données
    } catch (error: any) {
      console.error('Error taking ticket:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la prise du ticket');
    }
  },

  async cancelTicket(ticketId: string): Promise<void> {
    try {
      await axios.delete(`${TICKET_API_URL}/delete/${ticketId}`);
    } catch (error: any) {
      console.error('Error canceling ticket:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'annulation du ticket');
    }
  },

  async getCurrentPosition(ticketId: string): Promise<{ position: number; estimatedTime: number }> {
    try {
      const response = await axios.get(`${API_URL}/tickets/${ticketId}/position`); // Utilisez la bonne URL
      return response.data.data; // Accédez aux données
    } catch (error: any) {
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
  },
};