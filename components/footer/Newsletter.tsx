import Text from "deco-sites/fashion/components/ui/Text.tsx";

function Newsletter() {
  return (
    <div class="flex flex-col sm:flex-col items-center justify-items-center gap-6 sm:gap-20 bg-[#e0e0e0] h-[500px] ">
      <div class="flex flex-col gap-x-0 mt-20 w-5/6">
        <Text
          variant="heading-2"
          tone="default-inverse"
          class="text-black"
        >
          Receba nossas novidades e promoções exclusivas
        </Text>
      </div>
      <form class="flex flex-col items-center gap-2 font-body text-body w-full">
        <Text
          variant="caption"
          tone="default-inverse"
          class="text-black justify-self-start w-5/6"
        >
          Nome
        </Text>
        <input
          class="py-2 px-3 flex-grow bg-footer rounded text-default-inverse border-1 border-default w-5/6"
          placeholder="Insira seu nome"
        />
        <Text
          variant="caption"
          tone="default-inverse"
          class="text-black justify-self-start w-5/6"
        >
          Email
        </Text>
        <input
          class="py-2 px-3 flex-grow bg-footer rounded text-default-inverse border-1 border-default w-5/6"
          placeholder="Insira seu e-mail"
        />
        <button
          class="py-2 px-3 bg-black rounded text-white w-3/6"
          type="bgutton" // prevent form's default behavior
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
