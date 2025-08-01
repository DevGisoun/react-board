import { useAuthUserStore } from '@/store/useAuthUserStore';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { ChevronDown, LogOut, User } from 'lucide-react';
import supabase from '@/lib/supabase';
import { useNavigate } from 'react-router';
import { useUserInfoStore } from '@/store/useUserInfoStore';

function NavBar() {
    const navigate = useNavigate();

    const { authUser, clearAuthUser } = useAuthUserStore();
    const { userInfo } = useUserInfoStore();

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error- sign out: ', error.message);
        } else {
            clearAuthUser(); // Zustand User Store의 유저 정보 초기화.
            navigate('/login');
        }
    };

    return (
        <>
            <header className="w-full flex items-center justify-center top-0 z-20 bg-neutral-900 fixed">
                <div className="w-[1328px] h-14 flex flex-row justify-between items-center text-sm font-bold">
                    {/* 로고 ~ 밍거진 */}
                    <div className="flex flex-row items-center gap-4">
                        <a href="/">
                            <img
                                src="/src/assets/icons/mingo.svg"
                                alt=""
                                className="w-9 h-9"
                            />
                        </a>
                        <a href="">클래스</a>
                        <a href="">배움 노트</a>
                        <div className="inline-block h-3 min-h-[1em] w-0.5 bg-neutral-800"></div>
                        <a href="/topics">토픽 인사이트</a>
                        <div className="inline-block h-3 min-h-[1em] w-0.5 bg-neutral-800"></div>
                        <a href="">밍랩</a>
                        <a href="">밍고 스테이지</a>
                        <div className="inline-block h-3 min-h-[1em] w-0.5 bg-neutral-800"></div>
                        <a href="">밍고 스토어</a>
                        <a href="">밍거진</a>
                    </div>
                    {/* 로그인 ~ 우리가 하는 일 */}
                    <div className="flex flex-row items-center gap-4 font-medium">
                        {authUser && userInfo ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center cursor-pointer bg-transparent hover:bg-transparent dark:hover:bg-transparent"
                                    >
                                        <p>{userInfo.nickname}님</p>
                                        <ChevronDown className="!w-[20px] !h-[20px]" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56"
                                    align="start"
                                >
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col items-start">
                                            <p>{userInfo.nickname}</p>
                                            <p className="text-xs text-neutral-400">
                                                {authUser.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="flex gap-4">
                                            <User />
                                            <p>프로필</p>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="flex gap-4"
                                            onClick={handleSignOut}
                                        >
                                            <LogOut />
                                            <p>로그아웃</p>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <a href="/login">로그인</a>
                        )}
                        <div className="h-3 min-h-[1em] w-0.5 bg-neutral-800"></div>
                        <a href="" className="text-neutral-400">
                            우리가 하는 일
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}

export default NavBar;
