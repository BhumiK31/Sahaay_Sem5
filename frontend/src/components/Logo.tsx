import { ImageWithFallback } from './figma/ImageWithFallback';

interface LogoProps {
  /**
   * URL to your logo image. If not provided or fails to load, falls back to text logo.
   * Recommended: SVG format for best quality at all sizes
   * Dimensions: Ideally 150-200px wide, 40-60px tall
   */
  logoUrl?: string;
  
  /**
   * Alt text for the logo image
   */
  alt?: string;
  
  /**
   * Text to display if no logo image is provided or image fails to load
   */
  fallbackText?: string;
  
  /**
   * Size variant for the logo
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function Logo({ 
  logoUrl, 
  alt = "Logo", 
  fallbackText = "Sahaay", 
  size = 'md',
  className = "" 
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  // If no logo URL provided, show text logo
  if (!logoUrl) {
    return (
      <h1 className={`${textSizeClasses[size]} text-blue-600 font-bold ${className}`}>
        {fallbackText}
      </h1>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <ImageWithFallback
        src={logoUrl}
        alt={alt}
        className={`${sizeClasses[size]} w-auto object-contain`}
        onError={() => {
          // If image fails to load, we'll rely on the ImageWithFallback component's built-in fallback
          console.warn('Logo image failed to load, falling back to text logo');
        }}
        style={{
          maxHeight: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px'
        }}
      />
    </div>
  );
}

// Fallback text logo component for when image fails
export function TextLogo({ 
  text = "Sahaay", 
  size = 'md', 
  className = "" 
}: { 
  text?: string; 
  size?: 'sm' | 'md' | 'lg'; 
  className?: string; 
}) {
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <h1 className={`${textSizeClasses[size]} text-blue-600 font-bold ${className}`}>
      {text}
    </h1>
  );
}