function waitForSvgObject() {
    const svgObject = document.getElementById('svg-logo');
    if (!svgObject) {
        setTimeout(waitForSvgObject, 50);
        return;
    }
    svgObject.addEventListener('load', function () {
        const svgDoc = svgObject.contentDocument;
        if (!svgDoc) {
            console.warn('Impossible d\'accéder au contenu SVG');
            return;
        }
        let lastTimestamp = null;
        function updateClock(timestamp) {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const now = new Date();
            const hours = now.getHours() % 12;
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const milliseconds = now.getMilliseconds();
            const hourAngle = (hours * 30) + (minutes * 0.5);
            const minuteAngle = (minutes * 6) + (seconds * 0.1);
            const secondAngle = (seconds * 6) + (milliseconds * 0.006);
            svgDoc.getElementById('hour-hand')?.setAttribute('transform', `rotate(${hourAngle} 601.37 77.16)`);
            svgDoc.getElementById('minute-hand')?.setAttribute('transform', `rotate(${minuteAngle} 601.37 77.16)`);
            svgDoc.getElementById('second-hand')?.setAttribute('transform', `rotate(${secondAngle} 601.37 77.16)`);
            requestAnimationFrame(updateClock);
        }
        requestAnimationFrame(updateClock);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForSvgObject);
} else {
    waitForSvgObject();
}