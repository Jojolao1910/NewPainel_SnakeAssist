import { defineStore } from "pinia";
import axios from "axios";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    categories: [],
    items: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/menu/categories");
        this.categories = response.data;
        return this.categories;
      } catch (error) {
        this.error = error.message;
        this.categories = [];
        return [];
      } finally {
        this.loading = false;
      }
    },

    async fetchItems() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/menu/items");
        this.items = response.data;
        return this.items;
      } catch (error) {
        this.error = error.message;
        this.items = [];
        return [];
      } finally {
        this.loading = false;
      }
    },

    async addCategory(categoryData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("/api/menu/categories", categoryData);
        const newCategory = response.data;
        this.categories = [...this.categories, newCategory];
        return newCategory;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateCategory(id, categoryData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(
          `/api/menu/categories/${id}`,
          categoryData
        );
        const updatedCategory = response.data;
        this.categories = this.categories.map((c) =>
          c.id === id ? updatedCategory : c
        );
        return updatedCategory;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteCategory(id) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`/api/menu/categories/${id}`);
        this.categories = this.categories.filter((c) => c.id !== id);
        return true;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addItem(itemData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("/api/menu/items", itemData);
        const newItem = response.data;
        this.items = [...this.items, newItem];
        return newItem;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateItem(id, itemData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`/api/menu/items/${id}`, itemData);
        const updatedItem = response.data;
        this.items = this.items.map((i) => (i.id === id ? updatedItem : i));
        return updatedItem;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteItem(id) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`/api/menu/items/${id}`);
        this.items = this.items.filter((i) => i.id !== id);
        return true;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
