export interface ResponseApi<Data> {
  success: boolean;
  messages: string[];
  code: string[];
  data: Data;
}
export interface ResponsesApi<Data> {
  success: boolean;
  messages: string[];
  code: string[];
  data: Data[];
}

export interface ResponseApiSecurity {
  success: boolean;
  token: string;
  code: string[];
}
