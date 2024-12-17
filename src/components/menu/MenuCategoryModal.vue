<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg w-full max-w-md">
      <div class="p-6">
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-xl font-bold text-gray-700">
            {{ category ? 'Edit Category' : 'Add Categoria' }}
          </h2>
          <button
            @click="$emit('close')"
            class="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

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
              rows="3"
              class="mt-1 block w-full dark:text-gray-800 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            ></textarea>
          </div>

          <div class="flex space-x-2">
            <button
              type="submit"
              class="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Salvar
            </button>
            <button
              type="button"
              @click="$emit('close')"
              class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  category: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'save']);

const formData = ref({
  name: props.category?.name || '',
  description: props.category?.description || ''
});

function handleSubmit() {
  emit('save', { ...formData.value });
}
</script>