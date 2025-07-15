import TextEditor from '@/components/common/TextEditor';
import { Button } from '@/components/ui/button';
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
import { Skeleton } from '@/components/ui/skeleton';
import { CREATE_TOPIC_CATEGORY } from '@/constants/topic-category.constant';
import { ArrowLeft, Asterisk, ImageOff, Rocket } from 'lucide-react';

function NewTopicPage() {
    return (
        <>
            <div className="container">
                <div className="w-full h-full flex flex-col items-start justify-center gap-6 pt-10 px-3">
                    <Input
                        placeholder="토픽 제목을 입력하세요."
                        maxLength={50}
                        className="!bg-neutral-900 border-none h-16 px-6 !text-lg placeholder:text-lg font-bold"
                    />
                    <hr className="w-full bg-neutral-900" />
                    <div className="flex flex-row justify-between">
                        <div className="w-full sm:max-w-[308px] h-full flex flex-col gap-4 sm:gap-6 lg:w-1/4 lg:min-w-[308px]">
                            <div className="flex items-center gap-2">
                                <Button variant="outline">
                                    <ArrowLeft />
                                </Button>
                                <Button variant="outline">임시 저장</Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                >
                                    <Rocket />
                                    토픽 발행하기
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center">
                                    <Asterisk className="text-[#f96859] w-[14px] h-[14px]" />
                                    <Label htmlFor="category">카테고리</Label>
                                </div>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="토픽 주제 선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                토픽 Topic
                                            </SelectLabel>
                                            {CREATE_TOPIC_CATEGORY.map(
                                                (item) => {
                                                    return (
                                                        <SelectItem
                                                            key={item.id}
                                                            value={
                                                                item.category
                                                            }
                                                        >
                                                            {item.label}
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center">
                                    <Asterisk className="text-[#f96859] w-[14px] h-[14px]" />
                                    <Label htmlFor="category">카테고리</Label>
                                </div>
                                <Skeleton className="w-full aspect-video" />
                            </div>
                            <Separator className="-my-4" />
                            <Button variant="outline">
                                <ImageOff />
                                썸네일 제거
                            </Button>
                        </div>
                        {/* 텍스트 편집기 */}
                        <div className="w-[70%]">
                            <TextEditor />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewTopicPage;
