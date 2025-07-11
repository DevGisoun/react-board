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
import { Label } from '@/components/ui/label';

function LoginPage() {
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
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">이메일</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="이메일을 입력하세요."
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            비밀번호
                                        </Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline underline-offset-4 hover:underline"
                                        >
                                            비밀번호를 잊으셨나요?
                                        </a>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="비밀번호를 입력하세요."
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <div className="w-full h-full flex flex-col gap-1">
                            <Button
                                type="submit"
                                className="w-full my-2 bg-[#a34547] dark:bg-[#a34547] text-white"
                            >
                                로그인
                            </Button>
                            <div className="flex flex-row items-center justify-center gap-1 text-sm">
                                <span>계정이 없으신가요?</span>
                                <a
                                    href=""
                                    className="underline underline-offset-4"
                                >
                                    회원가입
                                </a>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

export default LoginPage;
