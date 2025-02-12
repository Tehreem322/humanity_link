import React from 'react'

const ContactTable = () => {
    const tableData = [
        {
          fullName: "Kieran Moula",
          emailAddress: "kieran@company.com",
          inquiryType: "General inquiry",
          messagee: "I'm interested in learning more about your workshops for our company",
          action: "Remove",
        },

      ];
  return (
    <>  <>  {/* table */}
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
                        <p>Full name</p>
                      </span>
                    </th>
                    <th>
                      <div className="px-6 py-3 text-left font-medium secondary-para">
                        <span>
                          <p>Email address</p>
                        </span>
                      </div>
                    </th>
                    <th className="">
                      <div className="px-6 py-3 text-left font-medium secondary-para">
                        <span>
                          <p>Inquiry type</p>
                        </span>
                      </div>{" "}
                    </th>
                    <th className="">
                      <div className="px-6 py-3 text-left font-medium secondary-para">
                        <span>
                          <p>Messagee</p>
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
                            <p className="secondary-para2">{item?.fullName}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <p className="secondary-para2"> {item?.emailAddress}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <p className="secondary-para2"> {item?.inquiryType}</p>
                          </div>
                        </td>
                       
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                            <p className="secondary-para2"> {item?.messagee}</p>
                          </div>
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
    </div></></>
  )
}

export default ContactTable