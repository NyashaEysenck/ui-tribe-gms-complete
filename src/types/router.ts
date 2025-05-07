
export interface LocationState {
  message?: string;
  messageType?: 'success' | 'error' | 'info' | 'warning';
  redirectedFrom?: string;
  [key: string]: any;
}
