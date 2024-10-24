import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FOLDER } from '../../core/types/folder';
import { useDispatch, useSelector } from 'react-redux';
import { getMainFolder, getSubFolder, getSubFolders } from '../../redux/AI/aisSlice';
import axios from 'axios';
import Breadcrumb from './Breadcrumb'; // Import your breadcrumb component
import { getFiles } from '../../redux/Media/MediaSlice';
import { StaticFolderSvg } from '../Static/folder.svg';

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

    // useState for Breadcrumb "path" plus Selection icon
    const [selectedSubfolder, setSelectedSubfolder] = useState<{ id: string; name: string } | null>(null);
    const [breadcrumbPath, setBreadcrumbPath] = useState<{ id: string; name: string }[]>([]); 
    const dispatch = useDispatch();

    // ------ Fetch SubFolders ------
    const fetchSubFolders = async (folderId: string) => {
        try {
            const result = await axios.post<{ data: FOLDER[] }>(`http://79.134.138.252:7111/ais/filter`, {
                parent_id: folderId,
            });
            if (result.data) {
                dispatch(getSubFolders(result.data));
            } else {
                dispatch(getSubFolders([]));
            }
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    // ------ when a folder is selected or when one is in localStorage 

    useEffect(() => {
        // Only fetch subfolders if the main folder is valid and selected
        if (!selectedSubfolder && mainFolderId) {
            const savedFolder = localStorage.getItem('selectedFolder');
            if (savedFolder) {
                const folderDetails = JSON.parse(savedFolder);

                setBreadcrumbPath([{ id: folderDetails.id, name: folderDetails.name }]); 

                fetchSubFolders(mainFolderId); 
            }
        }
    }, [mainFolderId, dispatch]);

    /* useEffect(() => {
    if (!selectedSubfolder && mainFolderId) {
        const savedFolder = localStorage.getItem('selectedFolder');
        if (savedFolder) {
            const folderDetails = JSON.parse(savedFolder);
            setBreadcrumbPath([{ id: folderDetails.id, name: folderDetails.name }]);
            fetchSubFolders(mainFolderId);
        }
    }
}, [mainFolderId, selectedSubfolder]);
 */

    // Once the subfolder is clicked
    const handleFolderClick = (folder: FOLDER) => {
        const subfolderDetails = { id: folder._id, name: folder.name };
        setSelectedSubfolder(subfolderDetails);
        setBreadcrumbPath(prev => [...prev, subfolderDetails]); 
        dispatch(getSubFolder(subfolderDetails));

        localStorage.setItem('selectedSubFolder', JSON.stringify(subfolderDetails));

        fetchSubFolders(folder._id);
    };

    // Handle breadcrumb click to navigate to a previous folder and make it active
    const handleBreadcrumbClick = (clickedFolder: { id: string; name: string }) => {
        setSelectedSubfolder(clickedFolder); 

        const updatedPath = breadcrumbPath.slice(0, breadcrumbPath.findIndex(f => f.id === clickedFolder.id) + 1);
        setBreadcrumbPath(updatedPath);

        fetchSubFolders(clickedFolder.id);
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
     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            File/Folder Name
          </label>
          <input
            onChange={(event) => {
              const name = event.target.value;
              setFilterBody((prevBody) => ({
                ...prevBody,
                name,
              }));
            }}
            type="text"
            id="fileFolderName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Path Contains
          </label>
          <input
            type="text"
            id="path"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            File Type
          </label>
          <select
            onChange={(event) => {
              const extension = event.target.value;
              setFilterBody((prevBody) => ({
                ...prevBody,
                extension,
              }));
            }}
            id="fileType"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select file type</option>
            <option value=".txt">.txt</option>
            <option value=".pdf">.pdf</option>
            <option value=".docx">.docx</option>
            <option value=".jpg">.jpg</option>
            <option value=".jsonl">.jsonl</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Size (bytes)
            </label>
            <input
              onChange={(event) => {
                const min_size = event.target.value;
                setFilterBody((prevBody) => ({
                  ...prevBody,
                  min_size: +min_size,
                }));
              }}
              type="number"
              id="minSize"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Size (bytes)
            </label>
            <input
              onChange={(event) => {
                const max_size = event.target.value;
                setFilterBody((prevBody) => ({
                  ...prevBody,
                  max_size: +max_size,
                }));
              }}
              type="number"
              id="maxSize"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Files Number
          </label>
          <input
            onChange={(event) => {
              const max_files_number = event.target.value;
              setFilterBody((prevBody) => ({
                ...prevBody,
                max_files_number: +max_files_number,
              }));
            }}
            type="number"
            id="maxFilesNumber"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Folders Number
            </label>
            <input
              onChange={(event) => {
                const min_folders_number = event.target.value;
                setFilterBody((prevBody) => ({
                  ...prevBody,
                  min_folders_number: +min_folders_number,
                }));
              }}
              type="number"
              id="minFoldersNumber"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Folders Number
            </label>
            <input
              onChange={(event) => {
                const max_folders_number = event.target.value;
                setFilterBody((prevBody) => ({
                  ...prevBody,
                  max_folders_number: +max_folders_number,
                }));
              }}
              type="number"
              id="maxFoldersNumber"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => {
            filterData();
          }}
          type="submit"
          className="w-50 mb-10 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Apply Filter
        </button>
      </div>
            <Breadcrumb path={breadcrumbPath} onBreadcrumbClick={handleBreadcrumbClick} />
            <div className="flex flex-wrap gap-2">
                {subfolders.map((folder) => (
                    <Link
                        key={folder._id}
                        to="#"
                        onClick={() => handleFolderClick(folder)}
                        aria-label={`Open folder ${folder.name}`}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                            selectedSubfolder?.id === folder._id
                                ? 'bg-slate-900 text-white border-transparent'
                                : 'border-amber text-amber hover:bg-neutral-300 hover:border-white hover:text-black'
                        }`}
                    >
                        <div className="flex flex-col">
                            <span className="font-medium text-sm">{folder.name}</span>
                            <span className="mt-1 text-amber-500 dark:text-white">{folder.total_files} Files</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SubFolder;
