export interface CartModel {
  userId: string;
  date: number;
  status: number;
  products: [{
    _id: string,
    name: string,
    quantity: number,
    price: number,
    image: string
  }];
  _id: string;
}
