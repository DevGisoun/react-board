import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import { ThemeProvider } from './components/theme-provider';
import NavBar from './components/NavBar';
import TopicsPage from './pages/Topics';
import NewTopicPage from './pages/NewTopic';

function App() {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <NavBar />
                <div className="page">
                    <BrowserRouter>
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
            </ThemeProvider>
        </>
    );
}

export default App;
