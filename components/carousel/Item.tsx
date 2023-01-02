import { FC, PropsWithChildren } from "react";

let itemClasses = {
  base: "absolute top-0 left-0 w-full h-full transition-all duration-1000 z-[400px] bg-[coral] odd:bg-[orange] rounded-md",
  active: "opacity-100 translate-x-0",
  prev: "opacity-0 -translate-x-full",
  next: "opacity-0 translate-x-full",
};

interface ItemProps {
  index: number;
  currentSlide: number;
  totalSlides: number;
}

const Item: FC<PropsWithChildren<ItemProps>> = ({
  index,
  currentSlide,
  totalSlides,
  children,
}) => {
  let slideClass = itemClasses.next;

  if (index === currentSlide) slideClass = itemClasses.active;

  if (
    index === currentSlide - 1 ||
    (currentSlide === 0 && index === totalSlides - 1)
  )
    slideClass = itemClasses.prev;

  return (
    <li
      data-cy="carousel-item"
      id={`carousel__item-${index}`}
      className={`${itemClasses.base} ${slideClass}`}
    >
      {children}
    </li>
  );
};

export default Item;
