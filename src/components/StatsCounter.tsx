"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  end: number;
  decimals?: number;
  suffix: string;
  prefix?: string;
  label: string;
  icon: string;
}

const STATS: StatItem[] = [
  { end: 600,  suffix: "+",   label: "Avis clients",          icon: "⭐" },
  { end: 4.9,  decimals: 1, suffix: "/5", label: "Note moyenne",  icon: "🏆" },
  { end: 12,   suffix: " pers.", label: "Max par sortie",      icon: "⚓" },
  { end: 5,    suffix: " ans",   label: "D'expérience",        icon: "🌊" },
];

function Counter({ stat }: { stat: StatItem }) {
  const [count, setCount] = useState(0);
  const ref   = useRef<HTMLDivElement>(null);
  const done  = useRef(false);
  const DURATION = 1800;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / DURATION, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * stat.end).toFixed(stat.decimals ?? 0)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.end, stat.decimals]);

  const display = stat.decimals ? count.toFixed(stat.decimals) : Math.round(count);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-3xl mb-2">{stat.icon}</div>
      <div className="font-display font-black text-3xl sm:text-4xl text-tiki-lagon tabular-nums">
        {stat.prefix}{display}{stat.suffix}
      </div>
      <div className="text-slate-500 text-sm mt-1 font-medium">{stat.label}</div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-6 md:px-0">
      {STATS.map((s) => <Counter key={s.label} stat={s} />)}
    </div>
  );
}
