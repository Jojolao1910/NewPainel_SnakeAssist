<template>
  <div class="space-y-6">
    <header class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Lista de Produto</h1>
      <div class="flex space-x-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Pesquisar produtos..."
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <select
          v-model="categoryFilter"
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        >
          <option value="">Todas as Categorias</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </header>

    <div class="bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-for="header in tableHeaders" 
                :key="header.key"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                @click="sortBy(header.key)"
            >
              {{ header.label }}
              <span v-if="sortKey === header.key" class="ml-1">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in filteredProducts" :key="product.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <img :src="product.image" :alt="product.name" class="h-10 w-10 rounded-full" />
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ product.category }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatPrice(product.price) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ product.stock }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="addToOrder(product)"
                class="text-blue-600 hover:text-blue-900"
              >
                Adicionar ao Pedido
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useProductStore } from '../store/product';
import { useOrderStore } from '../store/order';
import { formatPrice } from '../utils/format';

const productStore = useProductStore();
const orderStore = useOrderStore();

const searchQuery = ref('');
const categoryFilter = ref('');
const sortKey = ref('name');
const sortOrder = ref('asc');

const tableHeaders = [
  { key: 'name', label: 'Produto' },
  { key: 'category', label: 'Categoria' },
  { key: 'price', label: 'Preço' },
  { key: 'stock', label: 'Estoque' },
  { key: 'actions', label: '' }
];

const categories = computed(() => {
  const uniqueCategories = new Set(productStore.products.map(p => p.category));
  return Array.from(uniqueCategories);
});

const filteredProducts = computed(() => {
  let filtered = productStore.products;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(product => 
      product.category === categoryFilter.value
    );
  }

  return filtered.sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];
    
    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });
});

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

function addToOrder(product) {
  orderStore.addToOrder(product);
}
</script>