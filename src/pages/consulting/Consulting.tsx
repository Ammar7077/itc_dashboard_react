import React, { useEffect } from 'react';
import TableOne from '../../components/Tables/TablesFiles';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MultiSelect from '../../components/Filteration/MultiSelect';
import DatePickerOne from '../../components/Filteration/DatePickerOne';
import Folder from '../../components/Folders/Folder';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, getFolders } from '../../redux/consulting/consultingSlice';
import { FOLDER } from '../../types/folder';
import { FILE } from '../../types/file';
import InputText from '../../components/Filteration/InputText';


interface RootState {
    consulting: {
        folders: FOLDER[];
    };
}

const Consulting: React.FC = () => {
    const dispatch = useDispatch();

    const { folders } = useSelector((state: RootState) => ({
        folders: state.consulting.folders,
    }));

    //--------------get Folders ----
    const fetchFolders = async () => {
        try {
            const result = await axios.get<{ data: FOLDER[] }>(`http://localhost:3000/consultings`);
            if (result.data) {
                console.log(result.data.data);
                dispatch(getFolders(result.data.data)); 
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
        fetchFolders(); // Fetch folders on component mount
    }, []);

    return (
        <>
            <Breadcrumb pageName='Consultings' />
            <Folder folders={folders} title={"Consulting's Folders"}  /> 
            <div className='grid grid-cols-1 gap-9 sm:grid-cols-3 mb-10'>
                {/* Time and date */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Time and date
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <DatePickerOne />
                    </div>
                </div>

                <InputText/>

                {/* Select */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Select input
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <MultiSelect id="multiSelect" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <TableOne />
            </div>
        </>
    );
}

export default Consulting;
