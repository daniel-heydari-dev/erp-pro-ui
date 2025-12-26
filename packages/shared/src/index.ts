export type User = {
  id: string;
  name: string;
  email: string;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US').format(date);
};

export const API_VERSION = 'v1';
