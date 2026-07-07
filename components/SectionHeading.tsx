type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center px-[24px] text-center">
      <p className="text-[12px] leading-[14px] tracking-[2px] text-plum">
        {eyebrow}
      </p>
      <h2 className="mt-[10px] text-[28px] font-bold italic leading-[30px] tracking-[-0.34px] text-ink lg:text-[34px] lg:leading-[34px]">
        {title}
      </h2>
      <p className="mt-[9px] text-[16px] leading-[23.25px] text-muted">
        {subtitle}
      </p>
    </div>
  );
}
