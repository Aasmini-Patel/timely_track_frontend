import axios from "axios";

export const uploadImages = async (url, file) => {
  try {
    const imageRes = await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}${url}`,
      {
        sFileName: file.name,
        sContentType: file.type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const surl = imageRes.data.data.sUrl;
    const sImage = imageRes.data.data.sPath;
    await axios.put(surl, file, { headers: { "Content-Type": file.type } });
    return sImage;
  } catch (error) {
    console.error("image upload error", error);
  }
};
