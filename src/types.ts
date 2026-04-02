export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  material: string;
  size: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id?: string;
  userId?: string;
  customerName: string;
  phone: string;
  address: string;
  pincode: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'COD' | 'Online';
  paymentId?: string;
  status: string;
  createdAt: string;
}
