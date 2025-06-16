import Vrt from '../assets/vrt.json'

const VrtData = () => {
  const vrtData = Vrt?.content || []

  return (
    <div className="p-6  h-screen overflow-hidden top-2">
      <h1 className="text-xl font-bold mb-4 sticky top-0 ">
        Vulnerability Report Table
      </h1>

      <div className="overflow-auto h-full">
        <table className="min-w-full table-auto border border-gray-300 shadow-md rounded">
          <thead className="overflow-auto sticky top-0 z-200 bg-neutral-300">
            <tr>
              <th className="border px-4 py-2 text-left">Priority</th>
              <th className="border px-4 py-2 text-left">VRT Category</th>
              <th className="border px-4 py-2 text-left">Subcategory</th>
              <th className="border px-4 py-2 text-left">Variant / Function</th>
            </tr>
          </thead>
          <tbody>
            {vrtData.map((category, idx) =>
              category.children?.map((subcategory, jdx) =>
                subcategory.children?.map((variant, kdx) => (
                  <tr key={`${idx}-${jdx}-${kdx}`} className="">
                    <td className="border px-4 py-2">
                      {variant.priority === 5 ? (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                          Critical
                        </span>
                      ) : variant.priority === 4 ? (
                        <span className="bg-yellow-400 text-black px-2 py-1 rounded text-sm">
                          High
                        </span>
                      ) : variant.priority === 3 ? (
                        <span className="bg-blue-300 text-black px-2 py-1 rounded text-sm">
                          Medium
                        </span>
                      ) : variant.priority === 2 ? (
                        <span className="bg-green-300 text-black px-2 py-1 rounded text-sm">
                          Low
                        </span>
                      ) : variant.priority === 1 ? (
                        <span className="bg-green-200 text-black px-2 py-1 rounded text-sm">
                          Informational
                        </span>
                      ) : (
                        <span className="bg-blue-300 text-black px-2 py-1 rounded text-sm">
                          Varies
                        </span>
                      )}
                    </td>
                    <td className="border px-4 py-2">{category.name}</td>
                    <td className="border px-4 py-2">{subcategory.name}</td>
                    <td className="border px-4 py-2">{variant.name}</td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VrtData
