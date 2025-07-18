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
import { CREATE_TOPIC_CATEGORY } from '@/constants/topic-category.constant';
import supabase from '@/lib/supabase';
import { useUserStore } from '@/store/useUserStore';
import type { Topic } from '@/types/topic.types';
import type { PartialBlock } from '@blocknote/core';
import { ArrowLeft, Asterisk, Image, ImageOff, Rocket } from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

function NewTopicPage() {
    const navigate = useNavigate();

    const { user } = useUserStore();

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        null
    );
    const [content, setContent] = useState<PartialBlock[] | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const thumbnailInput = useRef<HTMLInputElement>(null);

    // 썸네일 이미지 변경 핸들러
    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    // 썸네일 제거 핸들러
    const handleRemoveThumbnail = () => {
        setThumbnailFile(null);
        setThumbnailPreview(null);
        if (thumbnailInput.current) {
            thumbnailInput.current.value = '';
        }
    };

    // Block Note Editor 내용 변경 핸들러
    const onEditorContentChange = (newContent: PartialBlock[] | null) => {
        setContent(newContent);
    };

    // 토픽 저장 핸들러
    const handleSubmit = async () => {
        if (!title || !category) {
            toast.warning("'제목', '카테고리'는 필수입니다.");
            return;
        }

        setIsSubmitting(true);
        let thumbnailUrl: string | null = null;

        try {
            if (!user) {
                throw new Error(
                    '사용자 정보를 불러올 수 없습니다. 다시 로그인해 주세요.'
                );
            }

            // 썸네일 이미지 파일 시에만 업로드 실행.
            if (thumbnailFile) {
                // 썸네일 이미지 Storage에 업로드

                const fileExt = thumbnailFile.name.split('.').pop();
                const fileName = `${uuidv4()}.${fileExt}`;
                const filePath = `topic-files/${fileName}`; // 추후 'topic-files'를 user의 id로 변경.

                const { error: uploadError } = await supabase.storage
                    .from('topic-files')
                    .upload(filePath, thumbnailFile);

                if (uploadError) {
                    throw uploadError;
                }

                // 2. 업로드된 이미지의 Public URL 가져오기
                const { data: urlData } = supabase.storage
                    .from('topic-files')
                    .getPublicUrl(filePath);

                if (!urlData) {
                    throw new Error('Failed to get public URL for thumbnail.');
                }

                // Storage에 업로드된 파일의 URL 할당.
                thumbnailUrl = urlData.publicUrl;
            }

            // Supabase Database에 게시글 정보 INSERT.
            const topic: Topic = {
                user_id: user.id,
                title,
                category,
                thumbnail: thumbnailUrl,
                content,
            };

            const { error: insertError } = await supabase
                .from('Topics')
                .insert([topic])
                .select();

            if (insertError) {
                throw insertError;
            }

            toast.success('토픽이 성공적으로 발행되었습니다!');
            navigate('/topics');
        } catch (error) {
            console.error('Error publishing topic: ', error);
            toast.error(
                `게시글 발행 중 오류가 발생했습니다: ${
                    error instanceof Error ? error.message : 'Unknown error'
                }`
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // 토픽 임시 저장 핸들러.
    const handleSaveDraft = async () => {};

    return (
        <>
            <div className="container">
                <div className="w-full h-full flex flex-col items-start justify-center gap-6 pt-10 px-3">
                    <Input
                        placeholder="토픽 제목을 입력하세요."
                        maxLength={50}
                        className="!bg-neutral-900 border-none h-16 px-6 !text-lg placeholder:text-lg font-bold"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <hr className="w-full bg-neutral-900" />
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-full sm:max-w-[308px] h-full flex flex-col gap-4 sm:gap-6 lg:w-1/4 lg:min-w-[308px]">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                >
                                    <ArrowLeft />
                                </Button>
                                <Button variant="outline">임시 저장</Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    <Rocket />
                                    {isSubmitting
                                        ? '발행 중...'
                                        : '토픽 발행하기'}
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Asterisk className="text-[#f96859] w-[14px] h-[14px]" />
                                    <Label htmlFor="category">카테고리</Label>
                                </div>
                                <Select
                                    onValueChange={setCategory}
                                    value={category}
                                >
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
                                <div className="flex items-center gap-2">
                                    <Asterisk className="text-[#f96859] w-[14px] h-[14px]" />
                                    <Label htmlFor="category">썸네일</Label>
                                </div>
                                {/* <Skeleton className="w-full aspect-video" /> */}
                                <div className="flex flex-col gap-2 dark:bg-accent/25">
                                    <div className="relative w-full aspect-video rounded-md border dark:bg-input/20">
                                        {thumbnailPreview ? (
                                            <img
                                                src={thumbnailPreview}
                                                className="w-full aspect-video object-cover rounded-md"
                                                alt="thumbnail_preview"
                                            />
                                        ) : (
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="size-9 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                                onClick={() =>
                                                    thumbnailInput.current?.click()
                                                }
                                            >
                                                <Image className="!w-5 !h-5" />
                                            </Button>
                                        )}
                                    </div>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        ref={thumbnailInput}
                                        className="hidden"
                                        onChange={handleThumbnailChange}
                                    />
                                </div>
                            </div>
                            <Separator className="-my-4" />
                            <Button
                                variant="outline"
                                onClick={handleRemoveThumbnail}
                            >
                                <ImageOff />
                                썸네일 제거
                            </Button>
                        </div>
                        {/* 텍스트 편집기 */}
                        <div className="w-[70%]">
                            <TextEditor
                                onEditorContentChange={onEditorContentChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewTopicPage;
