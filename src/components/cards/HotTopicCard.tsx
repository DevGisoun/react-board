import type { Topic } from '@/types/topic.types';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { BadgeCheck, MousePointerClick } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import supabase from '@/lib/supabase';

export interface HotTopicCardProps {
    topic: Topic;
}

function HotTopicCard({ topic }: HotTopicCardProps) {
    // 작성자의 프로필 사진으로 변경 필요.
    const avatar: string =
        'https://avatars.githubusercontent.com/u/120293195?s=400&u=659094b2fc6b8bf90800987f555f77a3cf879a1d&v=4';

    const [author, setAuthor] = useState<User>();

    // const getAuthor = async (userId: string): Promise<any> => {
    //     const user = await supabase.auth.admin.getUserById(userId);
    //     console.log(user);
    //     return user;
    // };

    // useEffect(() => {
    //     console.log(topic);
    //     getAuthor(topic.user_id).then((user) => {
    //         console.log(user);
    //     });
    // }, []);

    return (
        <>
            <div className="w-full min-w-58 flex flex-col gap-2 cursor-pointer">
                <Card className="w-full h-72 relative rounded-xl">
                    {topic.thumbnail ? (
                        <img
                            src={topic.thumbnail}
                            className="w-full h-full object-cover absolute top-0 left-0  rounded-xl"
                            alt=""
                        />
                    ) : (
                        <></>
                    )}
                    <div className="w-full absolute bottom-0 z-10 flex items-end justify-between p-4 gap-2">
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight line-clamp-3 text-ellipsis">
                            {topic.title}
                        </h3>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="size-9"
                        >
                            <MousePointerClick />
                        </Button>
                    </div>
                    <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-black/100 via-black/50 to-transparent rounded-b-xl"></div>
                </Card>
                <div className="w-full flex items-center gap-2">
                    <div className="relative flex items-center">
                        <Avatar className="w-9 h-9 dark:bg-input/50">
                            <AvatarImage
                                src={avatar}
                                className="object-cover"
                            />
                        </Avatar>
                        <BadgeCheck className="absolute bottom-0 right-0 w-[14px] h-[14px] text-foreground" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-[2px] text-muted-foreground">
                            <p className="text-xs">작성자 업종</p>
                            <p className="text-xs">작성자 직업</p>
                        </div>
                        <small className="text-sm font-medium">작성자명</small>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HotTopicCard;
