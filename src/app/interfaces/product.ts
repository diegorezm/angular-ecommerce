export type Catergory = 'shoes' | 'pants' | 'shirt' | 'hat'

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  category: Catergory;
}
