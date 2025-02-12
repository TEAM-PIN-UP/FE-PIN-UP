import checkImageValidity from "./checkImageValidity";

export const cropImage = (
  image: string | File,
  cropSize: number = 256
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cropSize = Math.floor(cropSize);
    if (cropSize <= 0) {
      reject(new Error("Crop size must be a positive number."));
      return;
    }

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject("Canvas context unavailable.");
        return;
      }

      // Find largest square possible
      const squareSize = Math.min(img.width, img.height);

      // Set canvas to square size
      canvas.width = squareSize;
      canvas.height = squareSize;

      // Calculate center start position
      const cropX = Math.floor((img.width - squareSize) / 2);
      const cropY = Math.floor((img.height - squareSize) / 2);

      ctx.drawImage(
        img,
        cropX,
        cropY,
        squareSize,
        squareSize,
        0,
        0,
        squareSize,
        squareSize
      );

      // Downscale square to desired cropSize
      const resizedCanvas = document.createElement("canvas");
      const resizedCtx = resizedCanvas.getContext("2d");

      if (!resizedCtx) {
        reject("Resized canvas context unavailable.");
        return;
      }

      resizedCanvas.width = cropSize;
      resizedCanvas.height = cropSize;

      // Draw resized square image
      resizedCtx.drawImage(
        canvas,
        0,
        0,
        squareSize,
        squareSize,
        0,
        0,
        cropSize,
        cropSize
      );

      const croppedDataUrl = resizedCanvas.toDataURL();
      resolve(croppedDataUrl);
    };

    img.onerror = () => {
      reject("Failed to load image.");
    };

    // Read image
    if (image instanceof File && checkImageValidity(image)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(image);
    } else if (typeof image === "string" && checkImageValidity(image)) {
      img.src = image;
    } else {
      reject(new Error("Invalid image input"));
    }
  });
};
