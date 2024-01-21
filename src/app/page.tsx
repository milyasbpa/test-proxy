"use client";
import * as React from "react";
import clsx from "clsx";

const canvasID = `usb-microscope-camera-scan-canvas__compulsory-scan`;

export default function AndroidUSBMicroscopeCameraCompulsoryScan() {
  const [orientation, setOrientation] = React.useState<
    "portrait" | "landscape" | null
  >(null);

  const parentRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const [imageDimension, setImageDimension] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    window.screen.orientation.addEventListener("change", function (e: any) {
      if (e.currentTarget.type === "landscape-primary") {
        setOrientation("landscape");
      }
      if (e.currentTarget.type === "portrait-primary") {
        setOrientation("portrait");
      }
    });
  }, []);

  const handleClickCamera = () => {
    if (canvasRef.current !== null && imageRef.current !== null) {
      let context = canvasRef.current.getContext("2d");
      canvasRef.current.width = imageRef.current.width;
      canvasRef.current.height = imageRef.current.height;
      if (context !== null) {
        context?.drawImage(
          imageRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        const image = canvasRef.current.toDataURL("image/jpeg");

        console.log(image, "ini image");
      }
    }
  };

  React.useEffect(() => {
    if (!parentRef) return;

    if (!parentRef.current) return;
    if (!parentRef.current.clientHeight && !parentRef.current.clientWidth)
      return;
    const widthOriginal = parentRef.current.clientWidth;
    const heightOriginal = parentRef.current.clientHeight;
    const widthProjection = (parentRef.current.clientHeight / 4) * 3;
    const heightProjection = (parentRef.current.clientWidth * 3) / 4;
    if (widthProjection < widthOriginal) {
      setImageDimension({
        width: widthProjection,
        height: heightOriginal,
      });
    } else {
      setImageDimension({
        width: widthOriginal,
        height: heightProjection,
      });
    }
  }, [parentRef]);

  // const imageURL = `${process.env.NEXT_PUBLIC_WEB_URL}/uvc/video`;
  const imageURL = `http://localhost:8081/video`;
  // const imageURL = "/sample-scan-rotate.png";
  return (
    <div
      ref={parentRef}
      className={clsx(
        "grid place-content-center place-items-center",
        "w-full",
        "box-border",
        "border border-[#666666] border-solid",
        "rounded-[1rem]",
        "h-[calc(100vh_-_124px_-_2rem_-_2rem_-_1.5rem_-_1.5rem_-_3rem_-_1.5rem_-_1.5rem_-_46px)]"
      )}
    >
      <div
        className={clsx(
          "aspect-4/3 grid grid-cols-1 place-content-center place-items-center",
          "relative"
        )}
        style={{
          width: imageDimension.width,
          height: imageDimension.height,
        }}
      >
        <button onClick={handleClickCamera}>
          <img
            ref={imageRef}
            src={imageURL}
            style={{
              width: imageDimension.width,
              height: imageDimension.height,
            }}
          />

          <canvas
            id={canvasID}
            ref={canvasRef}
            // className={clsx("hidden")}
          ></canvas>
        </button>
      </div>
    </div>
  );
}
