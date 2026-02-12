import React from 'react'


interface AthletePortraitProps {
  jerseyNumber?: number | string;
  playerImage?: string;
}

export default function AthletePortrait({ jerseyNumber, playerImage }: AthletePortraitProps) {
  const dummyImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";
  return (
    <div className="relative w-full h-full min-h-[200px] min-w-[200px] md:min-h-[300px] md:min-w-[300px] max-w-full max-h-full">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-3xl" />
      {/* Image container with stylized cut-out */}
      <div className="relative h-full w-full overflow-hidden shadow-2xl ">
        {/* Player image or dummy fallback */}
        <img
          src={typeof playerImage === 'string' && playerImage.length > 0 ? playerImage : dummyImage}
          alt="Player portrait"
          className="w-full h-full object-cover object-center rounded-2xl"
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        />
        {/* Jersey Number Overlay */}
        {jerseyNumber && (
          <div className="absolute left-0 w-full flex justify-center items-center pointer-events-none z-20" style={{ top: '45%', transform: 'translateY(-50%)' }}>
            <span
              className="font-extrabold text-primary drop-shadow-lg leading-none whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ fontSize: '8vh', lineHeight: 1 }}
            >
              #{jerseyNumber}
            </span>
          </div>
        )}
      </div>
      {/* Subtle shadow overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent rounded-b-2xl pointer-events-none" />
    </div>
  )
}