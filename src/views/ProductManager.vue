<template>
  <div class="space-y-6">
    <ProductManagerHeader @add-product="showAddModal = true" />

    <LoadingSpinner v-if="loading" />

    <ProductGrid
      v-else
      :products="products"
      @edit="handleEditProduct"
      @delete="handleDeleteProduct"
    />

    <ProductForm
      v-if="showAddModal"
      @close="showAddModal = false"
      @submit="handleAddProduct"
    />

     <!-- Modal para editar produtos -->
    <ProductForm
      v-if="showEditModal"
      :product="selectedProduct"
      @close="closeEditModal"
      @submit="updateProduct"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '../store/product';
import ProductManagerHeader from '../components/products/ProductManagerHeader.vue';
import ProductGrid from '../components/products/ProductGrid.vue';
import ProductForm from '../components/products/ProductForm.vue';
import LoadingSpinner from '../components/shared/LoadingSpinner.vue';

const productStore = useProductStore();
const products = ref([]);
const showAddModal = ref(false);
const showEditModal = ref(false);
const selectedProduct = ref(null);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    await fetchProducts();
  } finally {
    loading.value = false;
  }
});

async function fetchProducts() {
  products.value = await productStore.fetchProducts();
}

async function handleAddProduct(productData) {
  try {
    await productStore.addProduct(productData);
    showAddModal.value = false;
    await fetchProducts();
  } catch (error) {
    console.error('Error adding product:', error);
  }
}

function handleEditProduct(product) {
  selectedProduct.value = product; // Define o produto selecionado
  showEditModal.value = true; // Abre o modal de edição
}

async function updateProduct(updatedProduct) {
  try {
    await productStore.updateProduct(updatedProduct.id, updatedProduct);
    showEditModal.value = false;
    await fetchProducts();
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

function closeEditModal() {
  showEditModal.value = false;
  selectedProduct.value = null;
}

async function handleDeleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await productStore.deleteProduct(productId);
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
}
</script>