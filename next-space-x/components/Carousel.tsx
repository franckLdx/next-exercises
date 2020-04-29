import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Image, ImageProps } from "@chakra-ui/core";

type Props = ImageProps & {
  images: string[];
}
export const Carousel: React.FC<Props> = ({ images, size }) => {
  const [index, setIndex] = useState(0);
  const nextImage = useCallback(
    () => setIndex(index => index === images.length - 1 ? 0 : index + 1),
    [images]
  );
  const delay = useMemo(() => {
    const min = 2500;
    const max = 4000;
    return Math.floor(Math.random() * (max - min)) + min;
  }, []);
  useEffect(() => {
    const interval = setInterval(nextImage, delay);
    return () => clearInterval(interval);
  }, []);
  return images.length === 0 ? (<></>) : (
    <Image
      src={images[index]}
      size={size}
      objectFit="cover"
      alt="Mission image"
    />
  );
}