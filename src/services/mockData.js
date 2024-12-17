import { v4 as uuidv4 } from "uuid";

export const mockProducts = [
  {
    id: uuidv4(),
    name: "Product 1",
    description: "Description for product 1",
    price: 99.99,
    image: "https://picsum.photos/400/300",
    category: "Category 1",
    stock: 10,
  },
  {
    id: uuidv4(),
    name: "Product 2",
    description: "Description for product 2",
    price: 149.99,
    image: "https://picsum.photos/400/301",
    category: "Category 2",
    stock: 15,
  },
  {
    id: uuidv4(),
    name: "Product 3",
    description: "Description for product 3",
    price: 199.99,
    image: "https://picsum.photos/400/302",
    category: "Category 1",
    stock: 5,
  },
];
