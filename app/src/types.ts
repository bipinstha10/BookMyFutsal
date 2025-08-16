export type Futsal = {
  id: number,
  name: string;
  location: string;
  imageURL: string;
};

export interface FutsalListResponse {
  data: Futsal[],
  status: number,
  message: string
}

export interface FutsalResponse {
  data: Futsal,
  status: number,
  message: string
}

export type FutsalUpdateInput = Partial<Futsal>

