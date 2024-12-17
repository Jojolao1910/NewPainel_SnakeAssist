<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-700">
        {{ selectedCategory ? `${selectedCategory.name} Items` : 'Todos os Items' }}
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="item in items"
          :key="item.id"
          class="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 class="font-medium">{{ item.name }}</h3>
                  <p class="text-sm text-gray-600">{{ item.description }}</p>
                  <p class="text-lg font-bold mt-1">{{ formatPrice(item.price) }}</p>
                </div>
              </div>
            </div>
            
            <div class="flex items-start space-x-2">
              <button
                @click="$emit('edit', item)"
                class="text-gray-500 hover:text-blue-600"
              >
                <PencilIcon class="w-5 h-5" />
              </button>
              <button
                @click="$emit('delete', item.id)"
                class="text-gray-500 hover:text-red-600"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { formatPrice } from '../../utils/format';

defineProps({
  items: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: Object,
    default: null
  }
});

defineEmits(['edit', 'delete']);
</script>