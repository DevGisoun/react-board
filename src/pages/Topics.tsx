import HotTopicCard from '@/components/cards/HotTopicCard';
import CategorySelector from '@/components/common/CategorySelector';
import SkeletonHotTopicCard from '@/components/skeleton/HotTopic';
import SkeletonBasicTopicCard from '@/components/skeleton/NewTopic';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/supabase';
import type { Topic } from '@/types/topic.types';
import { PencilLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function TopicsPage() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [category, setCategory] = useState<string>('');
    const [topics, setTopics] = useState<Topic[]>([]);

    const getTopics = async (): Promise<Topic[]> => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase.from('Topics').select();

            if (error) throw error;

            if (data.length === 0) return [] as Topic[];

            while (data.length < 4) data.push(null);

            return data as Topic[];
        } catch (error) {
            return [] as Topic[];
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getTopics().then((topics) => {
            console.log(topics);
            setTopics(topics);
        });
    }, []);

    return (
        <>
            <div className="container">
                <div className="w-full h-full flex items-start gap-6 relative pt-10 px-3">
                    <CategorySelector
                        category={category}
                        setCategory={setCategory}
                    />
                    <section className="w-full lg:w-[calc(100% - 276px)] flex flex-col gap-12">
                        {/* 핫 토픽 섹션 */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1">
                                    <img
                                        src={'src/assets//gifs/fire.gif'}
                                        alt="img"
                                        className="w-7 h-7"
                                    />
                                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                        핫 토픽
                                    </h4>
                                </div>
                                <p className="text-neutral-400">
                                    지금 가장 주목받는 주제들을 살펴보고, 다양한
                                    관점의 인사이트를 얻어보세요.
                                </p>
                            </div>

                            <div className="flex items-center gap-4 sm:gap-6 overflow-auto">
                                {isLoading
                                    ? Array.from({ length: 4 }).map(() => (
                                          <SkeletonHotTopicCard />
                                      ))
                                    : topics.map((topic) => {
                                          if (!topic)
                                              return <SkeletonHotTopicCard />;

                                          return <HotTopicCard topic={topic} />;
                                      })}
                            </div>
                        </div>
                        {/* 신규 토픽 섹션 */}
                        <section className="w-full flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={'src/assets/gifs/writing-hand.gif'}
                                        alt="img"
                                        className="w-7 h-7"
                                    />
                                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                        NEW 토픽
                                    </h4>
                                </div>
                                <p className="text-neutral-400">
                                    새로운 시선으로, 새로운 이야기를 시작하세요.
                                    지금 바로 당신만의 토픽을 만들어보세요.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <SkeletonBasicTopicCard />
                                <SkeletonBasicTopicCard />
                                <SkeletonBasicTopicCard />
                                <SkeletonBasicTopicCard />
                            </div>
                        </section>
                    </section>
                    <div className="fixed right-1/2 bottom-10 translate-x-1/2 z-20 flex items-center gap-3">
                        <Button
                            variant={'destructive'}
                            className="!py-6 !px-12 text-white text-base font-semibold rounded-full opacity-90 cursor-pointer"
                            onClick={() => navigate('/topics/new-topic')}
                        >
                            <PencilLine />
                            토픽 작성하기
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopicsPage;
