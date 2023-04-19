import Image from "deco-sites/std/components/Image.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { Slider } from "deco-sites/fashion/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { useId } from "preact/hooks";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
  label: string;
}

export interface Props {
  highlights?: Highlight[];
  title: string;
}

function Controls() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2 absolute top-[35%] left-3 sm:-left-6 bg-white sm:bg-[#FFFFFF95] rounded-full shadow-xl">
        <Button
          class="h-8 w-8 sm:h-14 sm:w-14"
          variant="icon"
          data-slide="prev"
          aria-label="Previous item"
        >
          <Icon
            class=""
            size={32}
            id="ChevronLeft"
            strokeWidth={1.5}
          />
        </Button>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2 absolute top-[35%] right-3 sm:-right-6 bg-white sm:bg-[#FFFFFF95] rounded-full shadow-xl">
        <Button
          class="h-8 w-8 sm:h-14 sm:w-14"
          variant="icon"
          data-slide="next"
          aria-label="Next item"
        >
          <Icon
            class=""
            size={32}
            id="ChevronRight"
            strokeWidth={1.5}
          />
        </Button>
      </div>
    </>
  );
}

function Highlights({ highlights = [], title }: Props) {
  const id = useId();
  return (
    <Container class="grid grid-cols-1 grid-rows-[138px_1fr]">
      <h2 class="text-center mt-[64px]">
        <Text
          variant="heading-2"
          class="text-[32px] leading-[38px] !font-semibold"
        >
          {title}
        </Text>
      </h2>
      <div id={id} class="relative p-4">
        <Slider
          class=" sm:gap-16 scrollbar-none"
          snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
        >
          {highlights.map(({ href, src, alt, label }) => (
            <a
              href={href}
              class="flex flex-col gap-4 items-center min-w-[232px]"
            >
              <Image
                class=""
                src={src}
                alt={alt}
                width={232}
                height={248}
              />
              <Text variant="body" class="!font-bold text-xl">{label}</Text>
            </a>
          ))}
        </Slider>
        <Controls />
        <SliderControllerJS rootId={id} />
      </div>
    </Container>
  );
}

export default Highlights;
