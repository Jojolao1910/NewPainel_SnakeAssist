<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg max-w-2xl w-full">
      <div class="p-6">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-2xl font-bold">Detalhes da chamada</h2>
            <p class="text-gray-600">{{ formatDate(call.startTime) }}</p>
          </div>
          <button
            @click="$emit('close')"
            class="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h3 class="text-sm font-medium text-gray-500">Cliente</h3>
              <p class="mt-1 text-sm text-gray-900">{{ call.customerName }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">Número de telefone</h3>
              <p class="mt-1 text-sm text-gray-900">{{ call.phoneNumber }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">Duração</h3>
              <p class="mt-1 text-sm text-gray-900">{{ formatDuration(call.duration) }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">Status</h3>
              <div class="mt-1">
                <CallStatusBadge :status="call.status" />
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-2">Notas</h3>
            <p class="text-sm text-gray-900">{{ call.notes || 'No notes available' }}</p>
          </div>

          <div v-if="call.recording">
            <h3 class="text-sm font-medium text-gray-500 mb-2">Gravação</h3>
            <audio controls class="w-full">
              <source :src="call.recording" type="audio/mpeg">
              Seu navegador não suporta o elemento áudio.
            </audio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { formatDate } from '../../utils/date';
import CallStatusBadge from './CallStatusBadge.vue';

defineProps({
  call: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
</script>