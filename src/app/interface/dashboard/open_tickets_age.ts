export interface OpenTicketAge {
  messages: string[];
  code: string[];
  success: boolean;
  data: Data;
}

export interface Data {
  categories: string[];
  series: Series[];
}

export interface Series {
  name: string;
  data: number[];
}
