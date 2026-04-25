import { onAuthStateChanged, signOut } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../config/Firebase";

const useAuthStore = create((set, get) => ({
    // ======================
    // 👤 USER STATE
    // ======================
    user: null,
    is_token: localStorage.getItem("blog_user_islogin") === "1" ? true : false,
    isLoggedIn: false,
    loading: false,

    setLoading: (value) => {
        set({ loading: value });
    },

    setUser: (user) => {
        set({
            user,
            isLoggedIn: !!user
        });
    },

    logout: () => {
         signOut(auth);
        set({
            user: null,
            isLoggedIn: false,
            is_token: null
        });
    },

    // ======================
    // 🔥 AUTH LISTENER (refresh fix)
    // ======================
    checkislogin: () => {
        const setUser = get().setUser;
        const setLoading = get().setLoading;

        setLoading(true); // 👈 start loading

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    role:user.role,
                    email: user.email,
                    name: user.displayName
                });
            } else {
                setUser(null);
            }

            setLoading(false); // 👈 finish loading
        });
    }
}));

export default useAuthStore;