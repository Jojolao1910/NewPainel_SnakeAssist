import { defineStore } from "pinia";
import axios from "axios";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
    currentOrder: null,
  }),

  actions: {
    async fetchOrders() {
      try {
        const response = await axios.get("/api/orders");
        this.orders = response.data;
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    },

    async addToOrder(product) {
      if (!this.currentOrder) {
        this.currentOrder = {
          items: [],
          status: "Pending",
          createdAt: new Date(),
          statusUpdates: [
            {
              status: "Pending",
              timestamp: new Date(),
            },
          ],
        };
      }

      const existingItem = this.currentOrder.items.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.currentOrder.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    async createOrder() {
      try {
        const response = await axios.post("/api/orders", this.currentOrder);
        this.orders.push(response.data);
        this.currentOrder = null;
        return response.data;
      } catch (error) {
        console.error("Failed to create order:", error);
        throw error;
      }
    },

    async updateOrderStatus(orderId, newStatus) {
      try {
        const response = await axios.put(`/api/orders/${orderId}/status`, {
          status: newStatus,
          timestamp: new Date(),
        });

        const orderIndex = this.orders.findIndex(
          (order) => order.id === orderId
        );
        if (orderIndex !== -1) {
          this.orders[orderIndex] = response.data;
        }

        return response.data;
      } catch (error) {
        console.error("Failed to update order status:", error);
        throw error;
      }
    },
  },
});
