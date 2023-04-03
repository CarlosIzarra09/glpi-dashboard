export interface UserOnline {
  messages: string[];
  code: string[];
  success: boolean;
  data: Datum[];
}

export interface Datum {
  id: number;
  itemsID: number;
  type: string;
  date: Date;
  service: string;
  level: number;
  message: string;
}
