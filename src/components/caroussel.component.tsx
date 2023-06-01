"use client"

import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';

interface Props {
    children: string | JSX.Element | JSX.Element[]
}

const CardCaroussel = ({ children }: Props) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={6}
        itemsToScroll={1}
        speed={400}
        easing="linear"
      >
        {children}
      </ReactSimplyCarousel>
    </div>
  );
}

export default CardCaroussel;