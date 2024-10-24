import { FC } from "react";
import { TFile } from "../core/types/file";

interface FilterProps {
  filesList: TFile[];
}

export const TableFiles: FC<FilterProps> = ({ filesList }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/*  ------ Head ------ */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Path
            </th>
            <th scope="col" className="px-6 py-3">
              extension
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {/*  ------ Body ------ */}
        <tbody>
          {/* ---------- Row --------- */}
          {/* ------------------------ */}
          {filesList.map((item) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.path.pathString}</td>
              <td className="px-6 py-4">{item.extension}</td>
              <td className="px-6 py-4">{item.size}</td>
              <td className="inline-flex px-6 py-4">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  {"Show file info"}
                </button>
                <div className="m-2"> | </div>
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  {"Download the file"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
