<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Nosso Cardápio</h1>
          <div class="flex items-center space-x-4">
            <button
              @click="openCart"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <ShoppingCartIcon class="w-5 h-5 mr-2" />
              Carrinho ({{ cartItemsCount }})
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Category Navigation -->
      <nav class="flex space-x-4 mb-8 overflow-x-auto pb-2">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category"
          class="px-4 py-2 rounded-full whitespace-nowrap"
          :class="category === selectedCategory ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'"
        >
          {{ category.name }}
        </button>
      </nav>

      <!-- Menu Items Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold">{{ item.name }}</h3>
            <p class="text-gray-600 mt-1">{{ item.description }}</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-lg font-bold">{{ formatPrice(item.price) }}</span>
              <button
                @click="addToCart(item)"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Shopping Cart Modal -->
    <div
      v-if="showCart"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">Seu Carrinho</h2>
            <button @click="showCart = false" class="text-gray-500 hover:text-gray-700">
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>

          <div v-if="cart.length === 0" class="text-center py-8">
            <p class="text-gray-500">Seu carrinho está vazio</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="item in cart"
              :key="item.id"
              class="flex justify-between items-center"
            >
              <div>
                <h3 class="font-medium">{{ item.name }}</h3>
                <p class="text-gray-500">{{ formatPrice(item.price) }} x {{ item.quantity }}</p>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="updateQuantity(item, -1)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  <MinusCircleIcon class="w-5 h-5" />
                </button>
                <span>{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item, 1)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  <PlusCircleIcon class="w-5 h-5" />
                </button>
              </div>
            </div>

            <div class="border-t pt-4 mt-4">
              <div class="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{{ formatPrice(cartTotal) }}</span>
              </div>
            </div>

            <button
              @click="checkout"
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-4"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMenuStore } from '../store/menu';
import { formatPrice } from '../utils/format';
import {
  ShoppingCartIcon,
  XMarkIcon,
  MinusCircleIcon,
  PlusCircleIcon
} from '@heroicons/vue/24/outline';

const menuStore = useMenuStore();
const categories = ref([]);
const selectedCategory = ref(null);
const showCart = ref(false);
const cart = ref([]);

// Fetch menu data
onMounted(async () => {
  await menuStore.fetchCategories();
  await menuStore.fetchItems();
  categories.value = menuStore.categories;
  if (categories.value.length > 0) {
    selectedCategory.value = categories.value[0];
  }
});

// Computed properties
const filteredItems = computed(() => {
  if (!selectedCategory.value) return menuStore.items;
  return menuStore.items.filter(item => item.categoryId === selectedCategory.value.id);
});

const cartItemsCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

// Methods
function addToCart(item) {
  const existingItem = cart.value.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.value.push({ ...item, quantity: 1 });
  }
}

function updateQuantity(item, change) {
  const cartItem = cart.value.find(i => i.id === item.id);
  if (cartItem) {
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
      cart.value = cart.value.filter(i => i.id !== item.id);
    }
  }
}

function openCart() {
  showCart.value = true;
}

async function checkout() {
  // Implement checkout logic here
  console.log('Checkout:', cart.value);
  showCart.value = false;
  cart.value = [];
}
</script>