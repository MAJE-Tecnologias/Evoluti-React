const HomeButton = ({
  href,
  text,
  bgColor = "bg-evolutiGreen",
  hoverColor = "hover:bg-evolutiGreenDarker",
}) => {
  return (
    <a
      href={href}
      className={`text-white text-base flex justify-center items-center gap-x-2 rounded-3xl px-8 py-2 w-fit transition-colors
        ${bgColor} ${hoverColor}`}
    >
      {text} <img src="src/assets/WhiteLongArrow.svg" alt="Arrow Icon" />
    </a>
  );
};

export default HomeButton;
