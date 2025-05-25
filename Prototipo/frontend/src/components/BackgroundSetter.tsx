'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BackgroundSetterProps {
  images: string[];
}

export default function BackgroundSetter({images}: BackgroundSetterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  
  const efeito = () => {
    setIsVisible(true);
  }

  useEffect(() => {
    setCurrentImage(images[Math.floor(Math.random() * images.length)]);
  }, [])
  
  return (
      <div className={`
          transition-opacity ease-in-out
          duration-[3500ms]
          fixed inset-0 z-[-1]
          bg-cover bg-center bg-no-repeat
          ${isVisible ? 'opacity-100' : 'opacity-0'} 
          `}
          style={currentImage ? { backgroundImage: `url(${currentImage})`}: {}}
      >
        
        {currentImage && <Image
          src={currentImage}
          alt={'Cena de filme aleatoria'}
          fill
          className='invisible'
          onLoad={efeito}
        />}
          <div className={`
              transition-all ease-in-out
              duration-[500ms]
              absolute inset-0
              bg-cover bg-center bg-no-repeat
              bg-blur-md
              `}
              style={currentImage ? { backgroundImage: `url(${currentImage})` }: {}}
          />
      </div>
  );
}