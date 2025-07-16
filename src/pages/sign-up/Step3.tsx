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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useNavigate } from 'react-router';

const formSchema = z.object({
    email: z.email({
        message: '올바른 형식의 이메일 주소를 입력해주세요.',
    }),
    password: z.string().min(8, {
        message: '비밀번호는 최소 8자 이상입니다.',
    }),
    confirmPassword: z.string().min(8, {
        message: '비밀번호를 확인 후 입력해주세요.',
    }),
});

function SignUpStep3() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const handleToggle = (field: string) => {
        if (field === 'password') setShowPassword(!showPassword);
        else if (field === 'confirmPassword')
            setShowConfirmPassword(!showPassword);
    };

    const handleSignUp = async (values: z.infer<typeof formSchema>) => {
        const email = values.email;
        const password = values.password;

        try {
            const { data } = await supabase.auth.signUp({
                email,
                password,
            });

            if (data.user) {
                toast.success('회원가입이 완료되었습니다.');
                navigate('/login');
            }
        } catch (error: any) {
            console.error(`회원가입 중 오류가 발생했습니다: ${error.message}`);
            throw new Error('회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <Card className="w-full max-w-100 gap-3 py-6">
                <CardHeader>
                    <CardTitle className="text-lg">회원가입</CardTitle>
                    <CardDescription>
                        회원가입을 위한 정보를 입력해주세요.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSignUp)}
                        className="flex flex-col gap-3"
                    >
                        <CardContent className="grid gap-4 px-0 sm:px-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>이메일</FormLabel>
                                            <FormControl>
                                                <div className="flex flex-row gap-2">
                                                    <Input
                                                        placeholder="이메일을 입력하세요."
                                                        {...field}
                                                    />
                                                    <Button className="cursor-pointer">
                                                        본인인증
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs font-normal" />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel>비밀번호</FormLabel>
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
                                            size="icon"
                                            className="absolute top-[22px] right-1 bg-transparent hover:bg-transparent cursor-pointer"
                                            onClick={() =>
                                                handleToggle('password')
                                            }
                                        >
                                            {showPassword ? (
                                                <Eye className="text-muted-foreground" />
                                            ) : (
                                                <EyeOff className="text-muted-foreground" />
                                            )}
                                        </Button>
                                        <FormMessage className="text-xs font-normal" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel>비밀번호 확인</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="비밀번호 획인란을 입력하세요."
                                                {...field}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            size="icon"
                                            className="absolute top-[22px] right-1 bg-transparent hover:bg-transparent cursor-pointer"
                                            onClick={() =>
                                                handleToggle('confirmPassword')
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <Eye className="text-muted-foreground" />
                                            ) : (
                                                <EyeOff className="text-muted-foreground" />
                                            )}
                                        </Button>
                                        <FormMessage className="text-xs font-normal" />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 px-0 pt-4 sm:px-6">
                            <div className="w-full grid grid-cols-2 gap-4">
                                <Button
                                    variant={'outline'}
                                    className="cursor-pointer"
                                >
                                    이전
                                </Button>
                                <Button
                                    type="submit"
                                    variant={'destructive'}
                                    className="cursor-pointer"
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
                    </form>
                </Form>
            </Card>
        </>
    );
}

export default SignUpStep3;
