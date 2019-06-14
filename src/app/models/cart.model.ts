export interface CartModel {
  userId: string;
  date: number;
  status: number;
  products: [{
    name: string,
    quantity: number,
    price: number,
    imagePath: string
  }];
  _id: string;
}
