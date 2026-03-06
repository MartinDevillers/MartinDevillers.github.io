"use client"

import Image from "next/image"
import { useMemo, useRef, useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export interface CarouselImage {
  title: string
  src: string
}

export interface CarouselProps {
  images: CarouselImage[]
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const total = images.length
  const swipeThreshold = 40

  const goToPrevious = () => setIndex((prev) => (prev - 1 + total) % total)
  const goToNext = () => setIndex((prev) => (prev + 1) % total)

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (total <= 1 || event.touches.length !== 1) {
      return
    }

    touchStartX.current = event.touches[0]?.clientX ?? null
    touchStartY.current = event.touches[0]?.clientY ?? null
  }

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    const startX = touchStartX.current
    const startY = touchStartY.current
    const endTouch = event.changedTouches[0]

    touchStartX.current = null
    touchStartY.current = null

    if (total <= 1 || startX === null || startY === null || !endTouch) {
      return
    }

    const deltaX = endTouch.clientX - startX
    const deltaY = endTouch.clientY - startY

    if (Math.abs(deltaX) <= swipeThreshold || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return
    }

    if (deltaX > 0) {
      goToPrevious()
      return
    }

    goToNext()
  }

  const handleTouchCancel = () => {
    touchStartX.current = null
    touchStartY.current = null
  }

  const image = useMemo(() => images[index], [images, index])
  if (!image || total === 0) {
    return null
  }

  return (
    <section className="my-8">
      <div
        className="relative aspect-[16/10] w-full touch-pan-y overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        <Image src={image.src} alt={image.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <FaArrowLeft className="text-xs" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <FaArrowRight className="text-xs" aria-hidden="true" />
            </button>
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
              {images.map((_, dotIndex) => (
                <span
                  key={`dot-${dotIndex}`}
                  className={dotIndex === index ? "h-2 w-2 rounded-full bg-white/95" : "h-2 w-2 rounded-full bg-white/40"}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Carousel
