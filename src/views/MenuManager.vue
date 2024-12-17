<template>
  <div class="space-y-6">
    <header class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Menu Gerenciador</h1>
      <div class="flex space-x-4">
        <button
          @click="showCategoryModal = true"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add Categoria
        </button>
        <button
          @click="showItemModal = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Item ao Menu
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <MenuCategories
        :categories="categories"
        @select="selectCategory"
        @edit="editCategory"
        @delete="deleteCategory"
      />
      
      <div class="lg:col-span-2">
        <MenuItems
          :items="filteredItems"
          :selected-category="selectedCategory"
          @edit="editItem"
          @delete="deleteItem"
        />
      </div>
    </div>

    <MenuCategoryModal
      v-if="showCategoryModal"
      :category="editingCategory"
      @close="closeCategoryModal"
      @save="saveCategory"
    />

    <MenuItemModal
      v-if="showItemModal"
      :item="editingItem"
      :categories="categories"
      @close="closeItemModal"
      @save="saveItem"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMenuStore } from '../store/menu';
import MenuCategories from '../components/menu/MenuCategories.vue';
import MenuItems from '../components/menu/MenuItems.vue';
import MenuCategoryModal from '../components/menu/MenuCategoryModal.vue';
import MenuItemModal from '../components/menu/MenuItemModal.vue';

const menuStore = useMenuStore();
const showCategoryModal = ref(false);
const showItemModal = ref(false);
const selectedCategory = ref(null);
const editingCategory = ref(null);
const editingItem = ref(null);

const categories = computed(() => menuStore.categories);
const filteredItems = computed(() => 
  selectedCategory.value
    ? menuStore.items.filter(item => item.categoryId === selectedCategory.value.id)
    : menuStore.items
);

function selectCategory(category) {
  selectedCategory.value = category;
}

function editCategory(category) {
  editingCategory.value = category;
  showCategoryModal.value = true;
}

function editItem(item) {
  editingItem.value = item;
  showItemModal.value = true;
}

async function saveCategory(categoryData) {
  if (editingCategory.value) {
    await menuStore.updateCategory(editingCategory.value.id, categoryData);
  } else {
    await menuStore.addCategory(categoryData);
  }
  closeCategoryModal();
}

async function saveItem(itemData) {
  if (editingItem.value) {
    await menuStore.updateItem(editingItem.value.id, itemData);
  } else {
    await menuStore.addItem(itemData);
  }
  closeItemModal();
}

async function deleteCategory(categoryId) {
  if (confirm('Are you sure you want to delete this category?')) {
    await menuStore.deleteCategory(categoryId);
    if (selectedCategory.value?.id === categoryId) {
      selectedCategory.value = null;
    }
  }
}

async function deleteItem(itemId) {
  if (confirm('Are you sure you want to delete this item?')) {
    await menuStore.deleteItem(itemId);
  }
}

function closeCategoryModal() {
  showCategoryModal.value = false;
  editingCategory.value = null;
}

function closeItemModal() {
  showItemModal.value = false;
  editingItem.value = null;
}
</script>