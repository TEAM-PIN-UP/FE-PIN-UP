import { useToastStore } from "@/store";
import checkImageValidity from "@/utils/checkImageValidity";
import { cropImage } from "@/utils/cropImage";

const uploadImage = (file: File, onLoad: (loadedImageUrl: string) => void) => {
  const { textChange, pop } = useToastStore.getState();

  if (file) {
    if (!checkImageValidity(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageUrl = reader.result;
      if (typeof imageUrl === "string") {
        const image = new Image();

        // Load success = valid image
        image.onload = async () => {
          try {
            const croppedImageUrl = await cropImage(imageUrl);
            onLoad(croppedImageUrl);
          } catch (error) {
            console.error("Error cropping image: ", error);
          }
        };
        image.onerror = () => {
          textChange("올바른 이미지 파일을 선택해주세요.");
          pop(true);
        };

        // Begin loading image
        image.src = imageUrl;
      }
    };

    reader.readAsDataURL(file);
  }
};

export default uploadImage;
