import type { Meta, StoryObj } from "@storybook/react";
import { Carousel, CarouselSlide } from "../components/Carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    effect: {
      control: "select",
      options: ["slide", "fade", "cube", "coverflow", "flip", "cards"],
    },
    direction: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    speed: {
      control: { type: "range", min: 100, max: 2000, step: 100 },
    },
    spaceBetween: {
      control: { type: "range", min: 0, max: 50, step: 5 },
    },
    slidesPerView: {
      control: { type: "number", min: 1, max: 5, step: 0.5 },
    },
    navigation: {
      control: "boolean",
    },
    pagination: {
      control: "boolean",
    },
    autoplay: {
      control: "boolean",
    },
    loop: {
      control: "boolean",
    },
    centeredSlides: {
      control: "boolean",
    },
    keyboard: {
      control: "boolean",
    },
    mousewheel: {
      control: "boolean",
    },
    allowTouchMove: {
      control: "boolean",
    },
    grabCursor: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images
const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
];

export const Default: Story = {
  args: {
    navigation: true,
    pagination: true,
    loop: false,
    autoplay: false,
    effect: "slide",
    direction: "horizontal",
    speed: 300,
    spaceBetween: 0,
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    allowTouchMove: true,
    grabCursor: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <Carousel {...args}>
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const WithNavigation: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel navigation pagination>
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const WithPagination: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel
        navigation
        pagination={{
          enabled: true,
          type: "bullets",
          clickable: true,
          position: "inside",
        }}
      >
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const PaginationOutside: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel
        navigation
        pagination={{
          enabled: true,
          type: "bullets",
          clickable: true,
          position: "outside",
        }}
      >
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const NavigationOutside: Story = {
  render: () => (
    <div className="w-[700px]">
      <Carousel
        navigation={{
          enabled: true,
          position: "outside",
        }}
        pagination
      >
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const PaginationFraction: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel
        navigation
        pagination={{
          enabled: true,
          type: "fraction",
        }}
      >
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const PaginationProgressbar: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel
        navigation
        pagination={{
          enabled: true,
          type: "progressbar",
          clickable: true,
        }}
      >
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const PaginationScrollbar: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel
        navigation
        pagination={{
          enabled: true,
          type: "scrollbar",
          clickable: true,
        }}
      >
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const WithAutoplay: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel
        navigation
        pagination
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
      >
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const Loop: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel navigation pagination loop>
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const EffectFade: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel navigation pagination effect="fade" speed={600}>
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const EffectCube: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel navigation pagination effect="cube" speed={800}>
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const EffectCoverflow: Story = {
  render: () => (
    <div className="w-[800px]">
      <Carousel
        navigation
        pagination
        effect="coverflow"
        speed={600}
        centeredSlides
        slidesPerView={3}
      >
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const EffectFlip: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel navigation pagination effect="flip" speed={800}>
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const EffectCards: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel navigation pagination effect="cards" speed={500}>
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const MultipleSlides: Story = {
  render: () => (
    <div className="w-[800px]">
      <Carousel navigation pagination slidesPerView={3} spaceBetween={20} loop>
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[300px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const CenteredSlides: Story = {
  render: () => (
    <div className="w-[800px]">
      <Carousel
        navigation
        pagination
        slidesPerView={2.5}
        spaceBetween={30}
        centeredSlides
        loop
      >
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[350px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="h-[500px]">
      <Carousel
        navigation
        pagination
        direction="vertical"
        slidesPerView={1}
        className="h-full w-full"
      >
        {images.slice(0, 10).map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="w-[600px]">
      <div className="mb-4 text-sm text-muted-foreground text-center">
        Sử dụng phím mũi tên ← → để điều hướng
      </div>
      <Carousel navigation pagination keyboard>
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const MousewheelNavigation: Story = {
  render: () => (
    <div className="w-[600px]">
      <div className="mb-4 text-sm text-muted-foreground text-center">
        Cuộn chuột để chuyển slide
      </div>
      <Carousel navigation pagination mousewheel>
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="w-[700px]">
      <Carousel
        navigation
        pagination
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
      >
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <div className="relative w-full h-[450px]">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Hình ảnh {index + 1}
                </h3>
                <p className="text-sm opacity-90">
                  Mô tả chi tiết về hình ảnh này, bao gồm các thông tin quan
                  trọng và hấp dẫn để thu hút người xem.
                </p>
              </div>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="w-[900px]">
      <Carousel
        navigation
        pagination={{
          enabled: true,
          type: "fraction",
        }}
        loop
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
      >
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <div className="relative w-full h-[500px] bg-muted rounded-lg overflow-hidden">
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const ProductSlider: Story = {
  render: () => (
    <div className="w-[800px]">
      <Carousel
        navigation
        pagination={{
          enabled: true,
          position: "outside",
        }}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {[...images, ...images].map((src, index) => (
          <CarouselSlide key={index}>
            <div className="bg-muted rounded-lg p-4">
              <img
                src={src}
                alt={`Product ${index + 1}`}
                className="w-full h-[200px] object-cover rounded-md mb-3"
              />
              <h4 className="font-semibold text-sm mb-1">
                Sản phẩm {index + 1}
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Mô tả ngắn gọn
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary">
                  {(Math.random() * 1000 + 100).toFixed(0)}$
                </span>
                <button className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-md hover:opacity-90">
                  Mua
                </button>
              </div>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const WithImageViewer: Story = {
  args: {
    navigation: true,
    pagination: true,
    loop: true,
    autoplay: false,
    effect: "slide",
    direction: "horizontal",
    speed: 300,
    spaceBetween: 10,
    slidesPerView: 1,
    enableImageViewer: true,
    allowTouchMove: false, // Disable drag to test click
  },
  render: (args) => (
    <div className="w-[600px]">
      <p className="mb-4 text-sm text-muted-foreground text-center">
        Click vào ảnh để xem ảnh với ImageViewer
      </p>
      <Carousel {...args}>
        {images.map((src, index) => (
          <CarouselSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};
