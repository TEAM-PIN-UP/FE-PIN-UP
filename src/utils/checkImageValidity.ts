const checkImageValidity = (image: string | File): boolean => {
  if (typeof image === "string")
    return Boolean(image) && /^data:image\/(png|jpg|jpeg);base64,/.test(image);

  if (image instanceof File) {
    const allowedTypes = ["image/jpeg", "image/png"];
    return allowedTypes.includes(image.type);
  }

  return false;
};

export default checkImageValidity;
