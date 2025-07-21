import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SignUpStep3 from './sign-up/Step3';
import SignUpStep1 from './sign-up/Step1';
import { useState } from 'react';
import type {
    AccountData,
    ProfileData,
    SignUpFormData,
    TermsData,
} from '@/types/sign-up.types';
import SignUpStep2 from './sign-up/Step2';
import supabase from '@/lib/supabase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import type { UserInfo } from '@/types/user-info.types';
import { v4 as uuidv4 } from 'uuid';

function SignUpPage() {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);

    // 전체 폼 데이터 관리
    const [formData, setFormData] = useState<SignUpFormData>({
        terms: {
            service_terms: null,
            privacy_policy: null,
            marketing_consent: null,
        },
        profile: {
            nickname: '',
            avatarFile: null,
            avatarUrl: null,
            industry: '',
            job: '',
            country: '',
            region: '',
            introduction: '',
        },
        account: {
            email: '',
            password: '',
            confirm_password: '',
        },
    });

    // 각 단계별 데이터 업데이트 함수
    const updateTermsData = (data: Partial<TermsData>) => {
        setFormData((prev) => ({
            ...prev,
            terms: { ...prev.terms, ...data },
        }));
    };

    const updateProfileData = (data: Partial<ProfileData>) => {
        setFormData((prev) => ({
            ...prev,
            profile: { ...prev.profile, ...data },
        }));
    };

    const updateAccountData = (data: Partial<AccountData>) => {
        setFormData((prev) => ({
            ...prev,
            account: { ...prev.account, ...data },
        }));
    };

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSignUp = async () => {
        const email = formData.account.email;
        const password = formData.account.password;
        console.log(formData);

        try {
            // 1. Supabase Auth 에 회원 등록
            const { data: authData } = await supabase.auth.signUp({
                email,
                password,
            });

            if (!authData.user) {
                throw new Error('사용자 정보를 가져오지 못했습니다.');
            }

            // 2. Supabase Storage 에 사용자 프로필 사진 저장.
            let avatarUrl: string | null = null;
            const avatarFile: File | null = formData.profile.avatarFile;
            if (avatarFile) {
                const fileExt: string | undefined = avatarFile.name
                    .split('.')
                    .pop();
                const fileName = `${uuidv4()}.${fileExt}`;
                const filePath = `user-avatar/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('user-avatar')
                    .upload(filePath, avatarFile);

                if (uploadError) throw uploadError;

                const { data: urlData } = supabase.storage
                    .from('user-avatar')
                    .getPublicUrl(filePath);

                if (!urlData)
                    throw new Error(
                        'Failed to get public URL for user avatar.'
                    );

                avatarUrl = urlData.publicUrl;
            }

            // 3. 사용자 프로필 정보 저장.
            const userInfo: UserInfo = {
                user_id: authData.user.id,
                avatar: avatarUrl,
                service_terms: new Date(
                    formData.terms.service_terms!
                ).toISOString(),
                privacy_policy: new Date(
                    formData.terms.privacy_policy!
                ).toISOString(),
                marketing_consent: formData.terms.marketing_consent
                    ? new Date(formData.terms.marketing_consent!).toISOString()
                    : null,
                nickname: formData.profile.nickname!,
                industry: formData.profile.industry!,
                job: formData.profile.job!,
                country: formData.profile.country!,
                region: formData.profile.region!,
                introduction: formData.profile.introduction!,
            };
            const { error: userInfoError } = await supabase
                .from('UserInfo')
                .insert(userInfo);

            if (userInfoError) {
                throw userInfoError; // 사용자 정보 저장 중 에러 발생
            }

            toast.success('회원가입이 완료되었습니다.');
            navigate('/login');
        } catch (error: any) {
            console.error(`회원가입 중 오류가 발생했습니다: ${error.message}`);
            throw new Error('회원가입 중 오류가 발생했습니다.');
        }
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <SignUpStep1
                        onNext={nextStep}
                        formData={formData.terms}
                        updateFormData={updateTermsData}
                    />
                );
            case 2:
                return (
                    <SignUpStep2
                        onPrev={prevStep}
                        onNext={nextStep}
                        formData={formData.profile}
                        updateFormData={updateProfileData}
                    />
                );
            case 3:
                return (
                    <SignUpStep3
                        onPrev={prevStep}
                        formData={formData.account}
                        updateFormData={updateAccountData}
                        handleSignUp={handleSignUp}
                    />
                );
            default:
                return (
                    <SignUpStep1
                        onNext={nextStep}
                        formData={formData.terms}
                        updateFormData={updateTermsData}
                    />
                );
        }
    };

    const getStepColor = (step: number) => {
        return step === currentStep ? '#f96859' : '#e5e5e5';
    };

    const getStepTextColor = (step: number) => {
        return step === currentStep ? 'text-[#f35740]' : 'text-neutral-400';
    };

    return (
        <>
            <div className="container pt-13">
                <div className="w-full h-full flex flex-col items-center justify-start p-6">
                    <div className="flex flex-col items-center">
                        <p className="text-lg font-bold py-2">안녕하세요 👋🏻</p>
                        <div className="flex flex-row items-center justify-center">
                            <span className="text-md font-semibold text-[#f35740]">
                                밍고
                            </span>
                            <span className="text-sm text-neutral-400">
                                에 방문해주셔서 감사합니다.
                            </span>
                        </div>
                        <p className="text-sm text-neutral-400">
                            서비스를 이용하려면 회원가입을 진행해주세요.
                        </p>
                    </div>
                    <div className="w-full max-w-100 flex items-center py-6">
                        {/* Step 1 */}
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="destructive"
                                className="h-6 min-w-6 rounded-sm px-1 font-mono tabular-nums !bg-[#f96859] text-black"
                                style={{ backgroundColor: getStepColor(1) }}
                            >
                                1
                            </Badge>
                            <p
                                className={`text-sm font-semibold ${getStepTextColor(
                                    1
                                )}`}
                            >
                                약관 동의
                            </p>
                        </div>
                        <Separator
                            orientation="horizontal"
                            className="!flex-1 mx-2"
                        />
                        {/* Step 2 */}
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="destructive"
                                className="h-6 min-w-6 rounded-sm px-1 font-mono tabular-nums !bg-[#e5e5e5] text-black"
                                style={{ backgroundColor: getStepColor(2) }}
                            >
                                2
                            </Badge>
                            <p
                                className={`text-sm font-semibold ${getStepTextColor(
                                    2
                                )}`}
                            >
                                프로필 등록
                            </p>
                        </div>
                        <Separator
                            orientation="horizontal"
                            className="!flex-1 mx-2"
                        />
                        {/* Step 3 */}
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="destructive"
                                className="h-6 min-w-6 rounded-sm px-1 font-mono tabular-nums !bg-[#e5e5e5] text-black"
                                style={{ backgroundColor: getStepColor(3) }}
                            >
                                3
                            </Badge>
                            <p
                                className={`text-sm font-semibold ${getStepTextColor(
                                    3
                                )}`}
                            >
                                회원가입
                            </p>
                        </div>
                    </div>
                    {/* <SignUpStep1 /> */}
                    {/* <SignUpStep2 /> */}
                    {/* <SignUpStep3 /> */}
                    {renderCurrentStep()}
                </div>
            </div>
        </>
    );
}

export default SignUpPage;
