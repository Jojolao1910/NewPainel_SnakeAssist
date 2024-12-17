import { useToast } from "vue-toastification";

const toast = useToast();

export const handleApiError = (error) => {
  const defaultMessage = "Ocorreu um erro. Por favor, tente novamente.";

  if (error.response) {
    switch (error.response.status) {
      case 401:
        toast.error("Sessão expirada. Por favor, faça login novamente.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        break;
      case 403:
        toast.error("Você não tem permissão para realizar esta ação.");
        break;
      case 404:
        toast.error("Recurso não encontrado.");
        break;
      case 422:
        toast.error(error.response.data.message || "Dados inválidos.");
        break;
      case 500:
        toast.error("Erro interno do servidor. Tente novamente mais tarde.");
        break;
      default:
        toast.error(error.response.data.message || defaultMessage);
    }
  } else if (error.request) {
    toast.error("Erro de conexão. Verifique sua internet.");
  } else {
    toast.error(defaultMessage);
  }

  return Promise.reject(error);
};
