import ProgramHeader from "../ProgramData/ProgramHeader"
import ProgramRibbonData from "./ProgramRibbon"

const ProgramDetail = () => {
 
  return (
    <>
<div className="flex flex-col lg:flex-row max-w-full mx-auto">
      {/* Middle Scrollable Content (Tabs) */}
      <div className="flex-1 max-h-screen px-4 py-6">
      <ProgramRibbonData/>
      </div>

      {/* Right Program Header */}
      <div className="w-full lg:w-[450px] p-4">
        <div className="sticky top-4">
          <ProgramHeader />
        </div>
      </div>
    </div>
    </>
  )
}

export default ProgramDetail
