<template>
  <aside 
    class="fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out"
    :class="{
      '-translate-x-full': !isOpen && isMobile,
      'translate-x-0': isOpen || !isMobile,
      'w-16': isCollapsed || shouldCollapse,
      'w-64': !isCollapsed && !shouldCollapse
    }"
  >
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <Logo v-if="!isCollapsed && !shouldCollapse" />
        <div v-else class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">A</span>
        </div>
        <button
          @click="toggleCollapse"
          class="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <ChevronLeftIcon v-if="!isCollapsed" class="w-5 h-5" />
          <ChevronRightIcon v-else class="w-5 h-5" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto p-4">
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.path">
            <router-link
              :to="item.path"
              @click="handleNavClick(item.path)"
              class="flex items-center p-3 rounded-lg transition-all duration-200"
              :class="[
                isActive(item.path)
                  ? 'bg-primary-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
              :title="isCollapsed || shouldCollapse ? item.name : ''"
            >
              <component 
                :is="item.icon"
                :class="[
                  'transition-all duration-200',
                  isCollapsed || shouldCollapse ? 'w-6 h-6' : 'w-8 h-8',
                  'text-gray-600 dark:text-gray-300 flex-shrink-0'
                ]"
              />
              <span v-if="!isCollapsed && !shouldCollapse" class="ml-3 whitespace-nowrap">
                {{ item.name }}
              </span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <ThemeToggle />
        <button
          @click="handleLogout"
          class="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          <ArrowRightOnRectangleIcon 
            class="w-6 h-6 flex-shrink-0"
          />
          <span v-if="!isCollapsed && !shouldCollapse">Sair</span>
        </button>
      </div>
    </div>
  </aside>

  <!-- Mobile Overlay -->
  <div
    v-if="isOpen && isMobile"
    @click="toggleSidebar"
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
  ></div>

  <!-- Mobile Toggle Button -->
  <button
    @click="toggleSidebar"
    class="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
  >
    <Bars3Icon v-if="!isOpen" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
    <XMarkIcon v-else class="w-6 h-6 text-gray-600 dark:text-gray-300" />
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import {
  ChartBarIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  QueueListIcon,
  DocumentTextIcon,
  PhoneIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline';
import Logo from './layout/Logo.vue';
import ThemeToggle from './layout/ThemeToggle.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const isOpen = ref(window.innerWidth >= 1024);
const isCollapsed = ref(false);
const shouldCollapse = ref(false);
const isMobile = computed(() => window.innerWidth < 1024);

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: ChartBarIcon },
  { name: 'Produtos', path: '/dashboard/products', icon: ShoppingCartIcon },
  { name: 'Lista de Produtos', path: '/dashboard/product-list', icon: ClipboardDocumentListIcon },
  { name: 'Pedidos', path: '/dashboard/orders', icon: QueueListIcon },
  { name: 'Análise', path: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Cardápio', path: '/dashboard/menu-manager', icon: DocumentTextIcon },
  { name: 'Chamadas', path: '/dashboard/call-history', icon: PhoneIcon }
];

const isActive = (path) => route.path === path;

function handleNavClick(path) {
  isOpen.value = !isMobile.value; // Fecha no mobile
  isCollapsed.value = path !== '/dashboard'; // Colapsa no desktop se não for o dashboard
}

function toggleSidebar() {
  isOpen.value = !isOpen.value;
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}

function handleLogout() {
  authStore.logout();
  router.push('/login');
}

function handleResize() {
  isOpen.value = window.innerWidth >= 1024;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
