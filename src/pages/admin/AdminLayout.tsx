import { useState } from 'react'
import { useNavigate, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '@/components/theme-provider'
import { Settings } from 'lucide-react'

import EmployeeList from './EmployeeList'
import AttendanceCapture from './AttendanceCapture'
import AttendanceList from './AttendanceList'
import Reports from './Report'
import AdminHome from './AdminHome'
import DesktopSidebar from '@/components/DesktopSidebar'
import MobileSidebar from '@/components/MobileSidebar'

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation() // Lấy location
  const { theme, setTheme } = useTheme()

  // Xử lý chuyển hướng menu
  const handleNavigation = (path: string) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  // Toggle chế độ sáng/tối
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className='flex h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Desktop Sidebar */}
      <DesktopSidebar
        currentPath={location.pathname}
        theme={theme}
        handleNavigation={handleNavigation}
        toggleTheme={toggleTheme}
        userRole='admin'
      />

      {/* Mobile Header & Menu */}
      <div className='flex flex-col flex-1'>
        <MobileSidebar
          theme={theme}
          handleNavigation={handleNavigation}
          toggleTheme={toggleTheme}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          userRole='admin'
        />
        {/* Main Content */}
        <main className='flex-1 overflow-y-auto p-4 md:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
