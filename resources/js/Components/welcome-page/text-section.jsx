import rawClock from '../../../img/welcome/li-clock.svg?raw';
import { useEffect, useRef } from 'react';

function toRoman(num) {
    const romans = [
        ['X', 10],
        ['IX', 9],
        ['V', 5],
        ['IIII', 4],
        ['I', 1],
    ];
    let res = '';
    for (const [r, v] of romans) {
        while (num >= v) {
            res += r;
            num -= v;
        }
    }
    return res;
}

export default function TextSection({ title, text, index }) {
    const elementRef = useRef(null);
    const roman = toRoman(index);

    // Remplacer le texte du chiffre romain dans le SVG
    const svgWithRoman = rawClock.replace(
        /<text id="I"[^>]*><tspan[^>]*>[^<]*<\/tspan><\/text>/,
        match => match.replace(/>I</, `>${roman}<`)
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return (
        <li ref={elementRef} className='text-brand even:flex-row-reverse flex justify-around items-end w-full group opacity-0 transition-opacity duration-1000 relative px-10 rg:px-20 max-rg:text-center'>
            <div className="rg:max-w-[50%] md:w-2/3 max-md:w-full self-end pb-8">
                <p className='font-erstoria rg:text-4.5xl md:text-3xl text-2xl underline decoration-brand-red mb-2'>{title}</p>
                <p className='font-light font-just-sans rg:text-2xl md:text-xl text-base'>{text}</p>
            </div>
            <div
                className="group-even:-rotate-[200deg] w-[400px] h-[400px] flex-shrink-0 transform scale-[0.6] group-odd:-translate-y-32 max-rg:hidden"
                dangerouslySetInnerHTML={{ __html: svgWithRoman.replace('viewBox="0 0 287.348 696.989"', 'viewBox="0 0 287.348 696.989" preserveAspectRatio="xMidYMid meet"') }}
            />
        </li>
    );
}
