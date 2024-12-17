<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4 mb-4 text-gray-800 dark:text-gray-700">Categorias</h2>
    <div class="space-y-2">
      <div
        v-for="category in categories"
        :key="category.id"
        class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
        :class="{ 'bg-blue-50': isSelected(category) }"
        @click="$emit('select', category)"
      >
        <div class="flex items-center space-x-3">
          <component
            :is="category.icon || DocumentTextIcon"
            class="w-5 h-5 text-gray-500"
          />
          <span class="font-medium">{{ category.name }}</span>
        </div>
        
        <div class="flex items-center space-x-2">
          <button
            @click.stop="$emit('edit', category)"
            class="text-gray-500 hover:text-blue-600"
          >
            <PencilIcon class="w-4 h-4" />
          </button>
          <button
            @click.stop="$emit('delete', category.id)"
            class="text-gray-500 hover:text-red-600"
          >
            <TrashIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  DocumentTextIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: Object,
    default: null
  }
});

defineEmits(['select', 'edit', 'delete']);

const isSelected = (category) => {
  return props.selectedCategory?.id === category.id;
};
</script>