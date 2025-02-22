import React, { useState } from 'react'
import axios from '../config/axios'

const UploadForm = () => {
  const [urls, setUrls] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const urlList = urls.split('\n').filter((url) => url.trim())

      await axios.post('/scrape', {
        urls: urlList,
      })

      setMessage({
        type: 'success',
        text: `Successfully added ${urlList.length} URLs for scraping`,
      })
      setUrls('')
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to submit URLs',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Add URLs to Scrape</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="4"
          placeholder="Enter URLs (one per line)"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          disabled={loading}
        />

        {message && (
          <div
            className={`mt-4 p-3 rounded ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !urls.trim()}
          className={`mt-4 px-6 py-2 rounded-lg text-white font-medium
            ${
              loading || !urls.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {loading ? 'Processing...' : 'Start Scraping'}
        </button>
      </form>
    </div>
  )
}

export default UploadForm
