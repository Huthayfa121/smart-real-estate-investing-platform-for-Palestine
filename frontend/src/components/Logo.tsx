import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizes[size]} relative`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* PI Letters with buildings */}
          <text
            x="50"
            y="50"
            fontSize="48"
            fontFamily="Playfair Display, serif"
            fontWeight="700"
            fill="url(#goldGradient)"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            PI
          </text>
          
          {/* Building silhouette */}
          <rect x="25" y="60" width="8" height="20" fill="#8B6F47" opacity="0.7" />
          <rect x="35" y="55" width="10" height="25" fill="#8B6F47" opacity="0.7" />
          <rect x="47" y="50" width="6" height="30" fill="#8B6F47" opacity="0.7" />
          
          {/* Tree */}
          <circle cx="15" cy="70" r="5" fill="#C4A962" opacity="0.6" />
          <rect x="14" y="75" width="2" height="8" fill="#8B6F47" />
          
          {/* Upward arrow */}
          <path
            d="M 75 75 Q 85 60, 95 45"
            stroke="#4FC3F7"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
          <polygon points="95,45 92,50 98,50" fill="#4FC3F7" opacity="0.8" />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C4A962" />
              <stop offset="100%" stopColor="#8B6F47" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {size !== 'sm' && (
        <span className="font-heading text-brown font-bold" style={{ 
          fontSize: size === 'lg' ? '1.5rem' : '1.25rem',
          color: '#8B6F47' 
        }}>
          Palestine Invest
        </span>
      )}
    </div>
  );
}

