import React, { useState, useEffect } from 'react'
import axios from '../config/axios'

const MediaGrid = () => {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [type, setType] = useState('')
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({})

  const fetchMedia = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get(`/media`, {
        params: { page, type, search },
      })

      setMedia(response.data.data)
      setPagination(response.data.pagination)
    } catch (error) {
      setError('Failed to fetch media')
      console.error('Error fetching media:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [page, type, search])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>

        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">{error}</div>}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item) => (
              <div key={item.id} className="relative bg-gray-100 rounded-lg overflow-hidden">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt="Media content"
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <video controls src={item.url} className="w-full h-48 object-cover" />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm truncate">
                  {item.sourceUrl}
                </div>
              </div>
            ))}
          </div>

          {media.length === 0 && !loading && (
            <div className="text-center text-gray-500 py-12">No media found</div>
          )}

          <div className="flex justify-between items-center mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 rounded-lg ${
                page === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>

            <span className="text-gray-600">
              Page {page} of {pagination.totalPages || 1}
            </span>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded-lg ${
                page === pagination.totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default MediaGrid
