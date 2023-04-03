export interface GetLastSevenDay {
  series: Series[];
  categories: Date[];
}

export interface Series {
  name: string;
  data: number[];
}
