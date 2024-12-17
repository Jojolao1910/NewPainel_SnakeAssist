<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
      Visão Geral de Vendas
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
      Dados atualizados recentemente
    </p>

    <!-- Filtros -->
    <div class="flex justify-end mb-4">
      <button
        v-for="filter in ['Semanal', 'Mensal', 'Anual']"
        :key="filter"
        @click="handleFilterChange(filter)"
        class="px-4 py-2 mx-1 text-sm rounded-lg border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Gráfico -->
    <div v-if="!filteredData.length" class="text-gray-500 dark:text-gray-400 text-center p-6">
      Nenhum dado disponível.
    </div>
    <div v-else class="relative h-96">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Props
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

// Estado reativo
const selectedFilter = ref('Mensal');

// Filtrar os dados com base no filtro selecionado
const filteredData = computed(() => {
  switch (selectedFilter.value) {
    case 'Semanal':
      return props.data.slice(-7);
    case 'Mensal':
      return props.data.slice(-30);
    case 'Anual':
      return props.data.slice(-365);
    default:
      return props.data;
  }
});

// Dados do gráfico
const chartData = computed(() => ({
  labels: filteredData.value.map(item => item.date),
  datasets: [
    {
      label: 'Vendas',
      data: filteredData.value.map(item => item.value),
      borderColor: isDark.value ? 'rgb(244, 67, 54)' : 'rgb(59, 130, 246)',
      backgroundColor: isDark.value
        ? 'rgba(244, 67, 54, 0.5)'
        : 'rgba(59, 130, 246, 0.5)',
      tension: 0.4
    }
  ]
}));

// Opções do gráfico
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1000,
    easing: 'easeOutBounce'
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `R$ ${context.raw.toLocaleString()}`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return `R$ ${value}`;
        }
      }
    }
  }
};

// Lidar com mudanças de filtro
function handleFilterChange(filter) {
  selectedFilter.value = filter;
}

// Simulação de tema escuro
const isDark = computed(() => document.documentElement.classList.contains('dark'));
</script>
