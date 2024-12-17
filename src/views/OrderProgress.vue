<template>
  <div class="space-y-6">
    <header class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Progresso do Pedido</h1>
      <div class="flex space-x-4">
        <select
          v-model="statusFilter"
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          aria-label="Filtrar por status"
        >
          <option value="">Todos os status</option>
          <option v-for="status in orderStatuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
    </header>

    <div class="grid gap-6">
      <template v-if="filteredOrders.length">
        <OrderCard
          v-for="order in filteredOrders"
          :key="order.id"
          :order="order"
          @status-change="updateOrderStatus"
        />
      </template>
      <p v-else class="text-gray-500 text-center">
        Nenhum pedido encontrado para o status selecionado.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useOrderStore } from '../store/order';
import OrderCard from '../components/orders/OrderCard.vue';

const orderStore = useOrderStore();
const statusFilter = ref('');

const orderStatuses = [
  'Pendente',
  'Preparando',
  'Pronto',
  'Entregue',
  'Cancelado',
];

const filteredOrders = computed(() => {
  const orders = statusFilter.value
    ? orderStore.orders.filter(order => order.status === statusFilter.value)
    : orderStore.orders;
  return orders;
});

function updateOrderStatus(orderId, newStatus) {
  try {
    orderStore.updateOrderStatus(orderId, newStatus);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
  }
}
</script>
