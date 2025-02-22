import React from 'react'
import MediaGrid from './components/MediaGrid'
import UploadForm from './components/UploadForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Media Scraper</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <UploadForm />
        <MediaGrid />
      </main>
    </div>
  )
}

export default App
