import type { UserInfo } from '@/types/user-info.types';
import { create } from 'zustand';

interface UserInfoState {
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo | null) => void;
}

export const useUserInfoStore = create<UserInfoState>((set) => ({
    userInfo: null,
    setUserInfo: (userInfo) => set({ userInfo }),
}));
