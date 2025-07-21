import { useAuthUserStore } from '@/store/useAuthUserStore';
import { useUserInfoStore } from '@/store/useUserInfoStore';

function HomePage() {
    const { authUser } = useAuthUserStore();
    const { userInfo } = useUserInfoStore();

    return (
        <>
            <div className="container">
                <div className="w-full h-full flex pt-10 px-3">
                    <div className="text-white">
                        {authUser && userInfo ? (
                            <p>{userInfo.nickname}님 ㅎㅇ</p>
                        ) : (
                            <p>로그인 부탁</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
