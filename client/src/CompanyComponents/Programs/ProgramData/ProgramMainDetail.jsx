import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProgramData, updateProgramField } from '../../../Slices/programSlice.js';
import { useEffect, useState } from 'react';
import { apiConnector, endPoints } from '../../../Services/ApiConnector/api.js';
import Loader from '../../../Common/Loader.jsx';
import ProgramBox from '../../../HackerComponents/ProgramBox.jsx';
import ProgramTabs from './ProgramRibbon.jsx';

const ProgramMainDetail = () => {
  const { programId } = useParams();
  const dispatch = useDispatch();
  const program = useSelector((state) => state.program.programData);
  const token = useSelector((state) => state.auth.token);
  const userType = useSelector((state) => state.auth.userType);
  const [loading, setLoading] = useState(false);

  const changeVisibility = async () => {
    try {
      setLoading(true);
      const response = await apiConnector(
        'POST',
        endPoints.TOGGLE_LEADERBOARD_VISIBILITY,
        { programId },
      );
      console.log("Toggle response:", response);
      dispatch(updateProgramField({ field: 'leaderboardVisibility', value: response?.updatedProgram?.leaderboardVisibility }));

    } catch (error) {
      console.error("Failed to toggle visibility:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await apiConnector(
          'POST',
          endPoints.GET_PROGRAMBY_ID,
          { programId },
          {
            Authorization: `Bearer ${token}`,
          }
        );
        dispatch(setProgramData(response.data));
      } catch (error) {
        console.error('Failed to fetch program:', error);
      }
    };

    if (programId) {
      fetchProgram();
    }
  }, [programId, dispatch, token]);

  if (!program) return <Loader />;

  return (
    <div className="flex flex-col lg:flex-row max-w-full mx-auto">
      <div className="flex-1 max-h-screen px-4 py-6">
        {userType === 'company' && (
          <div className="mb-4 flex items-center gap-3 justify-end">
            <label className="text-white font-semibold">Leaderboard Visibility:</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={program?.leaderboardVisibility}
                onChange={changeVisibility}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 relative" />
            </label>
          </div>
        )}

        <ProgramTabs />
      </div>

      <div className="w-full lg:w-[450px] p-4">
        <div className="sticky top-4">
          <ProgramBox  />
        </div>
      </div>
    </div>
  );
};

export default ProgramMainDetail;
