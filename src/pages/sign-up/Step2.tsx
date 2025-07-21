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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import type { SignUpStep2Props } from '@/types/sign-up.types';
import { Asterisk, ChevronRight, ImageIcon, ImageOff } from 'lucide-react';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
    nickname: z
        .string()
        .min(2, { message: '닉네임은 최소 2자 이상입니다.' })
        .max(12, { error: '닉네임은 최대 12자 입니다.' }),
    industry: z.string('필수 입력'),
    job: z
        .string()
        .min(1, { message: '직업은 최소 1자 입니다.' })
        .max(20, { error: '직업은 최대 20자 입니다.' }),
    country: z.string(),
    region: z.string(),
    introduction: z
        .string()
        .min(1, { error: '자기소개는 최소 1자 입니다.' })
        .max(2000, { error: '자기소개는 최대 2000자 입니다.' }),
});

function SignUpStep2({
    onNext,
    onPrev,
    formData,
    updateFormData,
}: SignUpStep2Props) {
    const imageInput = useRef<HTMLInputElement>(null);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const onClickInput = () => {
        imageInput.current?.click();
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nickname: '',
            job: '',
            introduction: '',
        },
    });

    // 아바타 이미지 변경 핸들러
    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        updateFormData({
            ...formData,
            avatarFile: avatarFile,
            avatarUrl: avatarPreview,
        });
    }, [avatarFile, avatarPreview]);

    const handleNextStep = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        // 필수 필드 검증
        // if (
        //     !formData.nickname.trim() ||
        //     !formData.industry.trim() ||
        //     !formData.job.trim() ||
        //     !formData.country.trim() ||
        //     !formData.region.trim() ||
        //     !formData.introduction.trim()
        //     !formData.nickname.trim()
        // ) {
        //     toast.warning('모든 필드를 입력해주세요.');
        //     return;
        // }
        updateFormData(values);

        onNext();
    };

    return (
        <>
            <Card className="w-full max-w-[700px] gap-3 py-6">
                <CardHeader>
                    <CardTitle className="text-lg">프로필 등록</CardTitle>
                    <CardDescription>
                        본인의 장점과 이력 소개를 통해 강렬하게 어필해보세요!
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleNextStep)}>
                        <CardContent className="flex flex-col gap-4 px-6">
                            <div className="flex flex-row items-center gap-4">
                                {/* 프로필 사진 */}
                                <div className="w-[252px] h-[252px]">
                                    <div className="flex flex-col gap-2 dark:bg-accent/25">
                                        <div className="relative w-full aspect-square rounded-md border dark:bg-neutral-800">
                                            {avatarPreview ? (
                                                <img
                                                    src={avatarPreview}
                                                    className="w-full aspect-square object-cover rounded-md"
                                                    alt="avatar_preview"
                                                />
                                            ) : (
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    size="icon"
                                                    className="size-9 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                                    onClick={onClickInput}
                                                >
                                                    <ImageIcon className="!w-5 !h-5" />
                                                </Button>
                                            )}
                                        </div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            ref={imageInput}
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex-1 grid gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label className="flex items-center">
                                            <Asterisk
                                                size={14}
                                                className="text-red-400"
                                            />
                                            <p className="text-neutral-500">
                                                닉네임
                                            </p>
                                        </Label>
                                        <FormField
                                            control={form.control}
                                            name="nickname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="닉네임을 입력하세요."
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="flex items-center">
                                                <Asterisk
                                                    size={14}
                                                    className="text-red-400"
                                                />
                                                <p className="text-neutral-500">
                                                    업종
                                                </p>
                                            </Label>
                                            <FormField
                                                control={form.control}
                                                name="industry"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="선택" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="STUDENT">
                                                                        학생
                                                                    </SelectItem>
                                                                    <SelectItem value="FREELANCER">
                                                                        프리랜서
                                                                    </SelectItem>
                                                                    <SelectItem value="JOB_SEEKER">
                                                                        취업준비생
                                                                    </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="flex items-center">
                                                <Asterisk
                                                    size={14}
                                                    className="text-red-400"
                                                />
                                                <p className="text-neutral-500">
                                                    직업
                                                </p>
                                            </Label>
                                            <FormField
                                                control={form.control}
                                                name="job"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="직업을 입력하세요."
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="flex items-center">
                                            <Asterisk
                                                size={14}
                                                className="text-red-400"
                                            />
                                            <p className="text-neutral-500">
                                                거주지
                                            </p>
                                        </Label>
                                        <div className="w-full grid grid-cols-2 items-center gap-4">
                                            <FormField
                                                control={form.control}
                                                name="country"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="선택" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="KO">
                                                                        대한민국
                                                                    </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="region"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="선택" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="INCHEON">
                                                                        인천
                                                                    </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="icon"
                                            className="size-9"
                                        >
                                            <ImageOff className="text-red-400" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={'secondary'}
                                        >
                                            <p className="text-white">
                                                기본 이미지로 설정
                                            </p>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="flex items-center">
                                    <Asterisk
                                        size={14}
                                        className="text-red-400"
                                    />
                                    <p className="text-neutral-500">자기소개</p>
                                </Label>
                                <FormField
                                    control={form.control}
                                    name="introduction"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    className="h-60 resize-none"
                                                    maxLength={2000}
                                                    placeholder="나를 솔직하게, 그리고 강렬하게 표현할 수 있는 나만의 강력한 소개글은 필수! (2,000자 이내)"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 pt-4 px-6">
                            <div className="w-full grid grid-cols-2 gap-4">
                                <Button
                                    type="button"
                                    variant={'outline'}
                                    className="cursor-pointer"
                                    onClick={onPrev}
                                >
                                    이전
                                </Button>
                                <Button
                                    type="submit"
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

export default SignUpStep2;
