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
          className="h-16 w-24 cursor-pointer rounded border border-white/25 object-cover transition-all hover:scale-105"
          src={imgUrl}
          alt={imgAlt}
        />
      </button>
    </>
  );
};

export default ExampleButton;
