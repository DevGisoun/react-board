import { ThemeProvider } from '@/components/theme-provider';

import { Button } from './components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';

function App() {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <div className="page">
                    <div className="container">
                        <Card className="w-full max-w-100">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    로그인
                                </CardTitle>
                                <CardDescription>
                                    로그인을 위한 정보를 입력해주세요.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">
                                                이메일
                                            </Label>
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
                                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
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
                                <div className="w-full h-full flex flex-col gap-2">
                                    <Button type="submit" className="w-full">
                                        로그인
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        구글 로그인
                                    </Button>
                                    <div className="flex flex-row items-center justify-center gap-1 text-sm">
                                        <span>계정이 없으신가요?</span>
                                        <a href="" className="underline">
                                            회원가입
                                        </a>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;
