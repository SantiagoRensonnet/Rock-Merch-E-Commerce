export type Categories = {
  title: string;
  cover: string;
  items: {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    imageYOffset?: string;
  }[];
}[];
