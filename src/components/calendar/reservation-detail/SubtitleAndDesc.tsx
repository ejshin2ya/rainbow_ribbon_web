interface Props {
  subtitle?: string;
  desc?: string;
  descClassName?: string;
}

export const SubtitleAndDesc = function ({
  desc,
  subtitle,
  descClassName,
}: Props) {
  return (
    <div className="w-full flex flex-row justify-between">
      {subtitle && (
        <div className="font-medium text-[12px] leading-[18px] text-reborn-gray4 flex-shrink-0">
          {subtitle}
        </div>
      )}
      <div
        className={`font-medium text-[14px] leading-[21px] text-reborn-gray6 flex-1 text-right ${descClassName}`}
      >
        {desc}
      </div>
    </div>
  );
};
