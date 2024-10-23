import React, { useEffect, useState } from "react";
import TableOne from "../../components/Tables/AI/TableFiles";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearFiles, getFiles, getFolders } from "../../redux/AI/aisSlice";
import { FOLDER, MAIN } from "../../core/types/folder";
import SubFolder from "../../components/Folders/AI/SubFolder";
import { FILE } from "../../core/types/file";
import { useLocation } from "react-router-dom";

interface RootState {
  AI: {
    folders: FOLDER[];
    mainFolder: MAIN;
    fileInfo: FILE;
    files: FILE[];
  };
}

const Ai: React.FC = () => {
  const [parentId, setParentId] = useState<string>("null");
  const dispatch = useDispatch();

  const { folders, mainFolder, fileInfo, files } = useSelector(
    (state: RootState) => ({
      folders: state.AI.folders,
      mainFolder: state.AI.mainFolder,
      fileInfo: state.AI.fileInfo,
      files: state.AI.files,
    })
  );

  const location = useLocation()

  // Clear files when the URL changes or component is unmounted
  useEffect(() => {
    dispatch(clearFiles()); 
  }, [location]);  


  const mainFolderName = mainFolder ? mainFolder.name : "loading...";
  const mainFolderId = mainFolder ? mainFolder.id : "loading ...";

  console.log(mainFolder?.name);
  console.log(localStorage.getItem("selectedAIFolder"));
  console.log(mainFolderName);
  console.log(parentId);

 /*  // Fetch Folders
  const fetchFolders = async () => {
    try {
      const result = await axios.post<{ data: FOLDER[] }>(
        `http://79.134.138.252:7111/ais/filter`,
        {
          parent_id: parentId,
          limit: 100
        }
      );

      console.log("API Response:", result.data); // Log the entire response
      if (result.data) {
        dispatch(getFolders(result.data));
      } else {
        console.warn("No data found in API response");
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [parentId]); */
      

  return (
    <>
      <Breadcrumb pageName="AI" />
      {/* Removed Folder Component */}
      <div className="grid gap-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mb-10">
        <div className="col-span-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
          <div className="flex flex-col gap-5.5 p-2">
            <SubFolder mainFolderId={mainFolderId} />
          </div>
        </div>
      </div>

      {files && (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="col-span-3">
            <TableOne
              AI={{
                fileInfo,
                subFolder: {
                  id: "",
                  name: "",
                },
                files: [],
              }}
            />
          </div>

          {fileInfo && (
            <div className="flex justify-center items-center min-h-screen">
              <div className="rounded-xl bg-slate-200 p-6 text-center shadow-xl max-w-lg dark:bg-boxdark">
                <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
                  {/* SVG icon omitted for brevity */}
                </div>
                <h1 className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block">
                  {fileInfo.name}
                </h1>
                <div className="text-lg mt-5 flex gap-8">
                  <h3 className="text-gray-900 font-semibold leading-none hover:text-indigo-600 mt-1">
                    Extension of file
                  </h3>
                  <p className="text-gray-900 font-bold text-lg hover:text-indigo-600 inline-block">
                    {fileInfo.extension}
                  </p>
                </div>
                <div className="text-lg mt-5 flex gap-8">
                  <h3 className="text-gray-900 font-semibold leading-none hover:text-indigo-600 mt-1">
                    Size of file
                  </h3>
                  <p className="text-gray-900 font-bold text-lg hover:text-indigo-600 inline-block">
                    {fileInfo.size} KB
                  </p>
                </div>
                <div className="text-lg mt-5 flex gap-8">
                  <h3 className="text-gray-900 font-semibold leading-none hover:text-indigo-600 mt-1">
                    Date of uploaded
                  </h3>
                  <p className="text-gray-900 font-bold text-lg hover:text-indigo-600 inline-block">
                    {fileInfo.extension}
                  </p>
                </div>
                <a
                  href="#"
                  className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block mt-8"
                >
                  Path of file in Server
                </a>
                <p className="text-gray-700 text-sm">
                  {fileInfo.path.pathString}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Ai;
