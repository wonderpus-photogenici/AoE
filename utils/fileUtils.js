// src/utils/fileUtils.js
export const convertFileToBase64 = (file, callback) => {
  if (file.type.includes("image")) {
    if (file.size > 5000000) {
      throw new Error("Image cannot exceed the 5MB of size");
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      callback(fileReader.result); // Pass the result to the callback
    };
  } else {
    throw new Error("File is not an image");
  }
};
