export interface GetIndicator {
  txt: Txd;
  txd: Txd;
  txdy: Txd;
  txm: Txm;
  tl: Txd;
}

export interface Txd {
  total: number;
}

export interface Txm {
  total: number;
  name: string;
}
