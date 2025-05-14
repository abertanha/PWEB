'use client';

import { useState, useEffect } from 'react';

interface BackgroundSetterProps {
  images: string[];
}

export default function BackgroundSetter({images}: BackgroundSetterProps) {
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        if(images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            setBackgroundImage(images[randomIndex]);
        }
    }, [images]);

    if (!backgroundImage){
        return null;
    }

    return (
        <div className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat filter blur-md"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        />
    );
}