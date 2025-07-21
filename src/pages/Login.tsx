import SocialLoginButton from '@/components/SocialLoginButton';
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
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useUserStore } from '@/store/useUserStore';

const formSchema = z.object({
    email: z.email({
        message: '올바른 형식의 이메일 주소를 입력해주세요.',
    }),
    password: z.string().min(8, {
        message: '비밀번호는 최소 8자 이상이어야 합니다.',
    }),
});

function LoginPage() {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { setUser } = useUserStore();

    const handleToggle = () => setShowPassword((prev) => !prev);

    const handleSignIn = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        const email = values.email;
        const password = values.password;

        try {
            const { data } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            const user = data.user;
            console.log(user);

            if (user) {
                setUser(user);
                navigate('/');
            } else {
                toast('사용자 정보를 불러올 수 없습니다.');
            }
        } catch (error: any) {
            console.error(error.message);
            throw new Error('로그인에 실패하였습니다.');
        }
    };

    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center pt-10">
                <div className="flex flex-col items-center justify-center py-6">
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
                        서비스를 이용하려면 로그인을 진행해주세요.
                    </p>
                </div>
                <Card className="w-full max-w-100 gap-3">
                    <CardHeader>
                        <CardTitle className="text-lg">로그인</CardTitle>
                        <CardDescription>
                            로그인을 위한 정보를 입력해주세요.
                        </CardDescription>

                        <div className="flex flex-col gap-3 pt-5">
                            <SocialLoginButton
                                provider="naver"
                                onClick={() => console.log('네이버 로그인')}
                            />
                            <SocialLoginButton
                                provider="kakao"
                                onClick={() => console.log('카카오 로그인')}
                            />
                            <SocialLoginButton
                                provider="google"
                                onClick={() => console.log('구글 로그인')}
                            />

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-2 text-muted-foreground bg-black sm:bg-card">
                                        OR CONTINUE WITH
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSignIn)}
                            className="flex flex-col gap-3"
                        >
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        이메일
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="이메일을 입력하세요."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className="relative">
                                                    <div className="w-full flex items-center justify-between">
                                                        <FormLabel>
                                                            비밀번호
                                                        </FormLabel>
                                                        <Link
                                                            to={
                                                                '/sign-in/credentials'
                                                            }
                                                            className="text-sm underline"
                                                        >
                                                            비밀번호를
                                                            잊으셨나요?
                                                        </Link>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            type={
                                                                showPassword
                                                                    ? 'text'
                                                                    : 'password'
                                                            }
                                                            placeholder="비밀번호를 입력하세요."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        size={'icon'}
                                                        className="absolute top-7 right-1 bg-transparent hover:bg-transparent"
                                                        onClick={handleToggle}
                                                    >
                                                        {showPassword ? (
                                                            <Eye className="text-muted-foreground" />
                                                        ) : (
                                                            <EyeOff className="text-muted-foreground" />
                                                        )}
                                                    </Button>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <div className="w-full h-full flex flex-col gap-1">
                                    <Button
                                        type="submit"
                                        className="w-full my-2 bg-[#a34547] dark:bg-[#a34547] text-white cursor-pointer"
                                    >
                                        로그인
                                    </Button>
                                    <div className="flex flex-row items-center justify-center gap-1 text-sm">
                                        <span>계정이 없으신가요?</span>
                                        <a
                                            onClick={() => navigate('/sign-up')}
                                            className="underline underline-offset-4 cursor-pointer"
                                        >
                                            회원가입
                                        </a>
                                    </div>
                                </div>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </div>
        </>
    );
}

export default LoginPage;
