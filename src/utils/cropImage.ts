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

      const cropX = (image.width - cropSize) / 2;
      const cropY = (image.height - cropSize) / 2;

      canvas.width = cropSize;
      canvas.height = cropSize;

      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropSize,
        cropSize,
        0,
        0,
        cropSize,
        cropSize
      );

      const croppedDataUrl = canvas.toDataURL();
      resolve(croppedDataUrl);
    };

    image.onerror = () => {
      reject("Failed to load image.");
    };
  });
};
