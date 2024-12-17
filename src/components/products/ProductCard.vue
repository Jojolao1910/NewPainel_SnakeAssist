<template>
  <div class="bg-white rounded-lg shadow-md p-4 transition-shadow hover:shadow-lg">
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-48 object-cover rounded-lg mb-4"
    />
    <div class="space-y-2">
      <h3 class="text-lg font-semibold dark:text-gray-800">{{ product.name }}</h3>
      <p class="text-gray-600">{{ product.description }}</p>
      <p class="text-lg font-bold dark:text-gray-800">{{ formatPrice(product.price) }}</p>
      
      <div class="flex space-x-2">
        <button
          @click="$emit('edit', product)"
          class="flex-1 bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
        >
          Editar
        </button>
        <button
          @click="$emit('delete', product.id)"
          class="flex-1 bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition-colors"
        >
          Deletar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '../../utils/format';

defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'delete']);
</script>