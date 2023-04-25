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
  const isOnSale = listPrice !== price;
  const saleDiscount = price?.toString() && listPrice?.toString() && Math.round(
    ((listPrice - price) / listPrice) * 100,
  );

  return (
    <div
      data-deco="view-product"
      id={`product-card-${productID}`}
      class="sm:border sm:border-transparent w-full sm:group hover:border-[#cccccc] duration-300 rounded p-2"
    >
      <a href={url} aria-label="product link" class="relative">
        {isOnSale && (
          <div class="bg-[#292929] rounded flex flex-col w-[45px] h-[45px] absolute top-0 left-0 z-10 items-center justify-center">
            <span class="text-white font-bold text-sm">
              {saleDiscount}%
            </span>
            <span class="text-white text-xs">OFF</span>
          </div>
        )}
        <div class="relative w-full">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={200}
            height={200}
            class="rounded w-full opacity-100 sm:group-hover:opacity-0 transition-opacity duration-100"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={200}
            height={200}
            class="rounded w-full absolute top-0 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-100"
          />
        </div>

        <div class="flex flex-col py-2 leading-none">
          <div class="h-[70px] flex flex-col justify-between">
            <Text
              class="overflow-hidden overflow-ellipsis"
              variant="caption"
            >
              {isVariantOf?.name}
            </Text>
            <div class="flex gap-2 items-center">
              {isOnSale && (
                <Text class="line-through text-[#777] font-bold text-sm">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </Text>
              )}
              <Text class="text-base font-black font-bold">
                {formatPrice(price, offers!.priceCurrency!)}
              </Text>
            </div>
          </div>
          <span class="text-gray-800 dark:text-gray-400 text-xs">
            ou 6x de {formatPrice(price! / 6, offers!.priceCurrency!)}
          </span>
          {seller && (
            <div class="hidden opacity-0 sm:flex sm:group-hover:opacity-100 transition-opacity duration-300 sm:group-hover:visible flex-col gap-2 w-full p-2 bg-opacity-10">
              <Button class="" variant="alternative" as="a" href={product.url}>
                COMPRAR
              </Button>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
