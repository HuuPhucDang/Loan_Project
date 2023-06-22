export interface INotifications {
  message: string;
  type: 'info' | 'error' | 'warning' | 'success';
  detail?: string
}
