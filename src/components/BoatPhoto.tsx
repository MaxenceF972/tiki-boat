"use client";

import { useState } from "react";

export default function BoatPhoto() {
  const [missing, setMissing] = useState(false);

  return (
    <div className="relative h-80 lg:h-[420px] rounded-2xl overflow-hidden border border-tiki-gold/20 bg-tiki-ocean-mid">
      {!missing && (
        <img
          src="/boat.jpg"
          alt="Le Tiki Boat — excursion en bateau en Guadeloupe"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setMissing(true)}
        />
      )}
      {missing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/25 select-none pointer-events-none">
          <span className="text-5xl mb-3">⚓</span>
          <span className="text-sm font-medium">Photo du Tiki Boat</span>
          <span className="text-xs mt-1 text-white/15">/public/boat.jpg</span>
        </div>
      )}
    </div>
  );
}
