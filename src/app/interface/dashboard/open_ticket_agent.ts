export interface OpenTicketByAgent {
  messages: string[];
  code: string[];
  success: boolean;
  data: Datum[];
}

export interface Datum {
  id: number;
  name: string;
  sname: string;
  tickets: number;
}
