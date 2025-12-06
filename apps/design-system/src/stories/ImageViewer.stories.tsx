import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ImageViewer } from "../components/ImageViewer";

const meta = {
  title: "Components/ImageViewer",
  component: ImageViewer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    drag: {
      control: "boolean",
      description: "Enable drag to move image",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    rotatable: {
      control: "boolean",
      description: "Enable rotation",
    },
    scalable: {
      control: "boolean",
      description: "Enable scaling/zoom",
    },
    downloadable: {
      control: "boolean",
      description: "Enable download",
    },
    noToolbar: {
      control: "boolean",
      description: "Hide toolbar",
    },
    noNavbar: {
      control: "boolean",
      description: "Hide image counter navbar",
    },
  },
} satisfies Meta<typeof ImageViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images
const sampleImages = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    alt: "Mountain landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
    alt: "Forest view",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
    alt: "Nature scene",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200",
    alt: "Sunset sky",
  },
];

const BasicDemo = (props: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div
        className="relative cursor-pointer inline-block"
        onClick={() => setVisible(true)}
      >
        <img
          src={sampleImages[0].src}
          alt={sampleImages[0].alt}
          className="w-80 h-60 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center rounded-lg pointer-events-none">
          <span className="text-white opacity-0 hover:opacity-100 transition-opacity">
            Click to preview
          </span>
        </div>
      </div>
      <ImageViewer
        {...props}
        images={sampleImages}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </div>
  );
};

export const Basic: Story = {
  args: {
    images: sampleImages,
    drag: false,
    rotatable: true,
    scalable: true,
    downloadable: false,
  },
  render: (args) => <BasicDemo {...args} />,
};

const SingleImageDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div
        className="relative cursor-pointer inline-block"
        onClick={() => setVisible(true)}
      >
        <img
          src={sampleImages[0].src}
          alt={sampleImages[0].alt}
          className="w-80 h-60 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center rounded-lg pointer-events-none">
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Click to preview
          </span>
        </div>
      </div>
      <ImageViewer
        images={[sampleImages[0]]}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </div>
  );
};

export const SingleImage: Story = {
  args: {
    images: [sampleImages[0]],
  },
  render: () => <SingleImageDemo />,
};

const ImageGridDemo = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        {sampleImages.map((img, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => {
              setCurrentIndex(index);
              setVisible(true);
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
              <span className="text-white text-sm">Click to preview</span>
            </div>
          </div>
        ))}
      </div>

      <ImageViewer
        images={sampleImages}
        visible={visible}
        onClose={() => setVisible(false)}
        activeIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
};

export const ImageGrid: Story = {
  args: {
    images: sampleImages,
  },
  render: () => <ImageGridDemo />,
};

const CustomConfigDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div
        className="relative cursor-pointer inline-block group"
        onClick={() => setVisible(true)}
      >
        <img
          src={sampleImages[1].src}
          alt={sampleImages[1].alt}
          className="w-80 h-60 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center rounded-lg pointer-events-none">
          <div className="bg-black/70 px-4 py-2 rounded-lg">
            <span className="text-white text-sm font-medium">
              Custom Config (Rotatable, Scalable, Downloadable)
            </span>
          </div>
        </div>
      </div>
      <ImageViewer
        images={sampleImages}
        visible={visible}
        onClose={() => setVisible(false)}
        rotatable={true}
        scalable={true}
        downloadable={true}
        minScale={0.5}
        maxScale={10}
        zoomSpeed={0.2}
      />
    </div>
  );
};

export const CustomConfig: Story = {
  args: {
    images: sampleImages,
  },
  render: () => <CustomConfigDemo />,
};

const WithoutToolbarDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div
        className="relative cursor-pointer inline-block group"
        onClick={() => setVisible(true)}
      >
        <img
          src={sampleImages[2].src}
          alt={sampleImages[2].alt}
          className="w-80 h-60 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center rounded-lg pointer-events-none">
          <div className="bg-black/70 px-4 py-2 rounded-lg">
            <span className="text-white text-sm font-medium">
              Without Toolbar (No zoom/rotate controls)
            </span>
          </div>
        </div>
      </div>
      <ImageViewer
        images={sampleImages}
        visible={visible}
        onClose={() => setVisible(false)}
        noToolbar={true}
      />
    </div>
  );
};

export const WithoutToolbar: Story = {
  args: {
    images: sampleImages,
  },
  render: () => <WithoutToolbarDemo />,
};

const WithoutNavbarDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div
        className="relative cursor-pointer inline-block group"
        onClick={() => setVisible(true)}
      >
        <img
          src={sampleImages[3].src}
          alt={sampleImages[3].alt}
          className="w-80 h-60 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center rounded-lg pointer-events-none">
          <div className="bg-black/70 px-4 py-2 rounded-lg">
            <span className="text-white text-sm font-medium">
              Without Navbar (No image counter)
            </span>
          </div>
        </div>
      </div>
      <ImageViewer
        images={sampleImages}
        visible={visible}
        onClose={() => setVisible(false)}
        noNavbar={true}
      />
    </div>
  );
};

export const WithoutNavbar: Story = {
  args: {
    images: sampleImages,
  },
  render: () => <WithoutNavbarDemo />,
};

const GalleryLayoutDemo = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      alt: "Mountain 1",
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
      alt: "Forest 1",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
      alt: "Nature 1",
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200",
      alt: "Sunset 1",
    },
    {
      src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200",
      alt: "Mountain 2",
    },
    {
      src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200",
      alt: "Forest 2",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 max-w-3xl">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => {
              setCurrentIndex(index);
              setVisible(true);
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-40 object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ImageViewer
        images={galleryImages}
        visible={visible}
        onClose={() => setVisible(false)}
        activeIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        downloadable={true}
      />
    </div>
  );
};

export const GalleryLayout: Story = {
  args: {
    images: sampleImages,
  },
  render: () => <GalleryLayoutDemo />,
};
