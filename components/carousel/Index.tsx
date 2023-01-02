import { FC, useEffect, useState } from "react";
import Item from "./Item";

type MoveSlide = (direction?: "left" | "right") => void;

interface CarouselProps {
  items: Array<JSX.Element>;
  slideInterval?: number;
}

const Index: FC<CarouselProps> = ({ items, slideInterval = 5_000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const moveSlide: MoveSlide = (direction = "right") => {
    if (direction === "right") {
      setCurrentSlide((prev) =>
        currentSlide === items.length - 1 ? 0 : prev + 1
      );
      return;
    }

    setCurrentSlide((prev) =>
      currentSlide === 0 ? items.length - 1 : prev - 1
    );
  };

  const autoSlide = () => {
    moveSlide();
  };

  // auto slide
  useEffect(() => {
    const interval = setInterval(autoSlide, slideInterval);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  return (
    <div
      data-cy="carousel"
      className="relative mx-auto my-4 w-full h-[400px] overflow-hidden"
    >
      <ul className="flex items-center justify-center">
        {items.map((item, index) => (
          <Item
            key={index}
            index={index}
            currentSlide={currentSlide}
            totalSlides={items.length}
          >
            {item}
          </Item>
        ))}
      </ul>
    </div>
  );
};

export default Index;
