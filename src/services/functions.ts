export const imgToCanvas = async (
  filterValuesToEdit: filterOptions,
  imgSrc: string,
  reload?: boolean,
): Promise<void> => {
  const img = new Image();
  const canvas = <HTMLCanvasElement>document.getElementById("previewCanvas");
  const ctx = canvas?.getContext("2d");
  if (canvas !== null && reload) ctx?.clearRect(0, 0, 1920, 1080);
  if (ctx != null)
    ctx.filter = `blur(${filterValuesToEdit.blurValue}px) brightness(${filterValuesToEdit.brightnessValue}%) saturate(${filterValuesToEdit.saturationValue}%) contrast(${filterValuesToEdit.contrastValue}%) opacity(${filterValuesToEdit.opacityValue}%)`;

  img.onload = () => {
    if (canvas === null) return;
    ctx?.drawImage(img, 0, 0, 1920, 1080);
  };
  img.src = imgSrc;
};

export const downloadCanvas = () => {
  const canvasToDownload = <HTMLCanvasElement>(
    document.getElementById("previewCanvas")
  );
  if (canvasToDownload === null) return;
  const image = canvasToDownload
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  const element = document.createElement("a");
  const filename = "neatBG.png";
  element.setAttribute("href", image);
  element.setAttribute("download", filename);

  element.click();
};
