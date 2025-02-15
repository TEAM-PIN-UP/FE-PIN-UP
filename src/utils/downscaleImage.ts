import checkImageValidity from "./checkImageValidity";

export const downscaleImage = async ({
  image,
  targetWidth,
  targetHeight = 720,
  returnFormat = "base64",
}: {
  image: string | File;
  targetWidth?: number;
  targetHeight?: number;
  returnFormat?: "base64" | "file";
}): Promise<string | File> => {
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
        resolve(image instanceof File ? image : img.src);
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

      // Convert to Base64
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create Blob from canvas"));
            return;
          }

          if (returnFormat === "file") {
            // Convert Blob to File
            const fileName =
              image instanceof File ? image.name : "downscaled.jpg";
            const downscaledFile = new File([blob], fileName, {
              type: "image/jpeg",
            });
            resolve(downscaledFile);
          } else {
            // Convert Blob to Base64
            const reader = new FileReader();
            reader.onloadend = () => {
              if (reader.result) resolve(reader.result as string);
              else reject(new Error("Failed to convert Blob to Base64"));
            };
            reader.readAsDataURL(blob);
          }
        },
        "image/jpeg",
        0.9
      );
    };

    img.onerror = (err) => {
      reject(new Error("Failed to load image: " + err));
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
