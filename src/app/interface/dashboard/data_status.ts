export interface DataStatus {
  messages: string[];
  code: string[];
  success: boolean;
  data: Array<Array<boolean | number | string>>;
}
