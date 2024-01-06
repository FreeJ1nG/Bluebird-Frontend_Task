export interface Vehicle {
  id: number;
  name: string;
  imageURL: string;
}

export interface VehicleDetail {
  vehicle: string;
  imageURL: string;
  price: string;
  description: string[];
}

export interface VehicleType {
  id: number;
  category_id: number;
  car_type: VehicleDetail[];
}
