export interface TermsData {
    serviceTerms: number | null;
    privacyPolicy: number | null;
    marketingConsent: number | null;
}

export interface ProfileData {
    nickname: string;
    industry: string;
    job: string;
    country: string;
    region: string;
    introduction: string;
}

export interface AccountData {
    email: string;
    password: string;
    confirmPassword: string;
}

// 전체 회원가입 폼 데이터 구조
export interface SignUpFormData {
    terms: TermsData;
    profile: ProfileData;
    account: AccountData;
}

// 각 Step 컴포넌트의 Props 인터페이스
export interface SignUpStep1Props {
    onNext: () => void;
    formData: TermsData;
    updateFormData: (data: Partial<TermsData>) => void;
}

export interface SignUpStep2Props {
    onNext: () => void;
    onPrev: () => void;
    formData: ProfileData;
    updateFormData: (data: Partial<ProfileData>) => void;
}

export interface SignUpStep3Props {
    onPrev: () => void;
    // onComplete: () => Promise<void>;
    formData: AccountData;
    updateFormData: (data: Partial<AccountData>) => void;
    // isLoading: boolean;
}
