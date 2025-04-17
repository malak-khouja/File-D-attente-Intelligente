export interface QueueStatus {
    id: string;
    name: string;
    currentPosition: number;
    waitingTime: number;
    activeTickets: number;
    sector: 'health' | 'bank' | 'government' | 'commerce';
  }
  
  export interface QueueTicket {
    id: string;
    queueId: string;
    userId: string;
    position: number;
    estimatedTime: number;
    priority: 'standard' | 'pregnant' | 'elderly' | 'disability';
    createdAt: string;
  }