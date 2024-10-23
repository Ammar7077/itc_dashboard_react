import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MAIN } from "../../../core/types/folder";
import axios from "axios";
import { clearFiles, getFileInfo, getFiles } from "../../../redux/AI/aisSlice";
import { FILE } from "../../../core/types/file";
import { useLocation } from "react-router-dom";

// File icons
import pdfIcon from "../../../assets/images/FilesIcon/pdf.png";
import docIcon from "../../../assets/images/FilesIcon/doc.png";
import excelIcon from "../../../assets/images/FilesIcon/excel.png";
import jpgIcon from "../../../assets/images/FilesIcon/jpg.png";
import pngIcon from "../../../assets/images/FilesIcon/png.png";
import jsonlIcon from "../../../assets/images/FilesIcon/json.png";
import txtIcon from "../../../assets/images/FilesIcon/txt.png";
import xlsxIcon from "../../../assets/images/FilesIcon/xlsx.png";
import docxIcon from "../../../assets/images/FilesIcon/docx.png";
import view from "../../../assets/images/FilesIcon/research.png";
import download from "../../../assets/images/FilesIcon/download.png";
import nextPage from "../../../assets/images/pageIcon/next-page.png";
import prePage from "../../../assets/images/pageIcon/left-arrow.png";
import { formatSize } from "../../../core/utils/FormatSize.util";
import { downloadFile } from "../../../core/utils/DownloadFile.util";

interface FolderProps {
  AI: {
    fileInfo: FILE;
    subFolder: MAIN;
    files: FILE[] | null;
  };
}

const TableOne: React.FC<FolderProps> = () => {
  const { subFolder, files = [] } = useSelector((state: FolderProps) => ({
    subFolder: state.AI.subFolder,
    files: state.AI.files || [],
  }));

  const subFolderId = subFolder?.id;
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 5; // Number of files per page
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [hasNextPage, setHasNextPage] = useState(false); // Track if there's a next page

  // Fetch Files with pagination
  const fetchFiles = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const result = await axios.post<{
        length: number;
        data: FILE[];
      }>(`http://79.134.138.252:7111/ais/filter`, {
        parent_id: subFolderId,
        limit: filesPerPage,
        page: page,
      });

      if (result.data && result.data.length > 0) {
        dispatch(getFiles(result.data)); // Update Redux state with the new files
        setHasNextPage(result.data.length === filesPerPage); // True if the returned data fills the page
      } else {
        setHasNextPage(false); // No data means no next page
      }
    } catch (error) {
      setError("Error fetching files");
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();

  // Clear files when the URL changes or component is unmounted
  useEffect(() => {
    dispatch(clearFiles());
  }, [location]);

  // Trigger file fetching when subFolder changes or currentPage changes
  useEffect(() => {
    if (subFolderId) {
      fetchFiles(currentPage);
    }
  }, [subFolderId, currentPage]);

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    // Only allow changing to pages if there's a previous or next page
    if (newPage >= 1 && (newPage < currentPage || hasNextPage)) {
      setCurrentPage(newPage);
    }
  };

  // Handle file view and download
  const handleViewFile = (file: FILE) => {
    dispatch(getFileInfo(file));
  };

  const handleDownloadFile = async (file: FILE) => {
    dispatch(getFileInfo(file));
    await downloadFile(file.path?.pathString, file.name);
  };

  // Get file icon based on extension
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return pdfIcon;
      case "doc":
        return docIcon;
      case "docx":
        return docxIcon;
      case "txt":
        return txtIcon;
      case "jsonl":
        return jsonlIcon;
      case "jpg":
        return jpgIcon;
      case "xls":
        return excelIcon;
      case "png":
        return pngIcon;
      case "xlsx":
        return xlsxIcon;
      default:
        return pdfIcon;
    }
  };
  // Filter out folders from files
  const filteredFiles = files.filter((file) => file.document_type !== "folder");

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 bg-slate-50">
      {loading && <p>Loading files...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col">
        <div className="grid grid-cols-3 bg-slate-200 rounded-lg dark:bg-meta-4 m:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Size
            </h5>
          </div>
          <div className="hidden p-2.5 text-center items-center justify-center xl:flex sm:hidden xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Extension
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {filteredFiles.map((file, key) => {
          const fileIcon = getFileIcon(file.name); // Get the icon for the current file
          return (
            <div
              className={`grid grid-cols-3 m:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 ${
                key === filteredFiles.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <img src={fileIcon} alt="file" className="w-12 h-14 " />
                </div>
                <p className="text-black dark:text-white">{file.name}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{formatSize(file.size)}</p>
              </div>

              <div className="hidden xl:flex sm:hidden flex items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-3 ">
                  {file.extension?.replace(".", "").toUpperCase()}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 p-2.5 xl:p-5">
                <img
                  src={view}
                  alt="view"
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => handleViewFile(file)}
                />
                <img
                  src={download}
                  alt="download"
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => handleDownloadFile(file)}
                />
              </div>
            </div>
          );
        })}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <img
            src={prePage}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`w-8 h-8 cursor-pointer ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            alt="Previous Page"
          />
          <p className="mx-2 text-lg">Page {currentPage}</p>
          <img
            src={nextPage}
            onClick={() => hasNextPage && handlePageChange(currentPage + 1)} // Only call handlePageChange if there is a next page
            className={`w-8 h-8 cursor-pointer ${
              !hasNextPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            alt="Next Page"
          />
        </div>
      </div>
    </div>
  );
};

export default TableOne;
