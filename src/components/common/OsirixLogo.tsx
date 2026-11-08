import React from 'react';

interface OsirixLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  whiteVariant?: boolean;
}

export const OsirixLogo: React.FC<OsirixLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  whiteVariant = false,
}) => {
  const heightMap = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Official OSIRIX Logo graphic from public assets */}
      <img
        src="/assets/aistudio/image_15258e48.png"
        alt="OSIRIX Clinique Médicale Logo"
        className={`${heightMap[size]} w-auto object-contain shrink-0`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback if asset fails to load
          (e.currentTarget as HTMLElement).style.display = 'none';
        }}
      />

      {/* Brand typographic signature */}
      <div className="flex flex-col">
        <span
          className={`font-extrabold tracking-tight leading-none ${
            size === 'sm' ? 'text-base' : size === 'md' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-3xl'
          } ${whiteVariant ? 'text-white' : 'text-[#063d37]'}`}
        >
          OSIRIX
        </span>
        {showSubtitle && (
          <span
            className={`font-semibold tracking-wide uppercase ${
              size === 'sm' ? 'text-[9px]' : size === 'md' ? 'text-[10px]' : 'text-xs'
            } ${whiteVariant ? 'text-amber-300' : 'text-amber-600'}`}
          >
            Clinique médicale
          </span>
        )}
      </div>
    </div>
  );
};
