<template>
  <div class="space-y-6">
    <header class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Analytics Dashboard</h1>
      <div class="flex space-x-4">
        <DateRangePicker v-model="dateRange" />
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        v-for="metric in metrics"
        :key="metric.id"
        :title="metric.title"
        :value="metric.value"
        :change="metric.change"
        :icon="metric.icon"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SalesChart :data="salesData" />
      <ServiceMetricsChart :data="serviceData" />
    </div>

    <TopProductsTable :products="topProducts" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAnalyticsStore } from '../store/analytics';
import DateRangePicker from '../components/analytics/DateRangePicker.vue';
import MetricCard from '../components/analytics/MetricCard.vue';
import SalesChart from '../components/analytics/SalesChart.vue';
import ServiceMetricsChart from '../components/analytics/ServiceMetricsChart.vue';
import TopProductsTable from '../components/analytics/TopProductsTable.vue';

const analyticsStore = useAnalyticsStore();
const dateRange = ref({ start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), end: new Date() });
const metrics = ref([]);
const salesData = ref([]);
const serviceData = ref([]);
const topProducts = ref([]);

onMounted(async () => {
  await fetchAnalyticsData();
});

async function fetchAnalyticsData() {
  const data = await analyticsStore.fetchAnalytics(dateRange.value);
  metrics.value = data.metrics;
  salesData.value = data.salesData;
  serviceData.value = data.serviceData;
  topProducts.value = data.topProducts;
}
</script>