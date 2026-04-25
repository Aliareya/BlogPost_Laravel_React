import React from 'react'

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <span className="text-xl font-serif font-semibold text-gray-900">Inkwell</span>
            </div>
            <p className="text-gray-600 text-sm">
              A place for thoughtful writing, curated stories, and fresh perspectives.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Posts</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Technology</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Lifestyle</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Travel</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Design</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Inkwell Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer