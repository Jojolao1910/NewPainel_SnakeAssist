<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="p-6">
      <h3 class="text-lg font-semibold mb-4">Principais produtos</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendas
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receita
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Crescimento
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in products" :key="product.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="h-10 w-10 rounded-full"
                  />
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ product.sales }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatPrice(product.revenue) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div :class="`text-sm ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`">
                  {{ product.growth >= 0 ? '+' : '' }}{{ product.growth }}%
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '../../utils/format';

defineProps({
  products: {
    type: Array,
    required: true
  }
});
</script>