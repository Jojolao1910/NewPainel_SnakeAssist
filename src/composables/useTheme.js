import { ref } from "vue";

const isDark = ref(localStorage.getItem("theme") === "dark");

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark.value);
  };

  // Initialize theme
  document.documentElement.classList.toggle("dark", isDark.value);

  return {
    isDark,
    toggleTheme,
  };
}
