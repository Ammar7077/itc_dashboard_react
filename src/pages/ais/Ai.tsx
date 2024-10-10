import React from 'react'
import TableOne from '../../components/Tables/TablesFiles'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import MultiSelect from '../../components/Filteration/MultiSelect'
import DatePickerOne from '../../components/Filteration/DatePickerOne'
import Folder from '../../components/Folders/Folder'

const Ai = () => {
  return (

    <>
    <Breadcrumb pageName='AI'/>
     
     {/* will props name of folders here */}
{/*     <Folder folders={""}/>
 */}
    <div className='grid grid-cols-1 gap-9 sm:grid-cols-3 mb-10'>
        {/* <!-- Time and date --> */}
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

        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark' >
            <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>
                    Input Fields
                </h3>
            </div>

            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Default Input
                </label>
                <input
                  type="text"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              </div>
        </div>
        
        {/* <!-- Select --> */}
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

 {/*     <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
 */}

    <div className="flex flex-col gap-10">
        <TableOne/>
    </div>
    </>
)
}

export default Ai