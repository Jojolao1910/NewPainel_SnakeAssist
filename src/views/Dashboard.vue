<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <SideNav />
    
    <main :class="{ 'lg:ml-64': !isCollapsed && route.path === '/dashboard', 'lg:ml-16': isCollapsed || route.path !== '/dashboard' }">
      <div class="p-4 sm:p-6 lg:p-8">
        <template v-if="route.path === '/dashboard'">
          <div class="mb-8">
            <h1 class="text-2xl font-bold mb-2">Bem-Vindo, {{ userName }}!</h1>
            <p class="text-gray-600 dark:text-gray-400">
              Gerencie seu negócio com eficiência
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              v-for="card in dashboardCards"
              :key="card.route"
              v-bind="card"
            />
          </div>
        </template>

        <router-view v-else></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../store/auth';
import SideNav from '../components/SideNav.vue';
import DashboardCard from '../components/dashboard/DashboardCard.vue';
import {
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  QueueListIcon,
  ChartBarIcon,
  DocumentTextIcon,
  PhoneIcon
} from '@heroicons/vue/24/outline';

const route = useRoute();
const authStore = useAuthStore();
const userName = computed(() => authStore.userProfile?.name || 'User');
const isCollapsed = computed(() => localStorage.getItem('sidebarCollapsed') === 'true');

const dashboardCards = [
  {
    icon: ShoppingCartIcon,
    title: 'Gerenciar Produtos',
    subtitle: 'Produtos',
    description: 'Adicione, edite e gerencie produtos',
    route: '/dashboard/products'
  },
  {
    icon: QueueListIcon,
    title: 'Pedidos em Andamento',
    subtitle: 'Pedidos',
    description: 'Acompanhe e gerencie pedidos ativos',
    route: '/dashboard/orders'
  },
  {
    icon: ChartBarIcon,
    title: 'Análise de Vendas',
    subtitle: 'Relatórios',
    description: 'Visualize métricas e relatórios',
    route: '/dashboard/analytics'
  },
  {
    icon: DocumentTextIcon,
    title: 'Gerenciar Cardápio',
    subtitle: 'Cardápio',
    description: 'Atualize seu cardápio on-line',
    route: '/dashboard/menu-manager'
  },
  {
    icon: PhoneIcon,
    title: 'Histórico de Chamadas',
    subtitle: 'Chamadas',
    description: 'Visualize histórico de Atendimentos',
    route: '/dashboard/call-history'
  },
  {
    icon: ClipboardDocumentListIcon,
    title: 'Lista de Produtos',
    subtitle: 'Inventário',
    description: 'Gerencie seu estoque',
    route: '/dashboard/product-list'
  }
];
</script>