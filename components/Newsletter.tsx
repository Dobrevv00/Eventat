export default function Newsletter() {
  return (
    <section className="border-y border-line bg-gradient-to-b from-[#fdf6f6] to-[#f7eef1] py-[37px] lg:h-[158px] lg:pb-0">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[24px] px-[24px] lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full max-w-[425px] lg:pt-[7px]">
          <p className="text-[22px] leading-[26px] tracking-[-0.24px] text-ink lg:text-[24px] lg:leading-[24px]">
            Идеи за следващото ти събитие
          </p>
          <p className="mt-[4px] text-[14px] leading-[21.7px] text-muted lg:mt-px">
            Кратък месечен бюлетин - тенденции, реални примери и съвети.
          </p>
        </div>
        <div className="w-full lg:w-auto lg:pt-[7px]">
          <form className="flex w-full flex-col gap-[10px] sm:flex-row">
            <input
              type="email"
              placeholder="Имейл адрес"
              className="h-[49px] w-full rounded-[12px] border border-line bg-white px-[19px] font-serif text-[15px] text-ink placeholder:text-[#757575] transition-colors focus:border-lilac focus:outline-none sm:flex-1 lg:w-[379px] lg:flex-none"
            />
            <button
              type="submit"
              className="h-[49px] w-full rounded-[12px] bg-violet font-sans text-[14px] font-semibold text-white transition-colors hover:bg-plum sm:w-[135px]"
            >
              Абонирай се
            </button>
          </form>
          <p className="mt-[8px] text-[12px] leading-[18.6px] text-muted lg:mt-[5px] lg:pl-[7px]">
            Без спам. Отпиши се по всяко време.
          </p>
        </div>
      </div>
    </section>
  );
}
