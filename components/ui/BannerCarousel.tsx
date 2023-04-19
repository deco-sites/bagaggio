import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import { animation, keyframes, tw } from "twind/css";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Image text subtitle */
    subTitle: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  return (
    <div class="relative min-w-[100vw] overflow-y-hidden">
      <a href={action?.href ?? "#"} aria-label={action?.label}>
        <Picture class="w-full" preload={lcp}>
          <Source
            media="(max-width: 1024px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={360}
            height={252}
          />
          <Source
            media="(min-width: 1025px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={1669}
            height={452}
          />
          <img
            class="object-contain w-full  "
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
      </a>
    </div>
  );
}

function ProgressiveDots({ images, interval = 0 }: Props) {
  return (
    <>
      <SliderDots class="col-span-full gap-2 z-10 row-start-4">
        {images?.map((_) => (
          <div class="py-6">
            <div
              class={tw`group-disabled:bg-dot border border-dot bg-white w-3 h-3 rounded-full`}
            />
          </div>
        ))}
      </SliderDots>
    </>
  );
}

function Controls() {
  return (
    <>
      <div class="flex items-center justify-center md:justify-end z-10 col-start-1 row-start-2">
        <Button
          class="h-7 w-7 md:(h-14 w-14) !bg-[#FFFFFF95] rounded-full shadow-lg "
          variant="icon"
          data-slide="prev"
          aria-label="Previous item"
        >
          <Icon
            class="text-[#797979] text-xl"
            size={26}
            id="ChevronLeft"
            strokeWidth={2}
          />
        </Button>
      </div>
      <div class="flex items-center justify-center md:!justify-start z-10 col-start-3 row-start-2">
        <Button
          class="h-7 w-7 md:(h-14 w-14) !bg-[#FFFFFF] rounded-full shadow-lg"
          variant="icon"
          data-slide="next"
          aria-label="Next item"
        >
          <Icon
            class="text-[#797979]"
            size={26}
            id="ChevronRight"
            strokeWidth={2}
          />
        </Button>
      </div>
    </>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[180px_1fr_180px] grid-rows-[1fr_48px_1fr_48px]"
    >
      <Slider class="col-span-full row-span-full scrollbar-none gap-6">
        {images?.map((image, index) => (
          <BannerItem image={image} lcp={index === 0 && preload} />
        ))}
      </Slider>

      <Controls />

      <ProgressiveDots images={images} interval={interval} />

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default BannerCarousel;
