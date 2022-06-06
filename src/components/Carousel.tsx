import React from "react"
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react"
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
// And react-slick as our Carousel Lib
import Slider from "react-slick"

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const borderRadius = { base: "base", md: "md", lg: "lg" }
const boxShadow = { base: "base", md: "md", lg: "lg" }

export interface CarouselImage {
  title: string
  src: string
}

export interface CarouselProps {
  images: CarouselImage[]
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null)

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" })
  const side = useBreakpointValue({ base: "30%", md: "40px" })
  //   const height = useBreakpointValue({ base: '400px', md: '600px' });
  const height = "600px"

  return (
    <Box position="relative" height={height} width="full" overflow="hidden">
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="solid"
        position="absolute"
        left={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="solid"
        position="absolute"
        right={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slidr) => setSlider(slidr)}>
        {images.map((image) => (
          <Box
            key={image.src}
            height={height}
            borderRadius={borderRadius}
            boxShadow={boxShadow}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${image.src})`}
            title={image.title}
          >
            {/* This is the block you need to change, to customize the caption */}
            {/* <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={6}
                w={'full'}
                maxW={'lg'}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)">
                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                  {image.title}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color="GrayText">
                  {image.alt}
                </Text>
              </Stack>
            </Container> */}
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default Carousel
