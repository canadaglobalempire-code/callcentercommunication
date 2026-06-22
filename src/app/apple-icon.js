import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(135deg, #ff8a3d 0%, #ff6f16 45%, #e0590a 100%)',
        }}
      >
        <svg width="124" height="124" viewBox="0 0 64 64" fill="none">
          <path
            d="M16 40 V36 A16 16 0 0 1 48 36 V40"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <rect x="10" y="37" width="12" height="20" rx="4" fill="white" />
          <rect x="42" y="37" width="12" height="20" rx="4" fill="white" />
          <path
            d="M16 56 Q16 61 22 61 H34"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="37" cy="61" r="3.5" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
