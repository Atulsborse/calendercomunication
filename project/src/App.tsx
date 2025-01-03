import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { UserDashboard } from '@/components/user/UserDashboard';
import { Calendar } from '@/components/calendar/Calendar';
import { Analytics } from '@/components/analytics/Analytics';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { useAuthStore } from '@/store/useAuthStore';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { LogOut } from 'lucide-react';
import { Button } from './components/ui/button';

function App() {
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Communication Calendar</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {user?.name} ({user?.role})
                </span>
                <NotificationBell />
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue={isAdmin ? 'admin' : 'user'} className="space-y-4">
            <TabsList>
              {!isAdmin && <TabsTrigger value="user">User Dashboard</TabsTrigger>}
              {isAdmin && (
                <>
                  <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </>
              )}
            </TabsList>

            {!isAdmin && (
              <TabsContent value="user">
                <UserDashboard />
              </TabsContent>
            )}

            {isAdmin && (
              <>
                <TabsContent value="admin">
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                </TabsContent>

                <TabsContent value="calendar">
                  <ProtectedRoute requiredRole="admin">
                    <Calendar />
                  </ProtectedRoute>
                </TabsContent>

                <TabsContent value="analytics">
                  <ProtectedRoute requiredRole="admin">
                    <Analytics />
                  </ProtectedRoute>
                </TabsContent>
              </>
            )}
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default App;