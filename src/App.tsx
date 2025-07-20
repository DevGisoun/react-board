import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import { ThemeProvider } from './components/theme-provider';
import NavBar from './components/NavBar';
import TopicsPage from './pages/Topics';
import NewTopicPage from './pages/NewTopic';
import { Toaster } from './components/ui/sonner';
import { useUserStore } from './store/useUserStore';
import { useEffect } from 'react';
import supabase from './lib/supabase';

function App() {
    // 유저 인증 상태 관리 case 1: session 통신.
    const { setUser, setAccessToken } = useUserStore();

    useEffect(() => {
        // onAuthStateChange: 사용자의 인증 상태의 모든 변경(로그인, 로그아웃 등) 감지.
        // 앱이 마운트될 때 현재 세션 정보를 확인하여 한 번 실행됩니다.
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_, session) => {
            // 세션 정보가 있으면(로그인) user를, 없으면(로그아웃) null을 Store에 저장하여 로그인 상태 유지 설정.
            console.log(session?.user);
            console.log(session?.access_token);
            setUser(session?.user ?? null);
            setAccessToken(session?.access_token ?? null);
        });

        // 컴포넌트가 언마운트될 때 리스너를 정리(unsubscribe)하여 메모리 누수 방지.
        return () => {
            subscription.unsubscribe();
        };
    }, [setUser, setAccessToken]);

    // 유저 인증 상태 관리 case 2: localStorage 데이터 로드.
    // UserStore에서 즉시 불러와 사용 가능.

    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <div className="page">
                    <BrowserRouter>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/sign-up" element={<SignUpPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/topics" element={<TopicsPage />} />
                            <Route
                                path="/topics/new-topic"
                                element={<NewTopicPage />}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
                <Toaster />
            </ThemeProvider>
        </>
    );
}

export default App;
