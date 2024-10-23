import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FOLDER } from "../../../core/types/folder";
import { useDispatch, useSelector } from "react-redux";
import {
  getFiles,
  getSubFolder,
  getSubFolders,
} from "../../../redux/AI/aisSlice";
import axios from "axios";
import Breadcrumb from "./Breadcrumb"; // Import your breadcrumb component
import { StaticFolderSvg } from "../../Static/folder.svg";
import FilterComponent from "../../Filteration/FilterComponent";

interface FolderProps {
  mainFolderId: string;
}

interface RootState {
  AI: {
    subfolders: FOLDER[];
  };
}

const SubFolder: React.FC<FolderProps> = ({ mainFolderId }) => {
  // Redux
  const { subfolders } = useSelector((state: RootState) => ({
    subfolders: state.AI.subfolders,
  }));

  const location = useLocation()

  console.log("mainFolderId consulting", mainFolderId);

  // useState for Breadcrumb "path" plus Selection icon
  const [selectedSubfolder, setSelectedSubfolder] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [breadcrumbPath, setBreadcrumbPath] = useState<
    { id: string; name: string }[]
  >([{ id: "null", name: "AI" }]);

  // State to track the previous folder
  const [previousFolder, setPreviousFolder] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const dispatch = useDispatch();

  // ------ Fetch Top-level Folders ------
  const fetchTopLevelFolders = async () => {
    try {
      const result = await axios.post<{ data: FOLDER[] }>(
        `http://79.134.138.252:7111/ais/filter`,
        {
          parent_id: "null", // Fetch folders with parent_id as null
        }
      );
      console.log("Top-level folders", result.data);

      if (result.data) {
        dispatch(getSubFolders(result.data));
      } else {
        dispatch(getSubFolders([]));
      }
    } catch (error) {
      console.error("Error fetching top-level folders:", error);
    }
  };

  // ------ Fetch SubFolders ------
  const fetchSubFolders = async (folderId: string) => {
    try {
      const result = await axios.post<{ data: FOLDER[] }>(
        `http://79.134.138.252:7111/ais/filter`,
        {
          parent_id: folderId,
        }
      );
      console.log("Subfolders", result.data);

      if (result.data) {
        dispatch(getSubFolders(result.data));
      } else {
        dispatch(getSubFolders([]));
      }
    } catch (error) {
      console.error("Error fetching subfolders:", error);
    }
  };

  // ------ Fetch selectedAIFolder changes ------
  useEffect(() => {
    fetchTopLevelFolders();
  }, [dispatch]);

  // Once the subfolder is clicked
  const handleFolderClick = (folder: FOLDER) => {
    const subfolderDetails = { id: folder._id, name: folder.name };
    setSelectedSubfolder(subfolderDetails);

    setBreadcrumbPath((prev) => [...prev, subfolderDetails]);
    dispatch(getSubFolder(subfolderDetails));

    localStorage.setItem(
      "selectedAISubFolder",
      JSON.stringify(subfolderDetails)
    );
    setPreviousFolder(selectedSubfolder);

    fetchSubFolders(folder._id);
  };

  // Handle breadcrumb click
  const handleBreadcrumbClick = (clickedFolder: {
    id: string;
    name: string;
  }) => {
    dispatch(getFiles([]))

    if (clickedFolder.id === "null") {
      // When clicking on the main "AI" breadcrumb
      setSelectedSubfolder(null);
      setBreadcrumbPath([{ id: "null", name: "AI" }]);
      fetchSubFolders("null");
    } else {
      // For other breadcrumb items
      setSelectedSubfolder(clickedFolder);
      const updatedPath = breadcrumbPath.slice(
        0,
        breadcrumbPath.findIndex((f) => f.id === clickedFolder.id) + 1
      );
      setBreadcrumbPath(updatedPath);
      fetchSubFolders(clickedFolder.id);
    }
  };

  // Handle back navigation
  const handleBackClick = () => {
    dispatch(getFiles([]))

    if (breadcrumbPath.length > 1) {
      // Ensure there is a previous folder to navigate back to
      const newPath = breadcrumbPath.slice(0, -1); // Remove the last folder from breadcrumb path
      const previousFolder = newPath[newPath.length - 1]; // Get the previous folder
      setSelectedSubfolder(previousFolder); // Set the previous folder as selected
      setBreadcrumbPath(newPath); // Update the breadcrumb path
      fetchSubFolders(previousFolder.id); // Fetch subfolders for the previous folder
    }
  };



  const [filterBody, setFilterBody] = useState({});

  const filterData = async () => {
    try {
      const result = await axios.post<{ data: any[] }>(
        `http://79.134.138.252:7111/ais/filter`,
        {
          ...filterBody,
          path: breadcrumbPath.map((item) => item.name).join("/"),
        }
      );
      console.log("API Response:", result.data);
      setFilterBody((prevBody) => ({
        ...prevBody,
        extension: undefined,
      }));
      if (result.data) {
        dispatch(getFiles(result.data));
      } else {
        console.warn("No data found in API response");
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  return (
    <div>
      <FilterComponent
        onFilterChange={setFilterBody}
        onApplyFilter={filterData}
      />
      <Breadcrumb
        path={breadcrumbPath}
        onBreadcrumbClick={handleBreadcrumbClick}
        onBackClick={handleBackClick}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {subfolders
          .filter((folder) => folder.document_type === "folder")
          .map((folder) => (
            <Link
              key={folder._id}
              to="#"
              onClick={() => handleFolderClick(folder)}
              aria-label={`Open folder ${folder.name}`}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                selectedSubfolder?.id === folder._id
                  ? "bg-slate-900 text-white border-transparent"
                  : "border-amber text-amber hover:bg-neutral-300 hover:border-white hover:text-black"
              }`}
            >
              <div className="flex flex-col">
                {StaticFolderSvg}
                <span className="font-medium text-sm">{folder.name}</span>
                <div className="flex flex-2 gap-2">
                  <span className="mt-1 text-amber-500 dark:text-white">
                    {folder.total_files} Files
                  </span>
                  <span className="mt-1 text-green-500 dark:text-white">
                    {folder.total_folders} Folders
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SubFolder;

/*
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FOLDER } from "../../../types/folder";
import { useDispatch, useSelector } from "react-redux";
import {
  getFiles,
  getSubFolder,
  getSubFolders,
} from "../../../redux/AI/aisSlice";
import axios from "axios";
import Breadcrumb from "./Breadcrumb"; // Import your breadcrumb component
import { StaticFolderSvg } from "../../Static/folder.svg";
import FilterComponent from "../../Filteration/FilterComponent";

interface FolderProps {
  mainFolderId: string; // You can still use this prop to fetch specific folders
}

interface RootState {
  AI: {
    subfolders: FOLDER[];
  };
}

const SubFolder: React.FC<FolderProps> = ({ mainFolderId }) => {
  // Redux
  const { subfolders } = useSelector((state: RootState) => ({
    subfolders: state.AI.subfolders,
  }));

  const dispatch = useDispatch();

  // Initialize breadcrumb with the main folder
  const [selectedSubfolder, setSelectedSubfolder] = useState<{ id: string; name: string } | null>(null);
  const [breadcrumbPath, setBreadcrumbPath] = useState<{ id: string; name: string }[]>([
    { id: "null", name: "AI" }, // Starting breadcrumb item
  ]);

  // State to track the previous folder
  const [previousFolder, setPreviousFolder] = useState<{ id: string; name: string } | null>(null);

  // ------ Fetch SubFolders ------ 
  const fetchSubFolders = async (folderId: string) => {
    try {
      const result = await axios.post<{ data: FOLDER[] }>(
        `http://79.134.138.252:7111/ais/filter`,
        {
          parent_id: folderId,
        }
      );
      console.log("Fetched Subfolders:", result.data); // Log the data to verify it's being fetched correctly

      if (result.data) {
        dispatch(getSubFolders(result.data));
      } else {
        dispatch(getSubFolders([]));
      }
    } catch (error) {
      console.error("Error fetching subfolders:", error);
    }
  };

  // ------ Fetch on initial load and when mainFolderId changes ------ 
  useEffect(() => {
    fetchSubFolders(mainFolderId); // Fetch subfolders based on the mainFolderId
  }, [mainFolderId, dispatch]);

  // Handle folder click
  const handleFolderClick = (folder: FOLDER) => {
    const subfolderDetails = { id: folder._id, name: folder.name };
    setPreviousFolder(selectedSubfolder); // Save the current folder as previous before navigating
    setSelectedSubfolder(subfolderDetails);
    setBreadcrumbPath(prev => [...prev, subfolderDetails]);
    dispatch(getSubFolder(subfolderDetails));

    localStorage.setItem('selectedAISubFolder', JSON.stringify(subfolderDetails));

    fetchSubFolders(folder._id); // Fetch subfolders based on the clicked folder
  };

  // Handle breadcrumb click
  const handleBreadcrumbClick = (clickedFolder: { id: string; name: string }) => {
    if (clickedFolder.id === "null") {
      // When clicking on the main "AI" breadcrumb
      setSelectedSubfolder(null); // Reset selected subfolder
      setBreadcrumbPath([{ id: "null", name: "AI" }]); // Reset breadcrumb path to only include the main folder
      fetchSubFolders("null"); // Fetch top-level folders again
    } else {
      // For other breadcrumb items
      setSelectedSubfolder(clickedFolder);
      const updatedPath = breadcrumbPath.slice(0, breadcrumbPath.findIndex(f => f.id === clickedFolder.id) + 1);
      setBreadcrumbPath(updatedPath);
      fetchSubFolders(clickedFolder.id); // Fetch subfolders for the clicked breadcrumb
    }
  };

  // Handle back navigation
  const handleBackClick = () => {
    if (previousFolder) {
      setSelectedSubfolder(previousFolder); // Go back to the previous folder
      const updatedPath = breadcrumbPath.slice(0, breadcrumbPath.findIndex(f => f.id === previousFolder.id) + 1);
      setBreadcrumbPath(updatedPath);
      fetchSubFolders(previousFolder.id); // Fetch subfolders for the previous folder
      setPreviousFolder(null); // Reset previous folder after going back
    }
  };

  const [filterBody, setFilterBody] = useState({});

  const filterData = async () => {
    try {
      const result = await axios.post<{ data: any[] }>(
        `http://79.134.138.252:7111/ais/filter`,
        {
          ...filterBody,
          path: breadcrumbPath.map((item) => item.name).join("/"),
        }
      );
      console.log("API Response:", result.data); // Log the entire response
      setFilterBody((prevBody) => ({
        ...prevBody,
        extension: undefined,
      }));
      if (result.data) {
        dispatch(getFiles(result.data));
      } else {
        console.warn("No data found in API response");
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  return (
    <div>
      <FilterComponent
        onFilterChange={setFilterBody} // Pass setFilterBody as a callback
        onApplyFilter={filterData} // Trigger filter when Apply button is clicked
      />
      <Breadcrumb
        path={breadcrumbPath}
        onBreadcrumbClick={handleBreadcrumbClick}
        onBackClick={handleBackClick} // Pass the back click handler to the Breadcrumb
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {subfolders
          .filter((folder) => folder.document_type === "folder")
          .map((folder) => (
            <Link
              key={folder._id}
              to="#"
              onClick={() => handleFolderClick(folder)}
              aria-label={`Open folder ${folder.name}`}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                selectedSubfolder?.id === folder._id
                  ? "bg-slate-900 text-white border-transparent"
                  : "border-amber text-amber hover:bg-neutral-300 hover:border-white hover:text-black"
              }`}
            >
              <div className="flex flex-col">
                {StaticFolderSvg}
                <span className="font-medium text-sm">{folder.name}</span>
                <div className="flex flex-2 gap-2">
                  <span className="mt-1 text-amber-500 dark:text-white">
                    {folder.total_files} Files
                  </span>
                  <span className="mt-1 text-green-500 dark:text-white">
                    {folder.total_folders} Folders
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SubFolder;

 */
