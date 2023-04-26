import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";

import Newsletter from "./Newsletter.tsx";
import type { ComponentChildren } from "preact";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <Text
      variant="caption"
      tone="default-inverse"
      class="text-black md:text-base"
    >
      {isIcon(item)
        ? (
          <div class="border-default border-1 py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={1.5}
              color={"black"}
            />
          </div>
        )
        : (
          <a href={item.href} class="text-[#777] font-bold text-[11px]">
            {item.label}
          </a>
        )}
    </Text>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
}

function Footer({ sections = [] }: Props) {
  return (
    <footer class="w-full bg-footer flex flex-row divide-y-1 divide-default justify-center sm:max-w-[1920px]">
      <div>
        <Container class="w-full md:flex flex-row divide-y-1 divide-default mt-0 mb-0 pt-0 pb-0 h-3/4">
          <div>
            <Newsletter />
          </div>
          <FooterContainer class="md:pt-0">
            <ul class="flex-row ">
              {/* Primeira seção */}
              <li>
                <FooterContainer class="md:pt-0 md:pl-5 h-full">
                  {/* Desktop view */}
                  <ul class="hidden sm:flex flex-row gap-16">
                    {sections.map((section) => (
                      <li>
                        <div>
                          <Text
                            variant="heading-3"
                            tone="default-inverse"
                            class="text-black font-bold md:text-[13px]"
                          >
                            {section.label}
                          </Text>

                          <ul
                            class={`flex ${
                              isIcon(section.children[0])
                                ? "flex-row"
                                : "flex-col"
                            } gap-0 pt-0 flex-wrap`}
                          >
                            {section.children.map((item) => (
                              <li>
                                <SectionItem item={item} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Mobile view */}
                  <ul class="flex flex-col sm:hidden sm:flex-row gap-4">
                    {sections.map((section) => (
                      <li>
                        <Text variant="body" tone="default-inverse">
                          <details>
                            <summary>
                              {section.label}
                            </summary>

                            <ul
                              class={`flex ${
                                isIcon(section.children[0])
                                  ? "flex-row"
                                  : "flex-col"
                              } gap-2 px-2 pt-2`}
                            >
                              {section.children.map((item) => (
                                <li>
                                  <SectionItem item={item} />
                                </li>
                              ))}
                            </ul>
                          </details>
                        </Text>
                      </li>
                    ))}
                  </ul>
                </FooterContainer>
              </li>
              {/* Segunda seção */}
              <li>
                <FooterContainer class="md:pt-0 md:pl-5 h-full">
                  <ul class="hidden sm:flex flex-row gap-16 justify-between">
                    {/* Primeira coluna da 2ª Seção */}
                    <li>
                      <div>
                        <Text
                          variant="heading-3"
                          tone="default-inverse"
                          class="text-black font-bold md:text-[13px]"
                        >
                          ATENDIMENTO
                        </Text>

                        <ul class="md:mt-3">
                          <li>
                            <Text
                              variant="heading-3"
                              tone="default-inverse"
                              class="text-black font-bold md:text-[13px]"
                            >
                              SAC
                            </Text>
                          </li>
                          <li class="flex">
                            <img
                              class="w-4 h-4 mr-2"
                              href="mailto:atendimento@bagaggio.com.br"
                              src="https://www.svgrepo.com/show/14478/email.svg"
                              alt="Email"
                            />
                            <a
                              href="mailto:atendimento@bagaggio.com.br"
                              class="text-[#777] font-bold text-[11px]"
                            >
                              atendimento@bagaggio.com.br
                            </a>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <Text
                              variant="heading-3"
                              tone="default-inverse"
                              class="text-black font-bold md:text-[13px]"
                            >
                              VENDAS CORPORATIVAS
                            </Text>
                          </li>
                          <li class="flex">
                            <img
                              class="w-4 h-4 mr-2"
                              href="mailto:atendimento@bagaggio.com.br"
                              src="https://www.svgrepo.com/show/14478/email.svg"
                              alt="Email"
                            />
                            <a
                              href="mailto:vendas@bagaggio.com.br"
                              class="text-[#777] font-bold text-[11px]"
                            >
                              vendas@bagaggio.com.br
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    {/* Segunda coluna da 2ª Seção */}
                    <li>
                      <div>
                        <a href="https://www.bagaggio.com.br/nossas-lojas">
                          <Text
                            variant="heading-3"
                            tone="default-inverse"
                            class="text-black font-bold md:text-[13px]"
                          >
                            NOSSAS LOJAS
                          </Text>
                          <div class="border border-black rounded-md bg-white mt-2 p-2 w-40 h-9 flex justify-center items-center">
                            <Icon
                              id={"MapPin"}
                              width={20}
                              height={20}
                              strokeWidth={1.5}
                              color={"black"}
                            />

                            <a
                              href="https://www.bagaggio.com.br/nossas-lojas"
                              class="text-black font-bold text-[11px] ml-3"
                            >
                              BUSCAR LOJA
                            </a>
                          </div>
                        </a>
                      </div>
                    </li>
                    {/* Terceira coluna da 2ª Seção */}
                    <li>
                      <div>
                        <a href="https://blog.bagaggio.com.br/">
                          <Text
                            variant="heading-3"
                            tone="default-inverse"
                            class="text-black font-bold md:text-[13px]"
                          >
                            ACESSE NOSSO BLOG
                          </Text>
                          <div class="border border-black rounded-md bg-white mt-2 p-2 w-40 h-9 flex justify-center items-center">
                            <Icon
                              id={"Bars3"}
                              width={20}
                              height={20}
                              strokeWidth={1.5}
                              color={"black"}
                            />
                            <a
                              href="https://blog.bagaggio.com.br/"
                              class="text-black font-bold text-[11px] ml-3"
                            >
                              GUIA BAGAGGIO
                            </a>
                          </div>
                        </a>
                      </div>
                    </li>
                  </ul>
                </FooterContainer>
              </li>
              {/* Terceira seção */}
              <li>
                <FooterContainer class="md:pt-0 md:pl-5 h-full">
                  <ul class="hidden sm:flex flex-row gap-16 justify-between">
                    {/* Primeira coluna da 3ª Seção */}
                    <li>
                      <div>
                        <Text
                          variant="heading-3"
                          tone="default-inverse"
                          class="text-black font-bold md:text-[13px]"
                        >
                          FORMAS DE PAGAMENTO
                        </Text>
                        <ul class="mt-2">
                          <li class="flex justify-between">
                            <img
                              class="w-6 h-6"
                              src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/2.0.8/svg/pagamento/Visa___bf08092e58102ba692532c620f4a2905.svg"
                              alt="Visa"
                            />
                            <img
                              class="w-6 h-6"
                              src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/2.0.8/svg/pagamento/MasterCard___801557d1d55a5f2ff553b9f416de12d1.svg"
                              alt="Mastercard"
                            />
                            <img
                              class="w-6 h-6"
                              src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/2.0.8/svg/pagamento/Elo___78d124a37de61a6c830e57904a42ce94.svg"
                              alt="Elo"
                            />
                            <img
                              class="w-6 h-6"
                              src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/2.0.8/svg/pagamento/American-Express___9d191d51df00932694002c95def04803.svg"
                              alt="American Express"
                            />
                            <img
                              class="w-6 h-6"
                              src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/2.0.8/svg/pagamento/Diners-Club___8df4368065c505a6c9b93bc2391430f0.svg"
                              alt="Diners Club"
                            />
                          </li>
                          <li class="flex justify-start">
                            <img
                              class="w-6 h-6 mr-3"
                              src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/1.0.22/svg/pagamento/Jcb___805cf4998723124c204af59e6f20f3df.svg"
                              alt="Jcb"
                            />
                            <img
                              class="w-6 h-6 mr-3"
                              src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/1.0.22/svg/pagamento/Hipercard___0ff517586c109fbd1c32a02dcac6e559.svg"
                              alt="Hipercard"
                            />
                            <img
                              class="w-6 h-6 mr-3"
                              src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/1.0.22/svg/pagamento/Aura___02d6eca8c7fa67495f61df54d7f20d00.svg"
                              alt="Aura"
                            />
                          </li>
                        </ul>
                      </div>
                    </li>
                    {/* Segunda coluna da 3ª Seção */}
                    <li>
                      <div>
                        <Text
                          variant="heading-3"
                          tone="default-inverse"
                          class="text-black font-bold md:text-[13px]"
                        >
                          NOSSAS REDES SOCIAIS
                        </Text>
                        <div class="flex justify-between mt-2">
                          <img
                            class="w-6 h-6"
                            href="https://www.facebook.com/bagaggio"
                            src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/0.0.1/img/redes-sociais/bag-facebook___33fdc39a3b44a9f278e895a801f11a45.svg"
                            alt="Facebook"
                          />
                          <img
                            class="w-6 h-6"
                            href="https://www.instagram.com/bagaggio/"
                            src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/0.0.1/img/redes-sociais/bag-instagram___00c5cccd38ed741da6a7c9faa9920199.svg"
                            alt="Instagram"
                          />
                          <img
                            class="w-6 h-6"
                            href="https://br.pinterest.com/bagaggio/"
                            src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/0.0.1/img/redes-sociais/bag-pinterest___956d57a6a9b726127f440f91211ed1e5.svg"
                            alt="Pinterest"
                          />
                          <img
                            class="w-6 h-6"
                            href="https://www.tiktok.com/@usebagaggio"
                            src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/0.0.1/img/redes-sociais/bag-tiktok___54b7004b52f17118440daa2fe259876e.svg"
                            alt="Tiktok"
                          />
                          <img
                            class="w-6 h-6"
                            href="https://twitter.com/usebagaggio"
                            src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/0.0.1/img/redes-sociais/bag-twitter___4057cbc34b56e6ead4c9378c124f98db.svg"
                            alt="Twitter"
                          />
                        </div>
                      </div>
                    </li>
                    {/* Terceira coluna da 3ª Seção */}
                    <li>
                      <div>
                        <Text
                          variant="heading-3"
                          tone="default-inverse"
                          class="text-black font-bold md:text-[13px]"
                        >
                          SEGURANÇA
                        </Text>
                        <img
                          class="w-9 h-9 mt-2"
                          src="https://lojabagaggio.vtexassets.com/assets/vtex/assets-builder/lojabagaggio.store-theme/2.1.8/img/seguranca/Security-1___f2e291da9b160cb917fcb1fc2bbccf73.png"
                          alt="Segurança"
                        />
                      </div>
                    </li>
                  </ul>
                </FooterContainer>
              </li>
            </ul>
          </FooterContainer>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
