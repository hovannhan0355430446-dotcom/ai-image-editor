
import { useState, useRef, useEffect, useCallback } from 'react';
import type { FilterState, TransformState } from '../types';

const INITIAL_FILTERS: FilterState = {
  blur: 0,
  grayscale: 0,
  brightness: 100,
  contrast: 100,
};

const INITIAL_TRANSFORMS: TransformState = {
  rotate: 0,
  flipH: false,
  flipV: false,
};

export const useImageEditor = (imageFile: File | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [transforms, setTransforms] = useState<TransformState>(INITIAL_TRANSFORMS);

  const drawImage = useCallback(() => {
    if (!image || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;
    
    const { width, height } = image;
    const { rotate, flipH, flipV } = transforms;

    const rotated = rotate === 90 || rotate === 270;
    canvas.width = rotated ? height : width;
    canvas.height = rotated ? width : height;

    ctx.filter = `blur(${filters.blur}px) grayscale(${filters.grayscale}%) brightness(${filters.brightness}%) contrast(${filters.contrast}%)`;
    
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotate * Math.PI / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.restore();

  }, [filters, transforms, image]);

  // Effect for loading a new image from a file
  useEffect(() => {
    if (!imageFile) {
      setImage(null);
      return;
    }

    setIsProcessing(true);
    setFilters(INITIAL_FILTERS);
    setTransforms(INITIAL_TRANSFORMS);
    setImage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  // Effect for drawing/redrawing the image on the canvas
  useEffect(() => {
    if (!image) {
      // Set processing state based on whether a file is selected
      setIsProcessing(!!imageFile);
      return;
    }
    
    setIsProcessing(true);

    const animationFrameId = requestAnimationFrame(() => {
        drawImage();
        setTimeout(() => setIsProcessing(false), 50);
    });

    return () => {
        cancelAnimationFrame(animationFrameId);
    }
  }, [image, drawImage, imageFile]);


  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);
  
  const updateTransform = useCallback(<K extends keyof TransformState>(
    key: K, 
    value: TransformState[K] | ((prev: TransformState[K]) => TransformState[K])
  ) => {
      setTransforms(prev => {
          const prevValue = prev[key];
          const newValue = typeof value === 'function' ? (value as Function)(prevValue) : value;
          return { ...prev, [key]: newValue };
      });
  }, []);

  const reset = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setTransforms(INITIAL_TRANSFORMS);
  }, []);

  const downloadImage = useCallback((format: 'png' | 'jpeg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `edited-image.${format}`;
    link.href = canvas.toDataURL(`image/${format}`, 1.0);
    link.click();
  }, []);

  return {
    canvasRef,
    isProcessing,
    filters,
    transforms,
    updateFilter,
    updateTransform,
    reset,
    downloadImage,
  };
};
