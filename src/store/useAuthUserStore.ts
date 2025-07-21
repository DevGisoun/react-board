import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
// import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthUserState {
    authUser: User | null;
    accessToken: string | null;
    // isAuthenticated: boolean;
    setAuthUser: (user: User | null) => void;
    setAccessToken: (accessToken: string | null) => void;
    clearAuthUser: () => void;
}

// case 1: persist 사용 X. (session 통신)
export const useAuthUserStore = create<AuthUserState>((set) => ({
    authUser: null,
    accessToken: null,
    // isAuthenticated: false,
    setAuthUser: (authUser) => set({ authUser }),
    setAccessToken: (accessToken) => set({ accessToken }),
    clearAuthUser: () => set({ authUser: null }),
}));

// case 2: persist 사용. (localStorage 데이터 로드)
// export const useAuthUserStore = create<AuthUserState>()(
//     persist(
//         (set) => ({
//             user: null,
//             setUser: (user) => set({ user }),
//             clearUser: () => set({ user: null }),
//         }),
//         {
//             name: 'user-storage',
//             storage: createJSONStorage(() => localStorage),
//         }
//     )
// );
