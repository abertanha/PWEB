'use client';

import { useState, useEffect } from 'react';

interface BackgroundSetterProps {
  images: string[];
}

export default function BackgroundSetter({images}: BackgroundSetterProps) {
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false); 
    const [isVisible, setIsVisible] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (hasMounted && images.length > 0) {
          const randomIndex = Math.floor(Math.random() * images.length);
          const newImage = images[randomIndex];
          
          if(newImage !== currentImage || !currentImage){
            setCurrentImage(newImage);
            setIsLoaded(false);
            setIsVisible(false);
            setIsBlurred(false);
          }
          
        }
      }, [images, hasMounted, currentImage]);

      useEffect(() => {
        if (currentImage && hasMounted && !isLoaded) {
          console.log(`[BS] Preloading: ${currentImage}`);
          const img = new window.Image();
          img.src = currentImage;
          img.onload = () => {
            console.log(`[BS] Loaded: ${currentImage}`);
            setIsLoaded(true);
          };
          img.onerror = () => {
            console.error(`[BS] Error loading image: ${currentImage}`);
            setIsLoaded(false);
          };
        }
      }, [currentImage, hasMounted, isLoaded]);

      useEffect(() => {
        if (isLoaded && hasMounted) {
          console.log('[BS] Image loaded, starting sharp fade-in');
          
          const sharpTimer = setTimeout(() => {
            console.log('[BS] Setting isVisible = true');
            setIsVisible(true);
          }, 500);
    
          const blurTimer = setTimeout(() => {
            console.log('[BS] Setting isBlurred = true');
            setIsBlurred(true);
          }, 100 + 2000); // 0.1s (delay) + 2s (fade-in nítido)
    
          return () => {
            clearTimeout(sharpTimer);
            clearTimeout(blurTimer);
          };
        } else {
          setIsVisible(false);
          setIsBlurred(false);
        }
      }, [isLoaded, hasMounted]);

    if (!hasMounted) return <div className='fixed inset-0 z-[-1] bg-black'/>;

    return (
        <div className={`
            fixed inset-0 z-[-1]
            bg-black
            bg-cover bg-center bg-no-repeat
            transition-opacity ease-in-out
            duration-[2000ms]
            ${isVisible ? 'opacity-100' : 'opacity-0'}
            `}
            style={currentImage ? { backgroundImage: `url(${currentImage})`}: {}}
        >
            <div className={`
                absolute inset-0
                bg-cover bg-center bg-no-repeat
                transition-all ease-in-out
                duration-[500ms]
                ${isBlurred ? 'filter blur-md' : 'filter-none blur-none'}
                `}
                style={currentImage ? { backgroundImage: `url(${currentImage})` }: {}}
            />
        </div>
    );
}