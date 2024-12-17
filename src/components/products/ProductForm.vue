<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4 dark:text-gray-800">{{ product ? 'Edit' : 'Add' }} Produto</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nome</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="mt-1 block w-full dark:text-gray-800 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            v-model="formData.description"
            required
            class="mt-1 block w-full dark:text-gray-800 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Preço</label>
          <input
            v-model.number="formData.price"
            type="number"
            step="0.01"
            required
            class="mt-1 block w-full dark:text-gray-800 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            v-model="formData.image"
            type="url"
            required
            class="mt-1 block w-full dark:text-gray-800 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Estoque</label>
          <input
            v-model.number="formData.stock"
            type="number"
            required
            class="mt-1 block w-full dark:text-gray-800 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        
        <div class="flex space-x-2">
          <button
            type="submit"
            class="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['submit', 'close']);

const formData = ref({
  name: props.product?.name || '',
  description: props.product?.description || '',
  price: props.product?.price || 0,
  image: props.product?.image || '',
  stock: props.product?.stock || 0
});

function handleSubmit() {
  emit('submit', { ...formData.value });
}
</script>