import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFiles, setFolders } from "../../redux/FilesFoldersListsSlice.redux";
import { RestAPI } from "../../core/apis/RestAPI";
import { TFolder } from "../../core/types/folder";
import { TFile } from "../../core/types/file";
import { TableFiles } from "../../components/TableFiles.component";
import { FolderComponent } from "../../components/Folder.component";
import { PathComponent } from "../../components/Path.component";
import FilterComponent from "../../components/Filteration/FilterComponent";

interface IFilesFolders {
  FilesFolders: { folders: []; files: [] };
}

const Ai: React.FC = () => {
  const [selectedFolderId, setSelectedFolderId] = useState("null");
  const [selectedFolderList, setSelectedFolderList] = useState<TFolder[]>([]);
  // --------------------------------------- //
  const dispatch = useDispatch();
  const { folders, files } = useSelector((state: IFilesFolders) => ({
    folders: state.FilesFolders.folders,
    files: state.FilesFolders.files,
  }));
  // --------------------------------------- //
  const fetchFolders = async () => {
    try {
      const res = await RestAPI.postRequest("ais/filter", {
        parent_id: selectedFolderId,
        document_type: "folder",
        limit: 1000,
      });
      dispatch(setFolders([]));
      dispatch(setFolders(res.data as TFolder[]));
    } catch (err) {
      console.error("Error fetching folders", err);
    }
  };

  const fetchFilesByFolderId = async () => {
    try {
      const res = await RestAPI.postRequest("ais/filter", {
        parent_id: selectedFolderId,
        document_type: "file",
        limit: 10,
      });
      dispatch(setFiles([]));
      dispatch(setFiles(res.data as TFile[]));
    } catch (err) {
      console.error("Error fetching files", err);
    }
  };
  // --------------------------------------- //
  const handleFolderClick = (index: number) => {
    setSelectedFolderList(selectedFolderList.slice(0, index + 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchFolders(), fetchFilesByFolderId()]);
    };
    fetchData();
  }, [selectedFolderId]);

  return (
    <>
      <h2 className="mb-6 text-title-md2 font-semibold text-black dark:text-white">
        {"AI"}
      </h2>
      <div className="grid gap-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mb-10">
        <div className="col-span-4 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
          <div className="flex flex-col gap-5.5 p-2">
            {/* <FilterComponent onFilterChange={{}} onApplyFilter={{}} /> */}

            {/* ----------------------- */}
            <div className="inline-flex gap-1">
              {selectedFolderList.map((item: TFolder, index) => (
                <>
                  <PathComponent
                    key={`${index}-${item.name}`}
                    folderName={item.name}
                    onClick={() => {
                      handleFolderClick(index);
                      setSelectedFolderId(item._id);
                    }}
                  />
                  {"/"}
                </>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-fadeIn">
              {folders &&
                folders.map((item: TFolder, index) => (
                  <FolderComponent
                    key={`${index}-${item}`}
                    folder={item}
                    onClick={() => {
                      setSelectedFolderId(item._id);
                      setSelectedFolderList((prev) => [...prev, item]);
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* -------- Files Table --------- */}
      <TableFiles filesList={files ?? []} />
      {/* --------- Next Page ---------- */}
      <div className="flex justify-end p-2">
        <ul className="inline-flex text-sm h-8 ml-auto">
          <li>
            <button
              onClick={() => {
                // TODO:
              }}
              className="flex items-center justify-center px-3 h-8 ms-0 text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {"<"}
            </button>
          </li>
          <li>
            <p className="flex items-center justify-center px-3 h-8 text-gray-500 bg-gray dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              {"1 Page Number"}
            </p>
          </li>
          <li>
            <button
              onClick={() => {
                // TODO:
              }}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {">"}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Ai;
