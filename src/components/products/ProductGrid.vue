<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </template>
  
  <script setup>
  import ProductCard from './ProductCard.vue';
  
  defineProps({
    products: {
      type: Array,
      required: true
    }
  });
  
  defineEmits(['edit', 'delete']);
  </script>