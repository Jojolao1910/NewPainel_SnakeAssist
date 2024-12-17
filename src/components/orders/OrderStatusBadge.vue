<template>
  <span class="px-3 py-1 rounded-full text-sm" :class="statusClass">
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true
  }
});

const statusClass = computed(() => {
  const classes = {
    'Pending': 'bg-gray-100 text-gray-800',
    'Preparing': 'bg-blue-100 text-blue-800',
    'Ready': 'bg-green-100 text-green-800',
    'Delivered': 'bg-purple-100 text-purple-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };
  return classes[props.status];
});
</script>