import { useUserStore } from '@/store/useUserStore';

function HomePage() {
    const { user } = useUserStore();

    return (
        <>
            <div className="text-white p-14">
                {user ? <p>{user.email}님 ㅎㅇ</p> : <p>로그인 부탁</p>}
            </div>
        </>
    );
}

export default HomePage;
