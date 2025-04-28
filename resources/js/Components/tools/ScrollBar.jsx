import { useEffect, useState } from "react";

const ScrollbarCustom = () => {
    const [scrollPos, setScrollPos] = useState(0);
    const linesCount = 80; // nombre de lignes affichées (plus = plus fluide)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = scrollY / docHeight;
            setScrollPos(scrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (e) => {
        const { top, height } = e.currentTarget.getBoundingClientRect();
        const clickY = e.clientY - top;
        const clickRatio = clickY / height;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
            top: clickRatio * docHeight,
            behavior: "smooth",
        });
    };

    return (
        <div
            className="fixed top-0 right-0 h-screen w-6 flex flex-col justify-around gap-1 z-50 cursor-pointer"
            onClick={handleClick}
        >
            {Array.from({ length: linesCount }).map((_, index) => {
                const position = index / linesCount;
                const distance = Math.abs(scrollPos - position);
                const scale = Math.max(0, 1 - distance * 20);

                return (
                    <div
                        key={index}
                        className="bg-brand-red transition-all duration-300 origin-right rounded-full"
                        style={{
                            transform: `scaleX(${0.2 + scale})`,
                            height: "2px",
                            opacity: Math.max(0.3, scale),
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default ScrollbarCustom;
