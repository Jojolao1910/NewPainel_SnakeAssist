<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <SunIcon v-if="isDark" class="w-5 h-5 text-yellow-500" />
    <MoonIcon v-else class="w-5 h-5 text-gray-600" />
  </button>
</template>

<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import { useTheme } from '../../composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>