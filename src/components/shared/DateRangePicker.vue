<template>
  <div class="relative">
    <div class="flex items-center space-x-2">
      <input
        type="date"
        v-model="localStart"
        class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-blue-400 dark:hover:bg-gray-700"
      />
      <span class="text-gray-500 dark:text-white-300">Para</span>
      <input
        type="date"
        v-model="localEnd"
        class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-blue-400"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const localStart = ref(props.modelValue.start.toISOString().split('T')[0]);
const localEnd = ref(props.modelValue.end.toISOString().split('T')[0]);

watch([localStart, localEnd], ([newStart, newEnd]) => {
  emit('update:modelValue', {
    start: new Date(newStart),
    end: new Date(newEnd)
  });
});
</script>