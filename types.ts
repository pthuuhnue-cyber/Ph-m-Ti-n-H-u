
export enum ViewType {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  ANALYSIS = 'ANALYSIS',
  CHAT = 'CHAT',
  SETTINGS = 'SETTINGS'
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  image?: string;
  status?: 'safe' | 'danger';
  timestamp: Date;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
  lastMessage: string;
}

export interface AnalysisResult {
  isDangerous: boolean;
  reason: string;
  details?: string;
}
