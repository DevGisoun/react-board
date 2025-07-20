import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
// import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
    user: User | null;
    accessToken: string | null;
    // isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setAccessToken: (accessToken: string | null) => void;
    clearUser: () => void;
}

// case 1: persist 사용 X. (session 통신)
export const useUserStore = create<UserState>((set) => ({
    user: null,
    accessToken: null,
    // isAuthenticated: false,
    setUser: (user) => set({ user }),
    setAccessToken: (accessToken) => set({ accessToken }),
    clearUser: () => set({ user: null }),
}));

// case 2: persist 사용. (localStorage 데이터 로드)
// export const useUserStore = create<UserState>()(
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
