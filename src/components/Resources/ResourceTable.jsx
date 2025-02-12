import React from 'react'

const ResourceTable = () => {
  const tableData = [
    {
      name: "Introductory guide",
      file: "introduction-guide-to-co.pdf",
      downloads: "350",
      AvailableOnApp: "Electrician",
      action: "Remove",
    },
    {
      name: "Client leaflet",
      file: "Client leaflet.pdf",
      downloads: "112",
      AvailableOnApp: "Electrician",
      action: "Remove",
    },
  ];
  return (
    <>  {/* table */}
    <div className="w-full mt-5">
      <div className="">
        <div className="flex flex-col">
          <div className="-my-2 py-2">
            <div className="align-middle inline-block w-full overflow-x-auto sm:rounded-md border-b border-gray-200">
              <table className="min-w-full">
                {/* HEAD start */}
                <thead>
                  <tr className="bg-[#4BBDCB33] border-b border-gray-200 text-xs leading-4 text-gray-500  tracking-wider">
                    <th className="px-6 py-3 text-left font-medium">#</th>
                    <th className="px-6 mt-1 md:mt-0 py-3 text-left font-medium secondary-para">
                      <span>
                        <p>Name</p>
                      </span>
                    </th>
                    <th>
                      <div className="px-6 py-3 text-left font-medium secondary-para">
                        <span>
                          <p>File</p>
                        </span>
                      </div>
                    </th>
                    <th className="">
                      <div className="px-6 py-3 text-left font-medium secondary-para">
                        <span>
                          <p>Downloads</p>
                        </span>
                      </div>{" "}
                    </th>
                    <th className="">
                      <div className="px-6 py-3 text-left font-medium secondary-para">
                        <span>
                          <p>Available on app</p>
                        </span>
                      </div>{" "}
                    </th>
                    <th className="">
                      <div className="px-6 py-3 text-left font-medium secondary-para">
                        <span>
                          <p>Action</p>
                        </span>
                      </div>{" "}
                    </th>
                  </tr>
                </thead>
                {/* HEAD end */}
                {/* BODY start */}
                <tbody className="bg-white">
                  {tableData?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                            <p className="secondary-para2">{index+1}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <p className="secondary-para2">{item?.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <p className="secondary-para2"> {item?.file}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <p className="secondary-para2"> {item?.downloads}</p>
                          </div>
                        </td>
                       
                        <td className="px-12 py-4 whitespace-no-wrap border-b border-gray-200">
                          <input
                            className="form-checkbox  h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            type="checkbox"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <p className="secondary-para3 flex items-center gap-2"><span>-</span> {item?.action}</p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* BODY end */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div></>
  )
}

export default ResourceTable