import { useUserStore } from '@/store/useUserStore';

function HomePage() {
    const { user } = useUserStore();

    return (
        <>
            <div className="container">
                <div className="w-full h-full flex pt-10 px-3">
                    <div className="text-white">
                        {user ? <p>{user.email}님 ㅎㅇ</p> : <p>로그인 부탁</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
