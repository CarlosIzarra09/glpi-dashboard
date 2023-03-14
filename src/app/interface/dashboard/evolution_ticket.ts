export interface EvolutionTicket {
  messages: string[];
  code: string[];
  success: boolean;
  data: Datum[];
}

export interface Datum {
  name: string;
  data: number[];
}
