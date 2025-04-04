import toast from 'react-hot-toast';
import {create} from 'zustand';

export const useThemeStore = create((set) => ({
   
        theme: localStorage.getItem("chat-theme") || "light",
        setTheme: (theme) => {
            localStorage.setItem("chat-theme", theme);
            set({theme});
            toast.success(`Theme set to ${theme}`);
        }
}))