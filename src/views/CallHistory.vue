<template>
  <div class="space-y-6">
    <header class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Histórico de chamadas</h1>
      <div class="flex space-x-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Pesquisar chamadas..."
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
       bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 
       border-gray-300 dark:border-gray-700"
        />
        <DateRangePicker v-model="dateRange" />
      </div>
    </header>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <CallList
        :calls="filteredCalls"
        @view-details="showCallDetails"
      />
      
      <div class="p-4 border-t">
        <Pagination
          :total="totalCalls"
          :current-page="currentPage"
          :per-page="perPage"
          @page-change="changePage"
        />
      </div>
    </div>

    <CallDetailsModal
      v-if="selectedCall"
      :call="selectedCall"
      @close="selectedCall = null"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCallStore } from '../store/call';
import DateRangePicker from '../components/shared/DateRangePicker.vue';
import CallList from '../components/calls/CallList.vue';
import CallDetailsModal from '../components/calls/CallDetailsModal.vue';
import Pagination from '../components/shared/Pagination.vue';

const callStore = useCallStore();
const searchQuery = ref('');
const dateRange = ref({ start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), end: new Date() });
const currentPage = ref(1);
const perPage = ref(10);
const selectedCall = ref(null);

const filteredCalls = computed(() => {
  return callStore.filterCalls({
    search: searchQuery.value,
    dateRange: dateRange.value,
    page: currentPage.value,
    perPage: perPage.value
  });
});

const totalCalls = computed(() => callStore.totalCalls);

onMounted(async () => {
  await fetchCalls();
});

async function fetchCalls() {
  await callStore.fetchCalls({
    dateRange: dateRange.value,
    page: currentPage.value,
    perPage: perPage.value
  });
}

function showCallDetails(call) {
  selectedCall.value = call;
}

function changePage(page) {
  currentPage.value = page;
  fetchCalls();
}
</script>