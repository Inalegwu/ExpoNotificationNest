/* eslint-disable prettier/prettier */
export enum Status {
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
}

export interface Message {
  message: string;
  status: Status;
  error?: string;
}
