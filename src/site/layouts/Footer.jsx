import React from 'react';
import { Icon } from "@iconify/react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Icon icon="mdi:blog" className="text-white text-xl" />
                </div>
                <span className="text-xl font-bold text-white">BlogHub</span>
              </div>
              <p className="mb-6 leading-relaxed">
                Empowering creators to share their voice with beautifully designed, easy-to-use blogging tools.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'github', 'linkedin', 'instagram'].map(social => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                  >
                    <Icon icon={`mdi:${social}`} className="text-white" />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
              { title: 'Resources', links: ['Documentation', 'Tutorials', 'Blog', 'Community'] },
              { title: 'Company', links: ['About', 'Careers', 'Contact', 'Privacy'] }
            ].map(column => (
              <div key={column.title}>
                <h4 className="text-white font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map(link => (
                    <li key={link}>
                      <button className="hover:text-white transition-colors">{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} BlogHub. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <button className="hover:text-white transition-colors">Terms</button>
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
