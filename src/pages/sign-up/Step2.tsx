import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

function SignUpStep2() {
    return (
        <>
            <Card className="w-full max-w-100 gap-3 py-6">
                <CardHeader>
                    <CardTitle className="text-lg">프로필 등록</CardTitle>
                    <CardDescription>
                        본인의 장점과 이력 소개를 통해 강렬하게 어필해보세요!
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 px-0 sm:px-6">
                    <Label className="flex items-center justify-start py-3 px-4 gap-2 bg-accent/25 rounded-sm">
                        <Checkbox
                            defaultChecked
                            className="w-[18px] h-[18px]"
                        />
                        <p className="text-sm leading-none font-medium">
                            전체 동의
                        </p>
                    </Label>
                    <Separator orientation="horizontal" />
                    <p>필수 동의항목</p>
                    <Label className="flex items-center justify-start gap-2 rounded-sm">
                        <Checkbox
                            defaultChecked
                            className="w-[18px] h-[18px]"
                        />
                        <div className="w-full flex flex-row items-center justify-between">
                            <p className="text-sm leading-none font-medium">
                                서비스 이용약관 동의
                            </p>
                            <div className="flex flex-row items-center justify-center gap-1">
                                <a
                                    href=""
                                    className="hover:underline hover:underline-offset-4"
                                >
                                    자세히 보기
                                </a>
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    </Label>
                    <Label className="flex items-center justify-start gap-2 rounded-sm">
                        <Checkbox
                            defaultChecked
                            className="w-[18px] h-[18px]"
                        />
                        <div className="w-full flex flex-row items-center justify-between">
                            <p className="text-sm leading-none font-medium">
                                개인정보 수집 및 이용동의
                            </p>
                            <div className="flex flex-row items-center justify-center gap-1">
                                <a
                                    href=""
                                    className="hover:underline hover:underline-offset-4"
                                >
                                    자세히 보기
                                </a>
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    </Label>
                    <Separator orientation="horizontal" />
                    <p>선택 동의항목</p>
                    <Label className="flex items-center justify-start gap-2 rounded-sm">
                        <Checkbox
                            defaultChecked
                            className="w-[18px] h-[18px]"
                        />
                        <div className="w-full flex flex-row items-center justify-between">
                            <p className="text-sm leading-none font-medium">
                                마케팅 및 광고 수신 동의
                            </p>
                            <div className="flex flex-row items-center justify-center gap-1">
                                <a
                                    href=""
                                    className="hover:underline hover:underline-offset-4"
                                >
                                    자세히 보기
                                </a>
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    </Label>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 px-0 pt-4 sm:px-6">
                    <div className="w-full grid grid-cols-2 gap-4">
                        <Button variant={'outline'} className="cursor-pointer">
                            이전
                        </Button>
                        <Button
                            variant={'destructive'}
                            className="cursor-pointer"
                        >
                            다음
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

export default SignUpStep2;
