<template>
  <div class="space-y-4">
    <div class="relative">
      <div class="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
      <ul class="space-y-4">
        <li v-for="update in updates" :key="update.timestamp" class="relative pl-10">
          <div class="absolute left-2 top-2 w-4 h-4 rounded-full bg-blue-500"></div>
          <div class="bg-gray-50 rounded p-3">
            <p class="text-sm font-medium">{{ update.status }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(update.timestamp) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { formatDate } from '../../utils/date';

defineProps({
  updates: {
    type: Array,
    required: true
  }
});
</script>