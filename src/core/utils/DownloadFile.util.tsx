import { RestAPI } from "../apis/RestAPI";

export const downloadFile = async (filePath: string, fileName: string) => {
  try {
    const result = await RestAPI.getRequest('ftp/download', { filePath });

    const blob = new Blob([result.data], { type: result.data.type });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
