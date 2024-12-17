<template>
  <span
    class="px-2 py-1 text-xs font-medium rounded-full"
    :class="statusClass"
  >
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
    'Completed': 'bg-green-100 text-green-800',
    'Missed': 'bg-red-100 text-red-800',
    'Ongoing': 'bg-blue-100 text-blue-800',
    'Transferred': 'bg-yellow-100 text-yellow-800'
  };
  return classes[props.status] || 'bg-gray-100 text-gray-800';
});
</script>