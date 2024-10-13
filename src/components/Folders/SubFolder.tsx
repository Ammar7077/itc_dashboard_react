import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FOLDER } from '../../types/folder';
import { useDispatch, useSelector } from 'react-redux';
import { getMainFolder, getSubFolder, getSubFolders } from '../../redux/consulting/consultingSlice';
import axios from 'axios';
import Breadcrumb from './Breadcrumb';

interface FolderProps {
    mainFolderId: string;
}

interface RootState {
    consulting: {
        subfolders: FOLDER[];
    };
}

const SubFolder: React.FC<FolderProps> = ({ mainFolderId }) => {
    const { subfolders } = useSelector((state: RootState) => ({
        subfolders: state.consulting.subfolders,
    }));

    const [selectedSubfolder, setSelectedSubfolder] = useState<{ id: string; name: string } | null>(null);
    const [breadcrumbPath, setBreadcrumbPath] = useState<{ id: string; name: string }[]>([]); 

    const dispatch = useDispatch();

    // ------ Fetch SubFolders ------
    const fetchSubFolders = async (folderId: string) => {
        try {
            const result = await axios.post<{ data: FOLDER[] }>(`http://localhost:3000/ais/filter`, {
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

    useEffect(() => {
        const savedFolder = localStorage.getItem('selectedFolder');
        if (savedFolder) {
            const folderDetails = JSON.parse(savedFolder);
            setBreadcrumbPath([{ id: folderDetails.id, name: folderDetails.name }]); // Set breadcrumb with the main folder
            fetchSubFolders(mainFolderId); // Fetch subfolders for the main folder
        }
    }, [mainFolderId, dispatch]);

    const handleFolderClick = (folder: FOLDER) => {
        const subfolderDetails = { id: folder._id, name: folder.name };
        setSelectedSubfolder(subfolderDetails);
        setBreadcrumbPath(prev => [...prev, subfolderDetails]); // Update breadcrumb path
        dispatch(getSubFolder(subfolderDetails));

        // Save the selected subfolder in local storage
        localStorage.setItem('selectedSubFolder', JSON.stringify(subfolderDetails));

        // Fetch the subfolders for the selected folder
        fetchSubFolders(folder._id);
    };

    // Function to handle breadcrumb navigation
    const handleNavigateBack = (folderId: string) => {
        const updatedPath = breadcrumbPath.filter(folder => folder.id !== folderId);
        setBreadcrumbPath(updatedPath);

        // If there's a parent folder, fetch its subfolders
        if (updatedPath.length > 0) {
            const parentFolderId = updatedPath[updatedPath.length - 1].id;
            fetchSubFolders(parentFolderId);
        }
    };

    return (
        <div>
            <Breadcrumb path={breadcrumbPath} onNavigate={handleNavigateBack} />
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
