import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router'
import CTAButton from '../Common/Button/CTAButton'
import { Loader } from 'lucide-react'

const CompanyReports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { programId } = useParams()

  console.log(programId)
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/reports/allProgramReports`,
          {
            withCredentials: true,
          }
        )
        console.log(response)

        const allReports = response.data?.reports || []

        const filteredReports =
          programId === 'all'
            ? allReports
            : allReports.filter((report) => report.programId?._id === programId)

        setReports(filteredReports)
      } catch (err) {
        setError('Failed to fetch reports')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [BASE_URL, programId])

  if (loading) return <Loader />
  if (error) return <div>{error}</div>
  if (reports.length === 0) return <div>No Reports found</div>

  return (
    <div className="p-4">
      <div>hii</div>
    </div>
  )
}

export default CompanyReports
