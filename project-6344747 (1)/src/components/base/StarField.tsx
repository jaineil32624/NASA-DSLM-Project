import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number;
  color: { r: number; g: number; b: number };
  pulseIntensity: number;
  sparkleTimer: number;
  isSparkle: boolean;
  isSupernovaCandidate: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  trailParticles: { x: number; y: number; opacity: number; size: number }[];
  color: { r: number; g: number; b: number };
}

interface GlowOrb {
  x: number;
  y: number;
  radius: number;
  color: { r: number; g: number; b: number };
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  driftX: number;
  driftY: number;
}

interface SparkleCluster {
  x: number;
  y: number;
  particles: {
    angle: number;
    distance: number;
    size: number;
    opacity: number;
    speed: number;
  }[];
  life: number;
  maxLife: number;
}

interface Supernova {
  x: number;
  y: number;
  phase: number;
  maxPhase: number;
  maxRadius: number;
  color: { r: number; g: number; b: number };
}

interface WaveEffect {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const glowOrbsRef = useRef<GlowOrb[]>([]);
  const sparkleClustersRef = useRef<SparkleCluster[]>([]);
  const supernovasRef = useRef<Supernova[]>([]);
  const wavesRef = useRef<WaveEffect[]>([]);
  const animationFrameRef = useRef<number>();
  const lastShootingStarRef = useRef<number>(0);
  const lastSupernovaRef = useRef<number>(0);
  const lastWaveRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const themeRef = useRef<string>('dark');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check theme from document attribute
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      themeRef.current = theme;
    };

    // Observer for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    checkTheme();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initGlowOrbs();
    };

    const initGlowOrbs = () => {
      glowOrbsRef.current = [];
      const orbColors = [
        { r: 20, g: 184, b: 166 },
        { r: 6, g: 182, b: 212 },
        { r: 59, g: 130, b: 246 },
        { r: 16, g: 185, b: 129 },
      ];

      for (let i = 0; i < 5; i++) {
        glowOrbsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 200 + 100,
          color: orbColors[Math.floor(Math.random() * orbColors.length)],
          opacity: Math.random() * 0.06 + 0.02,
          pulseSpeed: Math.random() * 0.001 + 0.0005,
          pulsePhase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.15,
          driftY: (Math.random() - 0.5) * 0.15
        });
      }
    };

    const initStars = () => {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 1200);
      
      const starColors = [
        { r: 255, g: 255, b: 255 },
        { r: 255, g: 255, b: 255 },
        { r: 255, g: 255, b: 255 },
        { r: 200, g: 220, b: 255 },
        { r: 255, g: 200, b: 200 },
        { r: 200, g: 255, b: 220 },
        { r: 255, g: 220, b: 180 },
        { r: 180, g: 220, b: 255 },
        { r: 255, g: 180, b: 220 },
        { r: 180, g: 255, b: 220 },
        { r: 220, g: 180, b: 255 },
        { r: 255, g: 255, b: 180 },
      ];
      
      for (let i = 0; i < starCount; i++) {
        const layer = Math.random() < 0.15 ? 1 : Math.random() < 0.4 ? 2 : 3;
        const isSparkle = Math.random() < 0.12;
        const isSupernovaCandidate = Math.random() < 0.005;
        
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: layer === 1 ? Math.random() * 3 + 2 : layer === 2 ? Math.random() * 2 + 1 : Math.random() * 1.2 + 0.5,
          baseOpacity: Math.random() * 0.4 + 0.5,
          twinkleSpeed: Math.random() * 0.006 + 0.002,
          twinklePhase: Math.random() * Math.PI * 2,
          layer,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          pulseIntensity: Math.random() * 0.5 + 0.3,
          sparkleTimer: Math.random() * 500,
          isSparkle,
          isSupernovaCandidate
        });
      }
    };

    const createSparkleCluster = (x: number, y: number) => {
      const particles = [];
      const particleCount = Math.floor(Math.random() * 8) + 6;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          angle: (Math.PI * 2 / particleCount) * i + Math.random() * 0.5,
          distance: 0,
          size: Math.random() * 2 + 1,
          opacity: 1,
          speed: Math.random() * 2.5 + 1
        });
      }
      
      sparkleClustersRef.current.push({
        x,
        y,
        particles,
        life: 0,
        maxLife: 50
      });
    };

    const createSupernova = (x: number, y: number) => {
      const colors = [
        { r: 255, g: 255, b: 255 },
        { r: 255, g: 200, b: 100 },
        { r: 100, g: 200, b: 255 },
        { r: 255, g: 150, b: 200 },
      ];
      
      supernovasRef.current.push({
        x,
        y,
        phase: 0,
        maxPhase: 120,
        maxRadius: Math.random() * 80 + 60,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    const createWave = () => {
      wavesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: Math.random() * 400 + 300,
        opacity: 0.15,
        speed: Math.random() * 2 + 1
      });
    };

    const createShootingStar = () => {
      const startX = Math.random() * canvas.width * 0.9;
      const startY = Math.random() * canvas.height * 0.4;
      
      const colors = [
        { r: 255, g: 255, b: 255 },
        { r: 200, g: 230, b: 255 },
        { r: 255, g: 220, b: 180 },
        { r: 180, g: 255, b: 220 },
      ];
      
      shootingStarsRef.current.push({
        x: startX,
        y: startY,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 15 + 18,
        angle: Math.random() * Math.PI / 6 + Math.PI / 5,
        opacity: 1,
        trailParticles: [],
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const animate = (timestamp: number) => {
      const isLightMode = themeRef.current === 'light';
      
      // Clear with appropriate background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Light mode: show subtle stars and effects
      if (isLightMode) {
        // Light mode glow orbs (subtle)
        glowOrbsRef.current.forEach((orb) => {
          const pulse = Math.sin(timestamp * orb.pulseSpeed + orb.pulsePhase) * 0.5 + 0.5;
          const currentRadius = orb.radius * (0.85 + pulse * 0.3);
          const currentOpacity = orb.opacity * 0.25 * (0.7 + pulse * 0.3);

          const gradient = ctx.createRadialGradient(
            orb.x, orb.y, 0,
            orb.x, orb.y, currentRadius
          );
          gradient.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${currentOpacity})`);
          gradient.addColorStop(0.4, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${currentOpacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();

          orb.x += orb.driftX;
          orb.y += orb.driftY;

          if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
          if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
          if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
          if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;
        });

        // Light mode stars (subtle, darker colors for visibility)
        starsRef.current.forEach((star) => {
          star.sparkleTimer += 1;
          const twinkle = Math.sin(timestamp * star.twinkleSpeed + star.twinklePhase);
          const combinedTwinkle = twinkle * star.pulseIntensity * 0.5;

          let sparkleBoost = 0;
          if (star.isSparkle && star.sparkleTimer > 100) {
            const sparklePhase = (star.sparkleTimer % 200) / 200;
            if (sparklePhase < 0.3) {
              sparkleBoost = Math.sin(sparklePhase / 0.3 * Math.PI) * 0.4;
            }
            if (star.sparkleTimer > 300) {
              star.sparkleTimer = 0;
            }
          }

          const currentOpacity = Math.min(0.4, (star.baseOpacity * 0.3) * (0.5 + combinedTwinkle * 0.5) + sparkleBoost);
          const currentSize = star.size * 0.7 * (0.85 + combinedTwinkle * 0.15 + sparkleBoost * 0.3);

          const drift = star.layer === 1 ? 0.02 : star.layer === 2 ? 0.01 : 0.005;
          star.x += drift;
          if (star.x > canvas.width + 10) star.x = -10;

          // Use darker colors for light mode visibility
          const lightModeColor = {
            r: Math.max(0, star.color.r - 150),
            g: Math.max(0, star.color.g - 150),
            b: Math.max(0, star.color.b - 100)
          };

          // Subtle glow for larger stars
          if (star.layer === 1 || (star.isSparkle && sparkleBoost > 0.2)) {
            const glowSize = currentSize * 3;
            const glowGradient = ctx.createRadialGradient(
              star.x, star.y, 0,
              star.x, star.y, glowSize
            );
            glowGradient.addColorStop(0, `rgba(${lightModeColor.r}, ${lightModeColor.g}, ${lightModeColor.b}, ${currentOpacity * 0.5})`);
            glowGradient.addColorStop(0.5, `rgba(${lightModeColor.r}, ${lightModeColor.g}, ${lightModeColor.b}, ${currentOpacity * 0.2})`);
            glowGradient.addColorStop(1, 'rgba(100, 100, 100, 0)');

            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = `rgba(${lightModeColor.r}, ${lightModeColor.g}, ${lightModeColor.b}, ${currentOpacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        });

        // Light mode shooting stars (less frequent, subtle)
        if (timestamp - lastShootingStarRef.current > 8000 + Math.random() * 10000) {
          createShootingStar();
          lastShootingStarRef.current = timestamp;
        }

        // Render shooting stars in light mode
        shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          star.opacity -= 0.02;

          if (star.opacity <= 0) return false;

          const lightOpacity = star.opacity * 0.4;
          const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            star.x - Math.cos(star.angle) * star.length * 0.7,
            star.y - Math.sin(star.angle) * star.length * 0.7
          );
          gradient.addColorStop(0, `rgba(100, 150, 180, ${lightOpacity})`);
          gradient.addColorStop(0.3, `rgba(80, 120, 150, ${lightOpacity * 0.5})`);
          gradient.addColorStop(1, `rgba(60, 100, 130, 0)`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(
            star.x - Math.cos(star.angle) * star.length * 0.7,
            star.y - Math.sin(star.angle) * star.length * 0.7
          );
          ctx.stroke();

          ctx.fillStyle = `rgba(80, 130, 160, ${lightOpacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
          ctx.fill();

          return true;
        });

        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Dark mode: full star field effects
      // Wave effects
      wavesRef.current = wavesRef.current.filter((wave) => {
        wave.radius += wave.speed;
        wave.opacity = 0.15 * (1 - wave.radius / wave.maxRadius);
        if (wave.radius >= wave.maxRadius) return false;

        ctx.strokeStyle = `rgba(100, 200, 255, ${wave.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();
        return true;
      });

      // Glow orbs
      glowOrbsRef.current.forEach((orb) => {
        const pulse = Math.sin(timestamp * orb.pulseSpeed + orb.pulsePhase) * 0.5 + 0.5;
        const currentRadius = orb.radius * (0.85 + pulse * 0.3);
        const currentOpacity = orb.opacity * (0.7 + pulse * 0.3);

        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, currentRadius
        );
        gradient.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${currentOpacity})`);
        gradient.addColorStop(0.4, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        orb.x += orb.driftX;
        orb.y += orb.driftY;

        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;
      });

      // Stars
      starsRef.current.forEach((star) => {
        star.sparkleTimer += 1;
        const twinkle = Math.sin(timestamp * star.twinkleSpeed + star.twinklePhase);
        const twinkle2 = Math.sin(timestamp * star.twinkleSpeed * 1.5 + star.twinklePhase * 0.7);
        const combinedTwinkle = (twinkle * 0.6 + twinkle2 * 0.4) * star.pulseIntensity;

        let sparkleBoost = 0;
        if (star.isSparkle && star.sparkleTimer > 100) {
          const sparklePhase = (star.sparkleTimer % 200) / 200;
          if (sparklePhase < 0.3) {
            sparkleBoost = Math.sin(sparklePhase / 0.3 * Math.PI) * 0.8;
          }
          if (star.sparkleTimer > 300) {
            star.sparkleTimer = 0;
          }
        }

        const currentOpacity = Math.min(1, star.baseOpacity * (0.5 + combinedTwinkle * 0.5) + sparkleBoost);
        const currentSize = star.size * (0.85 + combinedTwinkle * 0.15 + sparkleBoost * 0.4);

        const dx = star.x - mouseRef.current.x;
        const dy = star.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 120;
        let interactionBoost = 0;
        if (distance < interactionRadius) {
          interactionBoost = (1 - distance / interactionRadius) * 0.5;
        }

        const drift = star.layer === 1 ? 0.02 : star.layer === 2 ? 0.01 : 0.005;
        star.x += drift;
        if (star.x > canvas.width + 10) star.x = -10;

        const finalOpacity = Math.min(1, currentOpacity + interactionBoost);
        const finalSize = currentSize * (1 + interactionBoost * 0.5);

        if (star.layer === 1 || (star.isSparkle && sparkleBoost > 0.3)) {
          const glowSize = finalSize * 4;
          const glowGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowSize
          );
          glowGradient.addColorStop(0, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${finalOpacity * 0.8})`);
          glowGradient.addColorStop(0.3, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${finalOpacity * 0.4})`);
          glowGradient.addColorStop(0.6, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${finalOpacity * 0.15})`);
          glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }

        if (star.layer === 1 && finalOpacity > 0.7) {
          const flareLength = finalSize * 6;
          const flareOpacity = finalOpacity * 0.3;
          
          ctx.strokeStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${flareOpacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(star.x - flareLength, star.y);
          ctx.lineTo(star.x + flareLength, star.y);
          ctx.moveTo(star.x, star.y - flareLength);
          ctx.lineTo(star.x, star.y + flareLength);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, finalSize, 0, Math.PI * 2);
        ctx.fill();

        if (star.layer === 1) {
          ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity * 0.8})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, finalSize * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (timestamp - lastShootingStarRef.current > 2500 + Math.random() * 4000) {
        createShootingStar();
        if (Math.random() < 0.3) setTimeout(() => createShootingStar(), 200);
        if (Math.random() < 0.15) setTimeout(() => createShootingStar(), 400);
        lastShootingStarRef.current = timestamp;
      }

      if (timestamp - lastSupernovaRef.current > 15000 + Math.random() * 20000) {
        const supernovaStar = starsRef.current.find(s => s.isSupernovaCandidate && s.layer === 1);
        if (supernovaStar) {
          createSupernova(supernovaStar.x, supernovaStar.y);
          supernovaStar.isSupernovaCandidate = false;
        }
        lastSupernovaRef.current = timestamp;
      }

      if (timestamp - lastWaveRef.current > 8000 + Math.random() * 10000) {
        createWave();
        lastWaveRef.current = timestamp;
      }

      supernovasRef.current = supernovasRef.current.filter((supernova) => {
        supernova.phase += 1;
        const progress = supernova.phase / supernova.maxPhase;
        if (progress >= 1) return false;

        let currentRadius, currentOpacity;
        if (progress < 0.3) {
          currentRadius = supernova.maxRadius * (progress / 0.3);
          currentOpacity = progress / 0.3;
        } else if (progress < 0.5) {
          currentRadius = supernova.maxRadius;
          currentOpacity = 1;
        } else {
          currentRadius = supernova.maxRadius * (1 + (progress - 0.5) * 0.5);
          currentOpacity = 1 - (progress - 0.5) / 0.5;
        }

        const gradient = ctx.createRadialGradient(
          supernova.x, supernova.y, 0,
          supernova.x, supernova.y, currentRadius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(0.2, `rgba(${supernova.color.r}, ${supernova.color.g}, ${supernova.color.b}, ${currentOpacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(${supernova.color.r}, ${supernova.color.g}, ${supernova.color.b}, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(supernova.x, supernova.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        if (progress < 0.6) {
          const coreOpacity = progress < 0.3 ? progress / 0.3 : (0.6 - progress) / 0.3;
          ctx.fillStyle = `rgba(255, 255, 255, ${coreOpacity})`;
          ctx.beginPath();
          ctx.arc(supernova.x, supernova.y, currentRadius * 0.15, 0, Math.PI * 2);
          ctx.fill();
        }

        if (progress < 0.5) {
          const rayOpacity = progress < 0.3 ? progress / 0.3 : (0.5 - progress) / 0.2;
          const rayLength = currentRadius * 1.5;
          ctx.strokeStyle = `rgba(255, 255, 255, ${rayOpacity * 0.5})`;
          ctx.lineWidth = 2;
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i + progress * Math.PI;
            ctx.beginPath();
            ctx.moveTo(supernova.x, supernova.y);
            ctx.lineTo(
              supernova.x + Math.cos(angle) * rayLength,
              supernova.y + Math.sin(angle) * rayLength
            );
            ctx.stroke();
          }
        }

        return true;
      });

      sparkleClustersRef.current = sparkleClustersRef.current.filter((cluster) => {
        cluster.life += 1;
        const progress = cluster.life / cluster.maxLife;
        if (progress >= 1) return false;

        cluster.particles.forEach((particle) => {
          particle.distance += particle.speed;
          particle.opacity = (1 - progress) * 0.8;
          
          const px = cluster.x + Math.cos(particle.angle) * particle.distance;
          const py = cluster.y + Math.sin(particle.angle) * particle.distance;
          
          const glowGradient = ctx.createRadialGradient(px, py, 0, px, py, particle.size * 3);
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
          glowGradient.addColorStop(0.5, `rgba(200, 230, 255, ${particle.opacity * 0.5})`);
          glowGradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
          
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(px, py, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.beginPath();
          ctx.arc(px, py, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });

        return true;
      });

      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        if (Math.random() < 0.7) {
          star.trailParticles.push({
            x: star.x + (Math.random() - 0.5) * 3,
            y: star.y + (Math.random() - 0.5) * 3,
            opacity: star.opacity * 0.7,
            size: Math.random() * 2 + 0.5
          });
        }

        star.trailParticles = star.trailParticles.filter((particle) => {
          particle.opacity -= 0.03;
          if (particle.opacity <= 0) return false;

          ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${particle.opacity})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          return true;
        });

        if (star.opacity <= 0) return false;

        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.2, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${star.opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        ctx.stroke();

        const headGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 12);
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        headGlow.addColorStop(0.3, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${star.opacity * 0.6})`);
        headGlow.addColorStop(1, 'rgba(100, 180, 255, 0)');
        
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 4, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      if (Math.random() < 0.008) {
        createSparkleCluster(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      observer.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      style={{ 
        background: 'transparent'
      }}
    />
  );
}
