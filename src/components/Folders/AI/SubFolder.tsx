import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FOLDER } from '../../../types/folder';
import { useDispatch, useSelector } from 'react-redux';
import { getFileInfo, getFiles, getfolderId, getFolderIdSub, getMainFolder, getSubFolder, getSubFolders } from '../../../redux/AI/aisSlice';
import axios from 'axios';
import Breadcrumb from './Breadcrumb'; // Import your breadcrumb component
import { FILE } from '../../../types/file';
import { StaticFolderSvg } from '../../Static/folder.svg';

interface FolderProps {
    mainFolderId: string;
}

interface RootState {
    AI: {
        fileId: string;
        folderIdSub: string;
        subfolders: FOLDER[];
    };
}

const SubFolder: React.FC<FolderProps> = ({ mainFolderId }) => {


    const list = [
        {
            _id: "Arts",
            parent_id: "string",
            name: "Arts",
            total_files: "541",
            total_folders: "0",
            document_type: "0",
        }, {
            _id: "Dictionaries",
            parent_id: "Dictionaries",
            name: "Dictionaries",
            total_files: "1683",
            total_folders: "0",
            document_type: "0",
        }, {
            _id: "Engineering",
            parent_id: "0",
            name: "Engineering",
            total_files: "651",
            total_folders: "0",
            document_type: "0",
        }
    ]

    // Redux 
    const { subfolders, fileId, folderIdSub } = useSelector((state: RootState) => ({
        subfolders: state.AI.subfolders,
        fileId: state.AI.fileId,
        folderIdSub: state.AI.folderIdSub


    }));
    console.log("fileId", fileId);


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

    /// files

    const fetchFiles = async () => {
        //setLoading(true);

        try {
            const result = await axios.post<{
                length: number; data: FILE[]
            }>(`http://79.134.138.252:7111/ais/filter`, {
                path: folderIdSub
            });

            if (result.data && result.data.length > 0) {
                dispatch(getFiles(result.data)); // Update Redux state with the new files
                console.log(result.data, "filessssssss");

            }

        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    //console.log("folderIdSub",folderIdSub);


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

    // Once the subfolder is clicked
    const handleFolderClick = (folderId: string) => {
        dispatch(getFolderIdSub(folderId))
        fetchFiles()
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
            {fileId == "Books" && <>
                {/* <Breadcrumb path={breadcrumbPath} onBreadcrumbClick={handleBreadcrumbClick} /> */}
                <div className="flex flex-wrap gap-2">
                    {list.map((folder) => (
                        <Link
                            key={folder._id}
                            to="#"
                            onClick={() => handleFolderClick(folder._id)}
                            aria-label={`Open folder ${folder.name}`}
                            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${selectedSubfolder?.id === folder._id
                                    ? 'bg-slate-900 text-white border-transparent'
                                    : 'border-amber text-amber hover:bg-neutral-300 hover:border-white hover:text-black'
                                }`}
                        >
                            <div className="flex flex-col">
                                {StaticFolderSvg}
                                <span className="font-medium text-sm">{folder.name}</span>
                                <span className="mt-1 text-amber-500 dark:text-white">{folder.total_files} Files</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>}
        </div>
    );
};

export default SubFolder;
