export const cropImage = (
  imageUrl: string,
  cropSize: number = 256
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject("Canvas context unavailable.");
        return;
      }

      // Find largest square possible
      const squareSize = Math.min(image.width, image.height);

      // Set canvas to square size
      canvas.width = squareSize;
      canvas.height = squareSize;

      // Calculate center start position
      const cropX = (image.width - squareSize) / 2;
      const cropY = (image.height - squareSize) / 2;

      ctx.drawImage(
        image,
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
        reject("Canvas context unavailable.");
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

    image.onerror = () => {
      reject("Failed to load image.");
    };
  });
};
