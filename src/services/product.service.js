import { mockProducts } from "./mockData";
import { v4 as uuidv4 } from "uuid";

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
  async getProducts() {
    await delay(500);
    return [...mockProducts];
  },

  async createProduct(productData) {
    await delay(500);
    const newProduct = {
      id: uuidv4(),
      ...productData,
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  async updateProduct(id, productData) {
    await delay(500);
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    const updatedProduct = { ...mockProducts[index], ...productData };
    mockProducts[index] = updatedProduct;
    return updatedProduct;
  },

  async deleteProduct(id) {
    await delay(500);
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    mockProducts.splice(index, 1);
    return true;
  },
};
