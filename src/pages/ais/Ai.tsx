import React, { useEffect,useState } from 'react';
import TableOne from '../../components/Tables/AI/TableFiles';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MultiSelect from '../../components/Filteration/MultiSelect';
import DatePickerOne from '../../components/Filteration/DatePickerOne';
import Folder from '../../components/Folders/AI/Folder';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, getFolders } from '../../redux/AI/aisSlice';
import { FOLDER, MAIN } from '../../types/folder';
import { FILE } from '../../types/file';
import InputText from '../../components/Filteration/InputText';
import CheckboxOne from '../../components/Filteration/CheckboxOne';
import CheckboxFive from '../../components/Filteration/CheckboxFive';
import SubFolder from '../../components/Folders/SubFolder';
import CheckBoxSubFolder from '../../components/Folders/CheckBoxSubFolder';


interface RootState {
    AI: {
        folders: FOLDER[];
        mainFolder:MAIN;
    };
}

const Ai: React.FC = () => {
    const [parentId, setParentId] =useState<string | null>(null)
    const dispatch = useDispatch();

    const { folders,mainFolder } = useSelector((state: RootState) => ({
        folders: state.AI.folders,
        mainFolder:state.AI.mainFolder
    }));

  const mainFolderName = mainFolder ? mainFolder.name : 'loading...';
  const mainFolderId = mainFolder ?mainFolder.id :'loading ...'

  //console.log(mainFolder?.name); // Safe logging
  //console.log(localStorage.getItem('selectedFolder'));
  //console.log(mainFolderName);  

    //--------------get Folders ----
    const fetchFolders = async () => {
        try {
            const result = await axios.post<{ data: FOLDER[] }>(`http://79.134.138.252:7111/jsonls/filter`, {
                parent_id: parentId,
            });
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
    }, [dispatch,parentId]); 
        
    return (
        <>
            <Breadcrumb pageName='AI' />
            <Folder folders={folders || []} title={"ais's Folders"}  /> 
            <div className='grid grid-cols-1 gap-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mb-10'>
                
                {/* <InputText/> */}

                 {/* <!-- Checkbox and radio --> */}
             <div className="col-span-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                     <h3 className="font-medium text-black dark:text-white">
                     Subfolders on {mainFolderName}
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-2">
                <SubFolder mainFolderId={mainFolderId}/>
                </div>
             </div>
{/* 
             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                     <h3 className="font-medium text-black dark:text-white">
                     Language on {mainFolderName}
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                <CheckBoxSubFolder/>
                </div>
             </div> */}

                {/* Select */}
             {/*    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Categories for {mainFolderName}
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <MultiSelect id="multiSelect" />
                        <DatePickerOne />

                    </div>
                </div> */}

                {/* Time and date */}
                {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Date for {mainFolderName} Files
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <DatePickerOne />
                    </div>
                </div> */}

            </div>

            <div className="flex flex-col gap-10">
                <TableOne AI={{
                    fileInfo:{
                        _id: "string",
                        parent_id: "string",
                        name: "string",
                        size:0 ,
                        extension:"string",
                        document_type: "string",
                        path:{
                            pathString:"string"
                        },
                    },
                    subFolder: {
                        id: '',
                        name: ''
                    },
                    files: [],
                }} />
            </div> 
        </>
    );
}

export default Ai;
