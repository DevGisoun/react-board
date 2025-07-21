import { useAuthUserStore } from '@/store/useAuthUserStore';

function HomePage() {
    const { authUser } = useAuthUserStore();

    return (
        <>
            <div className="container">
                <div className="w-full h-full flex pt-10 px-3">
                    <div className="text-white">
                        {authUser ? (
                            <p>{authUser.email}님 ㅎㅇ</p>
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
