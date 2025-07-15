import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import SignUpStep3 from './sign-up/Step3';

function SignUpPage() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center pt-10">
                <div className="flex flex-col items-center justify-center">
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
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="destructive"
                            className="h-6 min-w-6 rounded-sm px-1 font-mono tabular-nums !bg-[#f96859] text-black"
                        >
                            1
                        </Badge>
                        <p className="text-sm font-semibold">약관 동의</p>
                    </div>
                    <Separator
                        orientation="horizontal"
                        className="!flex-1 mx-2"
                    />
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="destructive"
                            className="h-6 min-w-6 rounded-sm px-1 font-mono tabular-nums !bg-[#e5e5e5] text-black"
                        >
                            2
                        </Badge>
                        <p className="text-sm font-semibold">프로필 등록</p>
                    </div>
                    <Separator
                        orientation="horizontal"
                        className="!flex-1 mx-2"
                    />
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="destructive"
                            className="h-6 min-w-6 rounded-sm px-1 font-mono tabular-nums !bg-[#e5e5e5] text-black"
                        >
                            3
                        </Badge>
                        <p className="text-sm font-semibold">회원가입</p>
                    </div>
                </div>
                {/* <Step1 /> */}
                <SignUpStep3 />
            </div>
        </>
    );
}

export default SignUpPage;
