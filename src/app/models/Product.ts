export interface Product {
  id: string;
  name: string;
  price: number;
  url: string;
  image: string;
  images: [string];
  description?: string;
  body?: string;
  dimensions?: ProductDimensions;
}

export interface ProductDimensions {
  weight: number;
  height?: number;
  length?: number;
  width?: number;
}
