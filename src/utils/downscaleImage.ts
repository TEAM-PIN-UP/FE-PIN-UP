import checkImageValidity from "./checkImageValidity";

export const downscaleImage = async ({
  image,
  targetWidth,
  targetHeight = 1080,
}: {
  image: string | File;
  targetWidth?: number;
  targetHeight?: number;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (targetWidth) targetWidth = Math.floor(targetWidth);
    if (targetHeight) targetHeight = Math.floor(targetHeight);

    if (targetWidth && targetWidth <= 0) {
      reject(new Error("Target width must be a positive number."));
      return;
    }
    if (targetHeight && targetHeight <= 0) {
      reject(new Error("Target height must be a positive number."));
      return;
    }

    const img = new Image();

    img.onload = () => {
      let newWidth, newHeight;

      const aspectRatio = img.width / img.height;

      // Check if image is smaller than target
      if (
        (targetWidth && img.width <= targetWidth) ||
        (targetHeight && img.height <= targetHeight)
      ) {
        resolve(image instanceof File ? img.src : image);
        return;
      }

      // Use target width if given
      if (targetWidth) {
        newWidth = targetWidth;
        newHeight = Math.floor(newWidth / aspectRatio);
      } else {
        newHeight = targetHeight;
        newWidth = Math.floor(newHeight * aspectRatio);
      }

      // New canvas to perform downscaling
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Canvas to base64
      const downscaledImage = canvas.toDataURL("image/jpeg", 0.9);

      resolve(downscaledImage);
    };

    img.onerror = (err) => {
      reject(new Error("Failed to load the image" + err));
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
