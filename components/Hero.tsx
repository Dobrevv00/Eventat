const HERO_BLOBS = [
  { left: 115, top: 144, size: 180, color: "rgba(255,220,240,0.75)" },
  { left: 259, top: 481, size: 110, color: "rgba(255,200,120,0.6)" },
  { left: 1134, top: 96, size: 220, color: "rgba(220,180,255,0.65)" },
  { left: 1108, top: 560, size: 130, color: "rgba(255,180,210,0.6)" },
  { left: 605, top: 488, size: 90, color: "rgba(255,235,180,0.5)" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden lg:h-[802px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src="/images/hero-bg.jpg"
          className="absolute left-0 top-0 size-full max-w-none object-cover lg:left-[-13.2%] lg:top-[-1.4%] lg:h-[124%] lg:w-[126.4%]"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(253,246,246,0.784) 0%, rgba(255,235,249,0.833) 60%, rgba(255,255,255,0.931) 100%), radial-gradient(770px 420px at 50% 401px, rgba(253,246,246,0.55), rgba(253,246,246,0))",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[1440px] -translate-x-1/2">
        {HERO_BLOBS.map((blob, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-85 blur-[2px]"
            style={{
              left: blob.left,
              top: blob.top,
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle closest-side, ${blob.color}, transparent)`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center px-[24px] pt-[72px] pb-[72px] lg:pt-[173px] lg:pb-0">
        {/* Decorative EVENTAT / PLAN YOUR EVENT wordmark: exact composite with
            mirrored reflections on desktop, simple stack on mobile */}
        <div className="relative hidden h-[169px] w-[559px] lg:block">
          <img
            alt="EventAT"
            src="/images/hero-swash-3.svg"
            className="absolute left-0 top-0 h-[82px] w-[559px] max-w-none"
          />
          <div className="absolute left-0 top-[80px] h-[63px] w-[559px] scale-y-[-1]">
            <img
              alt=""
              src="/images/hero-swash-2.svg"
              className="absolute inset-x-[-0.72%] inset-y-[-6.42%] size-full max-w-none"
            />
          </div>
          <img
            alt="Plan your event"
            src="/images/hero-swash-4.svg"
            className="absolute left-[1px] top-[108px] h-[35px] w-[553px] max-w-none"
          />
          <div className="absolute left-[1px] top-[142px] h-[27px] w-[553px] scale-y-[-1]">
            <img
              alt=""
              src="/images/hero-swash-1.svg"
              className="absolute inset-x-[-0.72%] inset-y-[-14.72%] size-full max-w-none"
            />
          </div>
        </div>
        <div className="flex w-full max-w-[420px] flex-col items-center gap-[14px] lg:hidden">
          <img
            alt="EventAT"
            src="/images/hero-swash-3.svg"
            className="w-full"
            style={{ aspectRatio: "559 / 82" }}
          />
          <img
            alt="Plan your event"
            src="/images/hero-swash-4.svg"
            className="w-[99%]"
            style={{ aspectRatio: "553 / 35" }}
          />
        </div>

        <div className="mt-[36px] flex flex-col items-center gap-[4.7px] text-center text-[28px] font-bold italic leading-[32px] tracking-[-0.6px] lg:mt-[44px] lg:whitespace-nowrap lg:text-[36.18px] lg:leading-[32.7px] lg:tracking-[-0.91px]">
          <p className="text-ink">Твоето следващо</p>
          <p>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(177.9deg, #7f64ae 0%, #664d92 60%, #ebbfdb 100%)",
              }}
            >
              незабравимо събитие{" "}
            </span>
            <span className="text-ink">започва тук</span>
          </p>
        </div>

        <p className="mt-[12px] w-full max-w-[798px] text-center text-[17px] leading-[24px] text-muted lg:text-[20px] lg:leading-[27.9px]">
          Резервирай проверени изпълнители за сватби, рождени дни и
          корпоративни събития DJ-и, танцьори, певци, фотографи и още, със
          сигурни плащания през платформата.
        </p>

        <div className="mt-[32px] flex w-full flex-col items-center gap-[12px] sm:w-auto sm:flex-row lg:mt-[52px]">
          <a
            href="#form-plan"
            className="flex h-[53px] w-full max-w-[320px] items-center justify-center rounded-[12px] bg-violet text-[15px] font-bold italic text-white transition-colors hover:bg-plum sm:w-[189px]"
          >
            Планирам събитие
          </a>
          <a
            href="#form-offer"
            className="flex h-[53px] w-full max-w-[320px] items-center justify-center rounded-[12px] bg-white text-[15px] font-bold italic text-plum transition-colors hover:bg-[#f3edf8] sm:w-[179px]"
          >
            Предлагам услуги
          </a>
        </div>
      </div>
      <img
        alt=""
        src="/images/hero-bottom-fade.png"
        className="absolute bottom-0 left-0 h-[15px] w-full object-cover"
      />
    </section>
  );
}
