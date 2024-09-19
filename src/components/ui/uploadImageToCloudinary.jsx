export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "vz1056oo-Events"); 

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dqwxez1us/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const result = await response.json();
    return result; // { secure_url: 'https://...'}
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

