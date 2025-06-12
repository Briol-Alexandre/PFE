export default function ApplicationLogo(props) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210.7 45.8">
            <defs>
                <clipPath id="clippath">
                    <path d="M0 0h210.7v20H0z" style={{ fill: 'none' }} />
                </clipPath>
                <style>
                    {`
                        @font-face {
                            font-family: 'Erstoria';
                            src: url('/fonts/Erstoria.woff2') format('woff2'),
                                 url('/fonts/Erstoria.woff') format('woff');
                            font-weight: normal;
                            font-style: normal;
                        }
                        .cls-3 { fill: #fff; }
                        .logo-text { 
                            font-family: 'Erstoria', sans-serif;
                            fill: #fff;
                        }
                    `}
                </style>
            </defs>
            <g style={{ clipPath: 'url(#clippath)' }}>
                <path
                    d="m60.2 12.7-.4-.6-2-2.3c.4-.9.6-2 .6-3v-.5l.2-.8h-2l.2.8c0 .8 0 1.5-.2 2l-4.8-5.8h5.8l.8.2v-2h-9l.2.8v1l1.5 1.8c-1.8.5-2.9 2.2-2.9 4.4 0 2.7 2 4.9 4.7 4.9 1.8 0 3.2-.8 4.2-2.2l1.2 1.4-.2.6H61l-.8-.7Zm-7.3-.8a3 3 0 0 1-3-3.2c0-1.7.8-2.7 2.4-3.1l3.7 4.5a3.4 3.4 0 0 1-3 1.8Z"
                    className="cls-3"
                />
            </g>
            <text
                transform="translate(29 40.5)"
                className="logo-text"
            >
                <tspan x="0" y="0">M</tspan>
                <tspan x="17.6" y="0">A</tspan>
                <tspan x="32.9" y="0">INTEN</tspan>
                <tspan x="95.1" y="0">A</tspan>
                <tspan x="110.4" y="0">N</tspan>
                <tspan x="126" y="0">C</tspan>
                <tspan x="140.5" y="0">E</tspan>
            </text>
        </svg>
    );
}
