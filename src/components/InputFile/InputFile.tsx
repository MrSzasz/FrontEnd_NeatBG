import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { downloadCanvas, imgToCanvas } from "@/services/functions";
import { LuDownload, LuFileEdit, LuFilePlus } from "react-icons/lu";
import ExampleButton from "../ExampleButton/ExampleButton";

const InputFile = (): React.ReactElement => {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [filterValues, setFilterValues] = useState<filterOptions>({
    blurValue: 30,
    brightnessValue: 100,
    saturationValue: 100,
    contrastValue: 100,
    opacityValue: 100,
    noiseValue: false,
  });
  const [advancedOptions, setAdvancedOptions] = useState<boolean>(false);
  const [example, setExample] = useState(false);

  const examplesData = [
    {
      filters: {
        blurValue: 100,
        brightnessValue: 136,
        saturationValue: 148,
        contrastValue: 96,
        opacityValue: 100,
        noiseValue: false,
      },
      imgUrl: "/examples/example1.jpg",
      imgAlt: "Example image 1",
    },
    {
      filters: {
        blurValue: 100,
        brightnessValue: 136,
        saturationValue: 148,
        contrastValue: 96,
        opacityValue: 100,
        noiseValue: false,
      },
      imgUrl: "/examples/example2.jpg",
      imgAlt: "Example image 2",
    },
    {
      filters: {
        blurValue: 50,
        brightnessValue: 100,
        saturationValue: 100,
        contrastValue: 100,
        opacityValue: 100,
        noiseValue: false,
      },
      imgUrl: "/examples/example3.jpg",
      imgAlt: "Example image 3",
    },
    {
      filters: {
        blurValue: 100,
        brightnessValue: 75,
        saturationValue: 100,
        contrastValue: 100,
        opacityValue: 100,
        noiseValue: false,
      },
      imgUrl: "/examples/example4.jpg",
      imgAlt: "Example image 4",
    },
  ];

  return (
    <div>
      <div className="flex gap-4 pt-4">
        <div className="mx-auto w-36 rounded-md border border-white/25 shadow-md transition-all hover:bg-white/5">
          <label
            htmlFor="upload"
            className="flex cursor-pointer flex-col items-center gap-2 p-4 "
          >
            {imgUrl ? <LuFileEdit size="2em" /> : <LuFilePlus size="2em" />}
            <span className="font-medium">
              {imgUrl ? "Change file" : "Upload file"}
            </span>
          </label>
          <input
            id="upload"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={(e) => {
              if (e.target.files !== null) {
                const URLFile = URL.createObjectURL(e.target.files[0]);
                setImgUrl(URLFile);
                imgToCanvas(filterValues, URLFile, true);
                setFilterValues({ ...filterValues, noiseValue: false });
              }
            }}
          />
        </div>
        {imgUrl && (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-2">
              <Switch
                onCheckedChange={() => setAdvancedOptions(!advancedOptions)}
                name="Advanced"
                className="bg-red-400"
              />
              <Label htmlFor="Advanced">Advanced</Label>
            </div>
            <Button
              variant="ghost"
              className="border border-white/25 hover:bg-white/5"
              onClick={() => {
                downloadCanvas();
              }}
            >
              <LuDownload className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        )}
      </div>
      <div className={`${advancedOptions ? "flex flex-col gap-2" : "hidden"}`}>
        <div className="flex items-center gap-2 pt-4">
          <Label htmlFor="BlurSelect">Blur</Label>
          <Select
            name="BlurSelect"
            defaultValue="30"
            onValueChange={(e) => {
              setFilterValues({ ...filterValues, blurValue: Number(e) });
              imgToCanvas({ ...filterValues, blurValue: Number(e) }, imgUrl);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Soft" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">Subtle</SelectItem>
              <SelectItem value="30">Mild</SelectItem>
              <SelectItem value="50">Moderate</SelectItem>
              <SelectItem value="75">Intense</SelectItem>
              <SelectItem value="100">Extreme</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="BrightnessSelect">Brightness</Label>
          <Slider
            name="BrightnessSelect"
            defaultValue={[100]}
            max={250}
            min={25}
            step={1}
            onValueChange={(e) => {
              setFilterValues({ ...filterValues, brightnessValue: Number(e) });
              imgToCanvas(
                { ...filterValues, brightnessValue: Number(e) },
                imgUrl,
                false,
              );
            }}
          />
        </div>
        <div>
          <Label htmlFor="SaturationSelect">Saturation</Label>
          <Slider
            name="SaturationSelect"
            defaultValue={[100]}
            max={200}
            step={1}
            onValueChange={(e) => {
              setFilterValues({ ...filterValues, saturationValue: Number(e) });
              imgToCanvas(
                { ...filterValues, saturationValue: Number(e) },
                imgUrl,
                false,
              );
            }}
          />
        </div>
        <div>
          <Label htmlFor="ContrastSelect">Contrast</Label>
          <Slider
            name="ContrastSelect"
            defaultValue={[100]}
            max={200}
            step={1}
            onValueChange={(e) => {
              setFilterValues({ ...filterValues, contrastValue: Number(e) });
              imgToCanvas(
                { ...filterValues, contrastValue: Number(e) },
                imgUrl,
                false,
              );
            }}
          />
        </div>
        {/* TODO => Add noise */}
        {/* <div>
          <Label htmlFor="NoiseSelect">Noise</Label>
          <Checkbox
            name="NoiseSelect"
            onCheckedChange={(e) => {
              setFilterValues({ ...filterValues, noiseValue: Boolean(e) });
              imgToCanvas({ ...filterValues, noiseValue: Boolean(e) }, imgUrl);
            }}
          />
        </div> */}
      </div>
      {!imgUrl && (
        <>
          <div className="grid grid-cols-[1fr_min-content_1fr] items-center justify-center gap-2 py-2">
            <hr className="border border-white/25" />

            <p className="pb-2 text-2xl">or</p>
            <hr className="border border-white/25" />
          </div>
          <div className="grid items-center justify-center gap-4 rounded-lg p-4 pt-0">
            <h2 className="text-center text-2xl">Select an example</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {examplesData.map((example, i) => (
                <ExampleButton
                  key={i}
                  onClickFn={(e: React.MouseEvent) => {
                    setExample(true);
                    imgToCanvas(
                      example.filters,
                      (e.target as HTMLImageElement).src,
                      true,
                    );
                  }}
                  imgUrl={example.imgUrl}
                  imgAlt={example.imgAlt}
                />
              ))}

              <Button
                disabled={!example}
                variant="outline"
                className="col-span-4 flex w-full items-center justify-center border border-white/25 bg-transparent hover:bg-white/5"
                onClick={() => downloadCanvas()}
              >
                <LuDownload className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InputFile;
