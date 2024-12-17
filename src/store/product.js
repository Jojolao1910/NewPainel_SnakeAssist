import { defineStore } from "pinia";
import { productService } from "../services/product.service";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),

  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const products = await productService.getProducts();
        this.products = products;
        return products;
      } catch (error) {
        this.error = error.message;
        toast.error("Falha ao buscar produtos");
        return [];
      } finally {
        this.loading = false;
      }
    },

    async addProduct(productData) {
      this.loading = true;
      this.error = null;
      try {
        const newProduct = await productService.createProduct(productData);
        this.products.push(newProduct);
        toast.success("Produto adicionado com sucesso");
        return newProduct;
      } catch (error) {
        this.error = error.message;
        toast.error("Falha ao adicionar produto");
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(id, productData) {
      this.loading = true;
      this.error = null;
      try {
        const updatedProduct = await productService.updateProduct(
          id,
          productData
        );
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        toast.success("Produto atualizado com sucesso");
        return updatedProduct;
      } catch (error) {
        this.error = error.message;
        toast.error("Falha ao atualizar produto");
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id) {
      this.loading = true;
      this.error = null;
      try {
        await productService.deleteProduct(id);
        this.products = this.products.filter((p) => p.id !== id);
        toast.success("Produto excluído com sucesso");
        return true;
      } catch (error) {
        this.error = error.message;
        toast.error("Falha ao excluir produto");
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
