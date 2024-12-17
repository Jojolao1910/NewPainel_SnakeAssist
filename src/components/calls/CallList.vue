<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="call in calls" :key="call.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">{{ call.customerName }}</div>
            <div class="text-sm text-gray-500">{{ call.phoneNumber }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ formatDate(call.startTime) }}</div>
            <div class="text-sm text-gray-500">{{ formatDuration(call.duration) }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <CallStatusBadge :status="call.status" />
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              @click="$emit('view-details', call)"
              class="text-blue-600 hover:text-blue-900"
            >
              Ver detalhes
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { formatDate } from '../../utils/date';
import CallStatusBadge from './CallStatusBadge.vue';

defineProps({
  calls: {
    type: Array,
    required: true
  }
});

defineEmits(['view-details']);

const headers = [
  { key: 'customer', label: 'Cliente' },
  { key: 'time', label: 'Tempo' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' }
];

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
</script>