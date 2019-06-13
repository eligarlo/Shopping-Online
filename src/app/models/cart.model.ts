export interface CartModel {
  userId: string;
  date: number;
  status: number;
  products: [{
    name: string,
    quantity: number,
    price: number,
    image: string
  }];
}
