import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FOLDER, MAIN } from "../../../types/folder";
import axios from "axios";
import { getFileInfo, getFiles } from "../../../redux/Consultings/ConsultingsSlice";
import { FILE } from "../../../types/file";

// File icons
import pdfIcon from '../../../images/FilesIcon/pdf.png';
import docIcon from '../../../images/FilesIcon/doc.png';
import excelIcon from '../../../images/FilesIcon/excel.png';
import jpgIcon from '../../../images/FilesIcon/jpg.png';
import pngIcon from '../../../images/FilesIcon/png.png';
import jsonlIcon from '../../../images/FilesIcon/json.png';
import txtIcon from '../../../images/FilesIcon/txt.png';
import xlsxIcon from '../../../images/FilesIcon/xlsx.png';
import docxIcon from '../../../images/FilesIcon/docx.png';
import view from '../../../images/FilesIcon/research.png';
import download from '../../../images/FilesIcon/download.png';
import nextPage from '../../../images/pageIcon/next-page.png';
import prePage from '../../../images/pageIcon/left-arrow.png';

interface FolderProps {
  Consultings: {
    fileInfo: FILE;
    subFolder: MAIN;
    files: FILE[];
  };
}

const TableOne: React.FC<FolderProps> = () => {
  const { subFolder, files, fileInfo } = useSelector((state: FolderProps) => ({
    fileInfo: state.Consultings.fileInfo,
    subFolder: state.Consultings.subFolder,
    files: state.Consultings.files,
  }));

  const subFolderId = subFolder?.id;
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 5; // Number of files per page
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [hasNextPage, setHasNextPage] = useState(true); // Track if there's a next page

  // Fetch Files with pagination
  const fetchFiles = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const result = await axios.post<{
        length: number; data: FILE[] 
}>(`http://79.134.138.252:7111/Consultings/filter`, {
        parent_id: subFolderId,
        limit: filesPerPage,
        page: page,
      });

      if (result.data && result.data.length > 0) {
        dispatch(getFiles(result.data)); // Update Redux state with the new files
        setHasNextPage(result.data.length === filesPerPage); // If we received the exact number of files, assume there might be more
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

  // Trigger file fetching when subFolder or currentPage changes
  useEffect(() => {
    if (subFolderId) {
      fetchFiles(currentPage);
    }
  }, [subFolderId, currentPage]);

  // Handle page changes
  const handlePageChange = (newPage: number) => {
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

    try {
      const result = await axios.get(
        `http://79.134.138.252:7111/ftp/download?filePath=${file.path?.pathString}`,
        {
          responseType: 'blob',
        }
      );

      const blob = new Blob([result.data], { type: result.data.type });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  // Get file icon based on the extension
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return pdfIcon;
      case 'doc': return docIcon;
      case 'docx': return docxIcon;
      case 'txt': return txtIcon;
      case 'jsonl': return jsonlIcon;
      case 'jpg': return jpgIcon;
      case 'xls': return excelIcon;
      case 'png': return pngIcon;
      case 'xlsx': return xlsxIcon;
      default: return pdfIcon;
    }
  };

  // Function to convert bytes to a human-readable format
  const formatSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / (1024 ** i)).toFixed(2)} ${sizes[i]}`;
  };
  
  const filteredFiles = files.filter(file => file.document_type !== "folder");

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 bg-slate-50">
      

      {loading && <p>Loading files...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col">
        <div className="grid grid-cols-3 bg-slate-200 rounded-lg dark:bg-meta-4 m:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Size</h5>
          </div>
          <div className="hidden p-2.5 text-center items-center justify-center xl:flex sm:hidden xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Extension</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
          </div>
        </div>

        {filteredFiles.map((file, key) => {
          const fileIcon = getFileIcon(file.name);

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
                <p className="text-meta-3 ">{file.extension?.replace('.', '').toUpperCase()}</p>
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
            className={`w-8 h-8 cursor-pointer ${currentPage === 1 ? 'opacity-50' : ''}`}
            alt="Previous Page"
          />
          <span className="mx-4 text-black font-bold dark:text-white">
            Page {currentPage}
          </span>
          <img
            src={nextPage}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`w-8 h-8 cursor-pointer ${!hasNextPage ? 'opacity-50' : ''}`}
            alt="Next Page"
          />
        </div>
      </div>
    </div>
  );
};

export default TableOne;
