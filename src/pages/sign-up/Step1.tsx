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
import type { SignUpStep1Props, TermsData } from '@/types/sign-up.types';
import { ChevronRight } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

const formSchema = z.object({
    serviceTerms: z.boolean({
        message: "'서비스 이용약관 동의'는 필수 동의 사항입니다.",
    }),
    privacyPolicy: z.boolean({
        message: "'개인정보 수집 및 이용동의'는 필수 동의 사항입니다.",
    }),
});

function SignUpStep1({ onNext, formData, updateFormData }: SignUpStep1Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serviceTerms: false,
            privacyPolicy: false,
        },
    });

    const handleNextStep = (_: z.infer<typeof formSchema>) => {
        if (!formData.serviceTerms || !formData.privacyPolicy) {
            toast.warning('필수 약관에 동의해주세요.');
            return;
        }

        onNext();
    };

    const handleCheckboxChange = (field: keyof TermsData, checked: boolean) => {
        const timestamp = checked ? Date.now() : null;
        updateFormData({ [field]: timestamp });
    };

    return (
        <>
            <Card className="w-full max-w-100 gap-3 py-6">
                <CardHeader>
                    <CardTitle className="text-lg">약관 동의</CardTitle>
                    <CardDescription>
                        필수 이용약관에 먼저 동의해주세요.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleNextStep)}
                        className="flex flex-col gap-3"
                    >
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
                                <FormField
                                    control={form.control}
                                    name="serviceTerms"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Checkbox
                                                        defaultChecked
                                                        className="w-[18px] h-[18px]"
                                                        checked={
                                                            !!formData.serviceTerms
                                                        }
                                                        onCheckedChange={(
                                                            checked
                                                        ) =>
                                                            handleCheckboxChange(
                                                                'serviceTerms',
                                                                checked as boolean
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs font-normal" />
                                            </FormItem>
                                        );
                                    }}
                                ></FormField>
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
                                <FormField
                                    control={form.control}
                                    name="privacyPolicy"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Checkbox
                                                    defaultChecked
                                                    className="w-[18px] h-[18px]"
                                                    checked={
                                                        !!formData.privacyPolicy
                                                    }
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleCheckboxChange(
                                                            'privacyPolicy',
                                                            checked as boolean
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                ></FormField>
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
                                    checked={!!formData.marketingConsent}
                                    onCheckedChange={(checked) =>
                                        handleCheckboxChange(
                                            'marketingConsent',
                                            checked as boolean
                                        )
                                    }
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
                                <Button
                                    variant={'outline'}
                                    className="cursor-pointer"
                                >
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
                    </form>
                </Form>
            </Card>
        </>
    );
}

export default SignUpStep1;
