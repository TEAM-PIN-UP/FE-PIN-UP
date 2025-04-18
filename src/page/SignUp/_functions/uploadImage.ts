import { SignUpForm } from "@/page/SignUp/SignUpInterface";
import checkImageValidity from "@/utils/checkImageValidity";
import { cropImage } from "@/utils/cropImage";

const uploadImage = (
  file: File,
  updateData: (updatedData: Partial<SignUpForm>) => void,
  toast: (text: string) => void
) => {
  if (file) {
    if (!checkImageValidity(file)) {
      toast("jpeg 또는 png 형식의 이미지를 올려주세요.");
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
            updateData({ profileImage: croppedImageUrl });
          } catch (error) {
            console.error("Error cropping image: ", error);
          }
        };
        image.onerror = () => {
          toast("올바른 이미지 파일을 선택해주세요.");
        };

        // Begin loading image
        image.src = imageUrl;
      }
    };

    reader.readAsDataURL(file);
  }
};

export default uploadImage;
