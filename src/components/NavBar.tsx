function NavBar() {
    return (
        <>
            <header className="w-full flex items-center justify-center top-0 z-20 bg-neutral-900 fixed">
                <div className="w-[80%] h-14 flex flex-row justify-between items-center text-sm font-bold">
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
                        <a href="">토픽 인사이트</a>
                        <div className="inline-block h-3 min-h-[1em] w-0.5 bg-neutral-800"></div>
                        <a href="">밍랩</a>
                        <a href="">밍고 스테이지</a>
                        <div className="inline-block h-3 min-h-[1em] w-0.5 bg-neutral-800"></div>
                        <a href="">밍고 스토어</a>
                        <a href="">밍거진</a>
                    </div>
                    {/* 로그인 ~ 우리가 하는 일 */}
                    <div className="flex flex-row items-center gap-4 font-medium">
                        <a href="/login">로그인</a>
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
