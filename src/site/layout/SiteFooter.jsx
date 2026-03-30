import React from 'react'
import { Icon } from '@iconify/react'

function SiteFooter() {
  return (
      <footer className="bg-white border-t mt-10">
        <div className="max-w-6xl mx-auto py-10 px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-4">
                <Icon icon="mdi:blog" className="text-2xl text-blue-600" />
                <span className="text-xl font-bold text-gray-800">MyBlog</span>
              </a>
              <p className="text-gray-600 mb-4 max-w-sm">
                Sharing knowledge, insights, and inspiration on tech, design, and life. Join our community today!
              </p>
              <div className="flex gap-3">
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition">
                  <Icon icon="mdi:facebook" className="text-lg" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-blue-400 hover:text-white transition">
                  <Icon icon="mdi:twitter" className="text-lg" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-pink-600 hover:text-white transition">
                  <Icon icon="mdi:instagram" className="text-lg" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-blue-700 hover:text-white transition">
                  <Icon icon="mdi:linkedin" className="text-lg" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition">Home</a></li>
                <li><a href="#categories" className="hover:text-blue-600 transition">Categories</a></li>
                <li><a href="#posts" className="hover:text-blue-600 transition">Latest Posts</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">About Us</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:email" className="text-blue-600" />
                  hello@myblog.com
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:map-marker" className="text-blue-600" />
                  San Francisco, CA
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 MyBlog. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default SiteFooter
