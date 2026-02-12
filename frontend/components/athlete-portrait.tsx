import React from 'react'


interface AthletePortraitProps {
  jerseyNumber?: number | string;
  playerImage?: string;
}

export default function AthletePortrait({ jerseyNumber, playerImage }: AthletePortraitProps) {
  return (
    <div className="relative w-full h-full min-h-[200px] min-w-[200px] md:min-h-[300px] md:min-w-[300px] max-w-full max-h-full">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black-to-transparent rounded-2xl blur-3xl" />
      {/* Image container with stylized cut-out */}
      <div className="relative h-full w-full overflow-hidden shadow-2xl ">
        {/* Player image from DB (no dummy fallback) */}
        {playerImage ? (
          <img
            src={playerImage}
            alt="Player portrait"
            className="w-full h-full object-cover object-center rounded-2xl"
            style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          />
        ) : (
          <div className="w-full h-full bg-secondary/40 rounded-2xl" />
        )}
        {/* Jersey Number Overlay */}
        {jerseyNumber && (
          <div className="absolute left-0 w-full flex justify-center items-center pointer-events-none z-20 mt-60" style={{ top: '45%', transform: 'translateY(-50%)' }}>
            <span
              className="font-extrabold text-primary drop-shadow-lg leading-none whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ fontSize: '20vh', lineHeight: 1 }}
            >
              #{jerseyNumber}
            </span>
          </div>
        )}
      </div>
      {/* Black -> transparent gradient overlay at bottom (bottom-to-top) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl pointer-events-none z-10" />
      {/* Glow effect background */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.0) 95%)',
        }}
      />
    </div>
  )
}