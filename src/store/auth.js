import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { authService } from "../services/auth.service";
import { storage } from "../services/storage";
import { handleApiError } from "../utils/errorHandler";

const toast = useToast();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: storage.get("user", null),
    token: storage.get("token", null),
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userProfile: (state) => state.user,
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const { token, user } = await authService.login(
          credentials.email,
          credentials.password
        );

        this.token = token;
        this.user = user;
        storage.set("token", token);
        storage.set("user", user);

        toast.success("Bem-vindo de volta!");
        return true;
      } catch (error) {
        handleApiError(error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.error = null;
      storage.clear();
      toast.info("Você foi desconectado com sucesso");
    },
  },
});
