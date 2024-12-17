<template>
  <router-link :to="route" class="block" @click="handleClick">
    <div class="card hover:shadow-lg transition-shadow duration-300">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <component
            :is="icon"
            class="w-12 h-12 text-primary-600 dark:text-primary-400"
          />
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
            {{ subtitle }}
          </span>
        </div>
        <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
        <p class="text-gray-600 dark:text-gray-300">{{ description }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  icon: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  }
});

defineEmits(['card-click']);

function handleClick() {
  // Emite um evento personalizado para o componente pai.
  // Esse evento pode ser usado para fechar a navbar.
  emit('card-click');
}
</script>