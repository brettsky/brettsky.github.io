// Matrix Rain + Hex Grid Animation
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Configuration
    const fontSize = 14;
    const color = '#00ff41'; // Cyber Green
    const speed = 1; // Drop speed
    
    // Hex Grid Config
    const hexSize = 40;
    const hexColor = '#00330e'; // Dark green, subtle
    let pulseTime = 0;

    // Matrix characters (Katakana + Latin + Numbers)
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリ' +
                  'ヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレ' +
                  'ヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    const charArray = chars.split('');
    let drops = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Reset drops
        const columns = Math.ceil(width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start above screen randomly
        }
    }

    function drawHexagon(x, y, r) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = 2 * Math.PI / 6 * i;
            const x_i = x + r * Math.cos(angle);
            const y_i = y + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x_i, y_i);
            else ctx.lineTo(x_i, y_i);
        }
        ctx.closePath();
        ctx.stroke();
    }

    function drawGrid() {
        const r = hexSize;
        const h = r * Math.sin(Math.PI / 3);
        const w = r * 1.5; // horizontal distance between hex centers
        
        // Pulse effect
        const alpha = 0.1 + 0.05 * Math.sin(pulseTime);
        ctx.strokeStyle = `rgba(0, 255, 65, ${alpha})`; // Using neon green with varying alpha
        ctx.lineWidth = 1;

        // Calculate number of rows and columns needed
        const cols = Math.ceil(width / (r * 3)) + 1;
        const rows = Math.ceil(height / (h * 2)) + 1;

        for (let col = 0; col < cols * 2; col++) {
            for (let row = 0; row < rows * 2; row++) {
                const x = col * w;
                const y = row * 2 * h + (col % 2) * h;
                
                drawHexagon(x, y, r);
            }
        }
        
        pulseTime += 0.02;
    }

    function draw() {
        // Black background with very low opacity to create trail effect
        // This fades out previous frames, including the grid if we drew it there.
        // To make the grid "stable" behind the rain, we re-draw it every frame but we need to be careful.
        // If we draw the fade rect first, it fades everything.
        
        // ctx.fillStyle = 'rgba(13, 17, 23, 0.1)'; // Increased opacity slightly to clear trails faster
        // ctx.fillRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height); // Clear canvas instead of fade for cleaner grid

        // Draw Grid (behind rain)
        drawGrid();

        // Draw Matrix Rain
        /*
        ctx.fillStyle = color;
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Randomly brighter characters
            if (Math.random() > 0.95) {
                ctx.fillStyle = '#fff'; 
            } else {
                ctx.fillStyle = color;
            }

            ctx.fillText(text, x, y);

            // Reset drop to top randomly or when it goes off screen
            if (y > height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i] += speed;
        }
        */
        
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);

    resize();
    draw();
});