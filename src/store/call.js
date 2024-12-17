import { defineStore } from "pinia";
import axios from "axios";

export const useCallStore = defineStore("call", {
  state: () => ({
    calls: [],
    totalCalls: 0,
  }),

  actions: {
    async fetchCalls({ dateRange, page, perPage }) {
      try {
        const response = await axios.get("/api/calls", {
          params: {
            startDate: dateRange.start.toISOString(),
            endDate: dateRange.end.toISOString(),
            page,
            perPage,
          },
        });
        this.calls = response.data.calls;
        this.totalCalls = response.data.total;
        return response.data;
      } catch (error) {
        console.error("Failed to fetch calls:", error);
        return { calls: [], total: 0 };
      }
    },

    filterCalls({ search, dateRange, page, perPage }) {
      let filtered = this.calls;

      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter(
          (call) =>
            call.customerName.toLowerCase().includes(query) ||
            call.phoneNumber.includes(query)
        );
      }

      return filtered;
    },
  },
});
