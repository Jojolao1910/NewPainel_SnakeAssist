<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-semibold">Ordem #{{ order.id }}</h3>
        <p class="text-gray-600">{{ formatDate(order.createdAt) }}</p>
      </div>
      <OrderStatusBadge :status="order.status" />
    </div>

    <div class="space-y-4">
      <div class="border-t pt-4">
        <h4 class="font-medium mb-2">Items</h4>
        <ul class="space-y-2">
          <li v-for="item in order.items" :key="item.id" class="flex justify-between">
            <span>{{ item.name }} x{{ item.quantity }}</span>
            <span class="font-medium">{{ formatPrice(item.price * item.quantity) }}</span>
          </li>
        </ul>
      </div>

      <div class="border-t pt-4">
        <div class="flex justify-between font-semibold">
          <span>Total</span>
          <span>{{ formatPrice(orderTotal) }}</span>
        </div>
      </div>

      <OrderTimeline :status="order.status" :updates="order.statusUpdates" />

      <div class="border-t pt-4">
        <h4 class="font-medium mb-2">Atualizar Status</h4>
        <div class="flex space-x-2">
          <button
            v-for="status in availableStatusUpdates"
            :key="status"
            @click="updateStatus(status)"
            class="px-3 py-1 rounded-full text-sm"
            :class="getStatusButtonClass(status)"
          >
            {{ status }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatPrice } from '../../utils/format';
import { formatDate } from '../../utils/date';
import OrderStatusBadge from './OrderStatusBadge.vue';
import OrderTimeline from './OrderTimeline.vue';

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['status-change']);

const orderTotal = computed(() => {
  return props.order.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
});

const availableStatusUpdates = computed(() => {
  const currentStatus = props.order.status;
  const allStatuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
  const currentIndex = allStatuses.indexOf(currentStatus);
  
  if (currentStatus === 'Cancelled' || currentStatus === 'Delivered') {
    return [];
  }
  
  return allStatuses.filter((status, index) => {
    return index > currentIndex || status === 'Cancelled';
  });
});

function updateStatus(newStatus) {
  emit('status-change', props.order.id, newStatus);
}

function getStatusButtonClass(status) {
  const classes = {
    'Pending': 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    'Preparing': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'Ready': 'bg-green-100 text-green-800 hover:bg-green-200',
    'Delivered': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    'Cancelled': 'bg-red-100 text-red-800 hover:bg-red-200'
  };
  return classes[status];
}
</script>