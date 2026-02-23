import type { Metadata } from "next"
import "./globals.css"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "E-Kinerja",
  description: "Sistem Laporan Kinerja",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">

        <SidebarProvider>
          <div className="flex min-h-screen w-full">

            {/* Sidebar */}
            <AppSidebar />

            {/* Main Content Area */}
            <SidebarInset className="flex flex-1 flex-col">

             <Header
              title="Dashboard"
              userName="Maw"
              role="super_admin"
              avatarUrl=""
            />
              {/* Page Content */}
              <main className="flex-1 p-6">
                {children}
              </main>

            </SidebarInset>

          </div>
        </SidebarProvider>

      </body>
    </html>
  )
}