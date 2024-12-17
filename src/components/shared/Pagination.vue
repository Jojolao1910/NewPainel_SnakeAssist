<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-700">
        Mostrando {{ startIndex }} para {{ endIndex }} de {{ total }} resultados
      </span>
    </div>
    <div class="flex space-x-2">
      <button
        @click="handlePageChange(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded-md bg-white text-gray-800 border-gray-300 hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        Anterior
      </button>
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="handlePageChange(page)"
        :class="[
          'px-3 py-1 border rounded-md',
          currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
        ]"
      >
        {{ page }}
      </button>
      <button
        @click="handlePageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded-md bg-white text-gray-800 border-gray-300 hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['page-change']);

const totalPages = computed(() => Math.ceil(props.total / props.perPage));
const startIndex = computed(() => (props.currentPage - 1) * props.perPage + 1);
const endIndex = computed(() => Math.min(startIndex.value + props.perPage - 1, props.total));

const visiblePages = computed(() => {
  const pages = [];
  let start = Math.max(1, props.currentPage - 2);
  let end = Math.min(totalPages.value, start + 4);
  
  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

function handlePageChange(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-change', page);
  }
}
</script>