export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("upload_preset", "siam-store");
  formData.append("file", file);

  // Add timeout (optional)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dtkl4ic8s/image/upload",
      {
        method: "POST",
        body: formData,
        signal: controller.signal,
        // IMPORTANT: No manual "Content-Type"! Browser sets it for multipart/form-data
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Cloudinary error response:", errorBody);
      throw new Error(
        `Cloudinary upload failed: ${response.status} ${response.statusText}`,
      );
    }

    const result = await response.json();

    if (!result.secure_url) {
      throw new Error("No secure_url returned by Cloudinary");
    }

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export const uploadMultipleFilesToCloudinary = async (
  files: File[],
): Promise<string[]> => {
  const urls = await Promise.all(files.map(uploadToCloudinary));
  return urls.filter(Boolean);
};
