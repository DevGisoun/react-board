import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import supabase from '@/lib/supabase';
import { useEffect, useState } from 'react';

function Step3() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error(`회원가입 중 오류가 발생했습니다: ${error.message}`);
        } else {
            console.log('가입 확인을 위해 이메일을 확인해주세요.');
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {}

    return (
        <>
            <Card className="w-full max-w-100 gap-3 py-6">
                <CardHeader>
                    <CardTitle className="text-lg">회원가입</CardTitle>
                    <CardDescription>
                        회원가입을 위한 정보를 입력해주세요.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 px-0 sm:px-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm">이메일</p>
                        <div className="flex flex-row gap-2">
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력하세요."
                            />
                            <Button>본인 인증</Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm">비밀번호</p>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요."
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm">비밀번호 확인</p>
                        <Input placeholder="비밀번호 확인을 입력하세요." />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 text-muted-foreground bg-black sm:bg-card">
                                간편 회원가입을 원하시면 로그인 링크를
                                클릭하세요.
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 px-0 pt-4 sm:px-6">
                    <div className="w-full grid grid-cols-2 gap-4">
                        <Button variant={'outline'} className="cursor-pointer">
                            이전
                        </Button>
                        <Button
                            variant={'destructive'}
                            className="cursor-pointer"
                            onClick={handleSignUp}
                        >
                            회원가입
                        </Button>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-1 text-sm">
                        <p>이미 계정이 있으신가요?</p>
                        <a
                            href=""
                            className="underline underline-offset-4 cursor-pointer"
                        >
                            로그인
                        </a>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}

export default Step3;
