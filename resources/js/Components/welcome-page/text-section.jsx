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
        <li ref={elementRef} className='text-brand even:flex-row-reverse flex justify-around items-end w-full group opacity-0 transition-opacity duration-1000 relative px-20'>
            <div className="max-w-[50%] self-end pb-8">
                <p className='font-erstoria text-4.5xl underline decoration-brand-red'>{title}</p>
                <p className='font-light font-just-sans text-2xl'>{text}</p>
            </div>
            <div
                className="group-even:-rotate-[200deg] w-[400px] h-[400px] flex-shrink-0 transform scale-[0.6] group-odd:-translate-y-32"
                dangerouslySetInnerHTML={{ __html: svgWithRoman.replace('viewBox="0 0 287.348 696.989"', 'viewBox="0 0 287.348 696.989" preserveAspectRatio="xMidYMid meet"') }}
            />
        </li>
    );
}
