<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <p class="mt-2 text-3xl font-bold text-gray-900">{{ value }}</p>
      </div>
      <div :class="`p-3 rounded-full ${iconBackground}`">
        <component :is="icon" class="w-6 h-6 text-white" />
      </div>
    </div>
    <div class="mt-4">
      <div class="flex items-center">
        <span :class="`${changeColor} text-sm font-semibold`">
          {{ change >= 0 ? '+' : '' }}{{ change }}%
        </span>
        <span class="text-sm text-gray-500 ml-2">vs último período</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  change: {
    type: Number,
    required: true
  },
  icon: {
    type: Object,
    required: true
  }
});

const changeColor = computed(() => {
  return props.change >= 0 ? 'text-green-600' : 'text-red-600';
});

const iconBackground = computed(() => {
  return props.change >= 0 ? 'bg-green-500' : 'bg-red-500';
});
</script>