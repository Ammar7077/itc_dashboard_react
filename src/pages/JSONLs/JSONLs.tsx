import React, { useEffect, useState } from "react";
import TableOne from "../../components/Tables/JSONLs/TablesFiles";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Folder from "../../components/Folders/JSONLs/Folder";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFolders } from "../../redux/JSONLs/JSONLsSlice";
import { FOLDER, MAIN } from "../../types/folder";
import SubFolder from "../../components/Folders/JSONLs/SubFolder";
import { FILE } from "../../types/file";

interface RootState {
  JSONLs: {
    folders: FOLDER[];
    mainFolder: MAIN;
    fileInfo: FILE;
    files: FILE[];
  };
}

const JSONLs: React.FC = () => {
  const [parentId, setParentId] = useState<string>("null");

  const dispatch = useDispatch();

  const { folders, mainFolder, fileInfo, files } = useSelector(
    (state: RootState) => ({
      folders: state.JSONLs.folders,
      mainFolder: state.JSONLs.mainFolder,
      fileInfo: state.JSONLs.fileInfo,
      files: state.JSONLs.files,
    })
  );

  const mainFolderName = mainFolder ? mainFolder.name : "loading...";
  const mainFolderId = mainFolder ? mainFolder.id : "loading ...";

  console.log(mainFolder?.name);
  console.log(localStorage.getItem("selectedFolder"));
  console.log(mainFolderName);

  //--------------get Folders ----
  const fetchFolders = async () => {
    try {
      const result = await axios.post<{ data: FOLDER[] }>(
        `http://79.134.138.252:7111/jsonls/filter`,
        {
          parent_id: parentId,
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

  // ---------------get files ----
  // may we add path side to Folder Name on the title to move on the second folders once click on it

  /* const fetchFiles = async ()=>{
        try{
            const result = await axios.get<{data:FILE[]}>()
        }
    } */

  useEffect(() => {
    fetchFolders();
  }, [parentId]);

  return (
    <>
      <Breadcrumb pageName="JSONLs" />
      <Folder folders={folders || []} title={"JSONLs's Folders"} />
      <div className="grid gap-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mb-10">
        {/* <InputText/> */}

        {/* <!-- Checkbox and radio --> */}
        <div className="col-span-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Subfolders on {mainFolderName}
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-2">
            <SubFolder mainFolderId={mainFolderId} />
          </div>
        </div>
      </div>

      {files && (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="col-span-3">
            <TableOne
              JSONLs={{
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
                  <svg
                    viewBox="0 0 33 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                  >
                    <path
                      d="M24.75 23H8.25V28.75H24.75V23ZM32.3984 9.43359L23.9852 0.628906C23.5984 0.224609 23.0742 0 22.5242 0H22V11.5H33V10.952C33 10.3859 32.7852 9.83789 32.3984 9.43359ZM19.25 12.2188V0H2.0625C0.919531 0 0 0.961328 0 2.15625V43.8438C0 45.0387 0.919531 46 2.0625 46H30.9375C32.0805 46 33 45.0387 33 43.8438V14.375H21.3125C20.1781 14.375 19.25 13.4047 19.25 12.2188ZM5.5 6.46875C5.5 6.07164 5.80766 5.75 6.1875 5.75H13.0625C13.4423 5.75 13.75 6.07164 13.75 6.46875V7.90625C13.75 8.30336 13.4423 8.625 13.0625 8.625H6.1875C5.80766 8.625 5.5 8.30336 5.5 7.90625V6.46875ZM5.5 12.2188C5.5 11.8216 5.80766 11.5 6.1875 11.5H13.0625C13.4423 11.5 13.75 11.8216 13.75 12.2188V13.6562C13.75 14.0534 13.4423 14.375 13.0625 14.375H6.1875C5.80766 14.375 5.5 14.0534 5.5 13.6562V12.2188ZM27.5 39.5312C27.5 39.9284 27.1923 40.25 26.8125 40.25H19.9375C19.5577 40.25 19.25 39.9284 19.25 39.5312V38.0938C19.25 37.6966 19.5577 37.375 19.9375 37.375H26.8125C27.1923 37.375 27.5 37.6966 27.5 38.0938V39.5312ZM27.5 21.5625V30.1875C27.5 30.9817 26.8847 31.625 26.125 31.625H6.875C6.11531 31.625 5.5 30.9817 5.5 30.1875V21.5625C5.5 20.7683 6.11531 20.125 6.875 20.125H26.125C26.8847 20.125 27.5 20.7683 27.5 21.5625Z"
                      fill="white"
                    ></path>
                  </svg>
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

export default JSONLs;
