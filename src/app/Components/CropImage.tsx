import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import LoadingButtons from "./LoadingBtn";
import SaveIcon from "@mui/icons-material/Save";
import { alertWithTimeout } from "../app/features/userSelection/alertSlice";
import { useDispatch } from "react-redux";

interface ComponentProps {
  image: string;
  cancel: (str: string | null) => void;
  uploadImage: (imageBlob: Blob) => Promise<boolean>;
}
const CropImage: React.FC<ComponentProps> = ({
  image,
  cancel,
  uploadImage,
}) => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    setLoading(true);
    try {
      const cropImage: any = await getCroppedImg(image, croppedAreaPixels);

      if (cropImage) {
        const result = await uploadImage(cropImage);

        if (result) {
          cancel(null);
        }
        setLoading(false);
      }
    } catch (error: any) {
      dispatch(
        alertWithTimeout({
          severity: "error",
          variant: "filled",
          message: `Error cropping image: ${error.message}`,
        })
      );
      setLoading(false);
    }
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });

  function rotateSize(width: any, height: any) {
    const rotRad = 0;

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) +
        Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) +
        Math.abs(Math.cos(rotRad) * height),
    };
  }

  async function getCroppedImg(
    img: string,
    selectedPixels: { x: number; y: number; width: number; height: number }
  ) {
    const image = await createImage(img);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const flip = { horizontal: false, vertical: false };

    if (!ctx) {
      return null;
    }

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement("canvas");

    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) {
      return null;
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = selectedPixels.width;
    croppedCanvas.height = selectedPixels.height;

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
      canvas,
      selectedPixels.x,
      selectedPixels.y,
      selectedPixels.width,
      selectedPixels.height,
      0,
      0,
      selectedPixels.width,
      selectedPixels.height
    );

    return new Promise((resolve, reject) => {
      croppedCanvas.toBlob((blob) => {
        const timeStamp = Date.now();
        const fileName = `${timeStamp}_profile_img.jpg`; // Adjusted file extension to match the specified type
        if (blob) {
          const file = new File([blob], fileName, { type: "image/jpeg" }); // Adjusted MIME type to "image/jpeg"
          resolve(file);
        } else {
          reject(new Error("Failed to create Blob."));
        }
      }, "image/jpeg"); // Specify "image/jpeg" as the second parameter to toBlob() to ensure the output is in JPEG format
    });
  }

  return (
    <div className="App">
      <div className="crop-container">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 4}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{
            containerStyle: {
              left: "50%",
              top: "50%",
              width: "80%",
              height: "80%",
              transform: "translate(-50%, -50%)",
              overflow: "visible",
            },
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "50px",
          right: "175px",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => cancel(null)}
            variant="outlined"
            sx={{ color: "var(--boxColor)" }}
          >
            Cancel
          </Button>
          <LoadingButtons
            clickEvent={showCroppedImage}
            txt={"Save"}
            icon={SaveIcon}
            loading={loading}
          />
        </Stack>
      </div>
    </div>
  );
};

export default CropImage;
