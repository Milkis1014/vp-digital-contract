export interface Amenity {
  id: number;
  name: string;
  checked: boolean;
  resorts: string[];
  price: string;
}

export interface Service {
  id: string;
  name: string;
  price: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  inclusions: string[];
}
