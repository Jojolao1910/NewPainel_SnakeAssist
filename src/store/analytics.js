import { defineStore } from "pinia";
import axios from "axios";

export const useAnalyticsStore = defineStore("analytics", {
  state: () => ({
    metrics: [],
    salesData: [],
    serviceData: [],
    topProducts: [],
  }),

  actions: {
    async fetchAnalytics(dateRange) {
      try {
        const response = await axios.get("/api/analytics", {
          params: {
            startDate: dateRange.start.toISOString(),
            endDate: dateRange.end.toISOString(),
          },
        });
        return response.data;
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
        return {
          metrics: [],
          salesData: [],
          serviceData: [],
          topProducts: [],
        };
      }
    },
  },
});
