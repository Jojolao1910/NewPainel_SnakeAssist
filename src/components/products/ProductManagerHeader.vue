<template>
    <header class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Gerenciador Produto</h1>
      <button
        @click="$emit('add-product')"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Produto
      </button>
    </header>
  </template>
  
  <script setup>
  defineEmits(['add-product']);
  </script>