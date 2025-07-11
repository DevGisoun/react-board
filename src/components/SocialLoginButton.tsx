import { Button } from '@/components/ui/button'; // shadcn/ui의 Button 컴포넌트를 가정
import { cn } from '@/lib/utils'; // classname을 병합해주는 유틸리티 함수

// 각 소셜 미디어의 속성을 정의하는 타입
type Provider = 'naver' | 'kakao' | 'google';

interface SocialLoginButtonProps {
    provider: Provider;
}

// 각 소셜 미디어의 상세 정보 (아이콘, 스타일, 이름)
const providerConfig = {
    naver: {
        icon: '/src/assets/icons/naver.svg',
        className: 'bg-[#03c75a] dark:bg-[#03c75a] text-black',
        label: '네이버 로그인',
    },
    kakao: {
        icon: '/src/assets/icons/kakao.svg',
        className: 'bg-[#fee500] dark:bg-[#fee500] text-black',
        label: '카카오 로그인',
    },
    google: {
        icon: '/src/assets/icons/google.svg',
        className: 'border-gray-300', // 구글은 기본 outline 스타일을 사용
        label: '구글 로그인',
    },
};

function SocialLoginButton({
    provider,
    className,
    ...props
}: React.ComponentProps<'button'> & SocialLoginButtonProps) {
    const config = providerConfig[provider];

    return (
        <Button
            variant="outline"
            className={cn(
                'w-full',
                'outline-none',
                'border-none',
                config.className,
                className
            )} // 기본, provider별, 추가 className 순으로 병합
            {...props}
        >
            <img
                src={config.icon}
                alt={config.label}
                className="w-4 h-4 mr-2"
            />
            {config.label}
        </Button>
    );
}

export default SocialLoginButton;
