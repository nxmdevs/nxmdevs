// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('translate-x-full');
    
    // Add glitch effect to menu items when opening
    if (!menu.classList.contains('translate-x-full')) {
        const links = menu.querySelectorAll('a');
        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.textShadow = '2px 0 #ff006e, -2px 0 #00f5ff';
                setTimeout(() => {
                    link.style.textShadow = 'none';
                }, 200);
            }, index * 100);
        });
    }
}

// Close mobile menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        document.getElementById('mobileMenu').classList.add('translate-x-full');
    }
});

// GSAP Animations
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(bar, {
                    width: width,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });

    // Animate cards on scroll
    const cards = document.querySelectorAll('.cyber-card');
    cards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Animate stats counter
    const stats = document.querySelectorAll('.stat-counter');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(stat, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Add glitch effect before scrolling
            this.style.textShadow = '2px 0 #ff006e, -2px 0 #00f5ff';
            setTimeout(() => {
                this.style.textShadow = 'none';
            }, 200);
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Random Glitch Effect on Title
function randomGlitch() {
    const glitch = document.querySelector('.glitch-cyber');
    if (glitch) {
        glitch.style.animation = 'none';
        glitch.offsetHeight; // Trigger reflow
        glitch.style.animation = '';
    }
}

// Trigger glitch every 5-10 seconds randomly
setInterval(() => {
    const randomDelay = Math.random() * 5000 + 5000;
    setTimeout(randomGlitch, randomDelay);
}, 10000);

// Parallax Effect on Mouse Move
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const floatingElements = document.querySelectorAll('.float');
    floatingElements.forEach(el => {
        const speed = 20;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        el.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Typewriter Effect for Terminal
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter on load
window.addEventListener('load', () => {
    // Achievement popup
    setTimeout(() => {
        showAchievement();
    }, 2000);
});

// Achievement Popup
function showAchievement() {
    const achievement = document.createElement('div');
    achievement.className = 'fixed bottom-8 right-8 z-50 cyber-card p-4 rounded-lg border-yellow-400/50 transform translate-x-full transition-transform duration-500';
    achievement.innerHTML = `
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center text-2xl text-yellow-400">
                <i class="fas fa-trophy"></i>
            </div>
            <div>
                <div class="font-cyber text-xs text-yellow-400 mb-1">ACHIEVEMENT UNLOCKED</div>
                <div class="font-bold text-sm">Found a 5+ Server Dev!</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(achievement);
    
    // Slide in
    setTimeout(() => {
        achievement.classList.remove('translate-x-full');
    }, 100);
    
    // Slide out after 4 seconds
    setTimeout(() => {
        achievement.classList.add('translate-x-full');
        setTimeout(() => {
            achievement.remove();
        }, 500);
    }, 4000);
}

// Console Easter Egg
console.log('%c SYSTEM ONLINE ', 'background: #00f5ff; color: #000; font-size: 20px; font-weight: bold;');
console.log('%c 15 Year Old Developer | 5+ Servers | Plugin Dev ', 'color: #ff006e; font-size: 14px;');
console.log('%c > Looking for staff positions or commissions? Contact me! ', 'color: #bc13fe;');

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'D' to open Discord
    if (e.key === 'd' || e.key === 'D') {
        window.open('https://discord.gg/YOURINVITE', '_blank');
    }
    // Press 'G' to open GitHub
    if (e.key === 'g' || e.key === 'G') {
        window.open('https://github.com/yourname', '_blank');
    }
});

// Intersection Observer for lazy animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.cyber-card').forEach(card => {
    observer.observe(card);
});