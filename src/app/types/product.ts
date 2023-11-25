
export interface productList {
  name: string
  price: string,
  category: string,
  description: string,
  image: string,
  id?: any,
  productId?: undefined | number,
  quantity?: undefined | number,
}
export interface cart {
  name: string
  price: string,
  category: string,
  description: string,
  image: string,
  id?: any,
  quantity?: undefined | number,
  userId: number,
  productId: number,
}

export interface priceSummary {
  price: number,
  discount: number,
  tax: number,
  delivery: number,
  total: number
}

export interface orderdetail {
  email: string,
  address: string,
  contact: string,
  totalPrice?: number,
  userId?: string,
  id?: number | undefined
}