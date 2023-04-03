export interface TicketByDay {
  messages: string[];
  code: string[];
  success: boolean;
  data: Array<Array<boolean | number | string>>;
}
