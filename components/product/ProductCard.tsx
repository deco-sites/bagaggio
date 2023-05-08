import Image from "deco-sites/std/components/Image.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import SendEventButton from "deco-sites/fashion/islands/SendEventButton.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import Button from "../ui/Button.tsx";
import JsonViewer from "https://denopkg.com/deco-cx/live@1.0.0-rc.36/components/JsonViewer.tsx";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([value, urls]) => {
        const url = urls.find((url) => url === product.url) || urls[0];

        return (
          <a href={url}>
            <Avatar
              class="bg-default"
              variant="abbreviation"
              content={value}
              disabled={url === product.url}
            />
          </a>
        );
      })}
    </ul>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    isVariantOf,
    name,
    image: images,
    offers,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);

  return (
    <div
      data-deco="view-product"
      id={`product-card-${productID}`}
      class="w-full group sm:border sm:border-transparent sm:hover:border-[#cccccc] transition-opacity duration-200 rounded px-[7.5px]"
    >
      <a href={url} aria-label="product link">
        <div class="relative w-full">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={280}
            height={280}
            class="rounded w-full group-hover:opacity-0 transition-opacity duration-200"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={280}
            height={280}
            class="rounded w-full opacity-0 absolute group-hover:opacity-100 transition-opacity duration-200 top-0"
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          <div class="absolute top-0 rounded bg-[#292929] text-white h-[40px] w-[40px] mt-[7px] ml-[6px] flex flex-col justify-center">
            <span class="block font-bold text-base text-center">13%</span>
            <span class="block text-sm text-center">OFF</span>
          </div>
        </div>

        <div class="flex flex-col gap-1 py-2 pt-[26px]">
          <div class="h-[40px] sm:h-[56px]">
            <Text class="overflow-ellipsis text-xs sm:text-sm inline-block sm:leading-[16px]">
              {isVariantOf?.name}
            </Text>
          </div>
          <div class="flex flex-col sm:gap-2">
            <div class="flex  gap-2 sm:gap-3 items-center">
              <Text
                class="line-through text-xs sm:text-base font-bold leading-[0.5]"
                variant="list-price"
                tone="subdued"
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text>
              <Text class="text-xs sm:text-[18px] font-bold leading-[0.5]">
                {formatPrice(price, offers!.priceCurrency!)}
              </Text>
            </div>
            <span class="tracking-tight text-gray-800 dark:text-gray-400 text-xs">
              ou 6x vezes de {formatPrice(price! / 6, offers!.priceCurrency!)}
            </span>
            {seller && (
              <div
                class="hidden sm:flex bottom-0 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex-col w-full bg-opacity-10"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <Button
                  as="a"
                  href={product.url}
                  variant="alternative"
                >
                  COMPRAR
                </Button>
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
