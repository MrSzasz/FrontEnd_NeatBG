interface ExampleButtonProps {
  onClickFn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  imgUrl: string;
  imgAlt: string;
}

const ExampleButton = ({
  onClickFn,
  imgUrl,
  imgAlt,
}: ExampleButtonProps): React.ReactElement => {
  return (
    <>
      <button
        onClick={(e) => {
          onClickFn(e);
        }}
      >
        <img
          className="h-10 w-16 cursor-pointer rounded border border-white/25 object-cover transition-all hover:scale-105 md:h-16 md:w-24"
          src={imgUrl}
          alt={imgAlt}
        />
      </button>
    </>
  );
};

export default ExampleButton;
