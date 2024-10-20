import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FOLDER } from '../../../types/folder';
import { useDispatch, useSelector } from 'react-redux';
import { getMainFolder, getSubFolder, getSubFolders } from '../../../redux/AI/aisSlice';
import axios from 'axios';
import Breadcrumb from './Breadcrumb'; // Import your breadcrumb component

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

    return (
        <div>
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
