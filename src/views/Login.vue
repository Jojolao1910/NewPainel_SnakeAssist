<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="card max-w-md w-full p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Bem-vindo</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Faça login para acessar o painel administrativo
        </p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            v-model="email"
            required
            class="input w-full"
            :class="{ 'border-red-500': loginError }"
            placeholder="seu@email.com"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Senha
          </label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              required
              class="input w-full pr-10"
              :class="{ 'border-red-500': loginError }"
              placeholder="••••••••"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <EyeIcon v-if="!showPassword" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div v-if="loginError" class="text-sm text-red-600 dark:text-red-400">
          {{ loginError }}
        </div>
        
        <button
          type="submit"
          class="btn btn-primary w-full flex items-center justify-center"
          :disabled="loading"
        >
          <span v-if="!loading">Entrar</span>
          <svg v-else class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </button>

        <div class="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Usuário teste: admin@test.com</p>
          <p>Senha: admin123</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const loginError = ref('');

async function handleLogin() {
  loading.value = true;
  loginError.value = '';

  try {
    const success = await authStore.login({
      email: email.value,
      password: password.value
    });
    
    if (success) {
      router.push('/dashboard');
    } else {
      loginError.value = 'Email ou senha incorretos';
    }
  } catch (error) {
    loginError.value = 'Ocorreu um erro ao fazer login';
  } finally {
    loading.value = false;
  }
}
</script>