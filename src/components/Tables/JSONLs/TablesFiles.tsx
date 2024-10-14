import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FOLDER, MAIN } from "../../../types/folder";
import axios from "axios";
import { getFiles } from "../../../redux/JSONLs/JSONLsSlice";
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

import download from '../../../images/FilesIcon/download.png';

interface FolderProps {
  JSONLs: {
    subFolder: MAIN;
    files: FILE[];
  };
}

const TableOne: React.FC<FolderProps> = () => {
  const { subFolder, files } = useSelector((state: FolderProps) => ({
    subFolder: state.JSONLs.subFolder,
    files: state.JSONLs.files
  }));

  const subFolderId = subFolder.id;
  const dispatch = useDispatch();

  // Fetch Files
  const fetchFiles = async () => {
    try {
      const result = await axios.post<{ data: FOLDER[] }>(`http://localhost:3000/jsonls/filter`, {
        parent_id: subFolderId,
      });
      if (result.data) {
        dispatch(getFiles(result.data));
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    if (subFolder) {
      fetchFiles();
    }
  }, [dispatch, subFolderId]);

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

  const filteredFiles = files.filter(file => file.document_type !== "folder");

  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 6;

  // Pagination logic
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);
  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Files in {subFolder.name}
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Path</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Size</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Extension</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
          </div>
        </div>

        {currentFiles.map((file, key) => {
          const fileIcon = getFileIcon(file.name); // Get the icon for the current file
          
          return (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                key === currentFiles.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <img src={fileIcon} alt="file" className="w-10 h-12" />
                </div>
                <p className="hidden text-black dark:text-white sm:block">{file.name}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{file.path.pathString}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{file.size}</p>
              </div>

              <div className="hidden flex items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-3">{file.extension?.toUpperCase()}</p>
              </div>

              {/* Actions Column */}
              <div className="flex items-center justify-center gap-2 p-2.5 xl:p-5">
                <button
                  onClick={() => alert(`Reviewing ${file.name}`)}
                  className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Review
                </button>
               
                  <img src={download} alt="download" className="w-10 h-10"
                   onClick={() => alert(`Downloading ${file.name}`)}
                   />
              </div>
            </div>
          );
        })}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4 text-black dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableOne;
