<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
      {{ title }}
    </h3>
    <p v-if="!data || !data.length" class="text-center text-gray-500 dark:text-gray-400">
      Nenhum dado disponível para exibição.
    </p>
    <div v-else class="relative h-96">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Props para entrada de dados
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Métricas de Serviço'
  }
});

// Computed para preparar os dados do gráfico
const chartData = computed(() => ({
  labels: props.data.map(item => item.label || 'Sem Nome'),
  datasets: [
    {
      label: 'Desempenho',
      data: props.data.map(item => item.value || 0),
      backgroundColor: [
        'rgba(59, 130, 246, 0.5)',
        'rgba(16, 185, 129, 0.5)',
        'rgba(245, 158, 11, 0.5)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)'
      ],
      borderWidth: 1
    }
  ]
}));

// Opções do gráfico
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: 'inherit'
      }
    },
    tooltip: {
      callbacks: {
        label: context => `${context.raw} unidades`
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'inherit'
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: 'inherit',
        callback: value => `${value}u`
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  }
}));
</script>
