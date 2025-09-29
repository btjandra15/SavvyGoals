import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BarChart3, PiggyBank, Plus, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Savvy Goals",
  description: "An app to track your saving goals",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const navigationItems = [
    {
      label: "Goals",
      items: [
        { title: "Dashboard", url: "/dashboard/savings", icon: BarChart3 },
        { title: "My Goals", url: "/dashboard/savings/my_goals", icon: Target },
        { title: "Add Goal", url: "/dashboard/savings/add_goal", icon: Plus },
      ],
    },
    {
      label: "Budgeting",
      items: [
        { title: "Overview", url: "/dashboard/budget", icon: PiggyBank },
        { title: "Budget Setup", url: "/dashboard/budget/budget_setup", icon: TrendingUp },
      ],
    },
  ];

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SidebarProvider>
            <style>{`
              :root {
                --primary-navy: #1a365d;
                --primary-emerald: #10b981;
                --primary-coral: #f56565;
                --bg-luxury: #fafbfc;
                --text-primary: #2d3748;
                --text-secondary: #718096;
                --shadow-premium: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
              }
            `}</style>
            
            <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
              <SignedIn>
              <Sidebar className="border-r border-slate-200/60">
                <SidebarHeader className="border-b border-slate-200/60 p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <PiggyBank className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900 text-lg">
                        <Link href="/dashboard">SavvyGoals</Link>
                      </h2>

                      <p className="text-xs text-slate-500">Track your savings goals</p>
                    </div>
                  </div>
                </SidebarHeader>
                
                <SidebarContent className="p-3">
                  {navigationItems.map((module) => (
                    <SidebarGroup key={module.label}>
                      <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                        {module.label}
                      </SidebarGroupLabel>
                      
                      <SidebarGroupContent className="overflow-y-auto">
                        <SidebarMenu className="space-y-1 overflow-y-auto">
                          {module.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                              <SidebarMenuButton asChild className="group hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-xl px-4 py-3">
                                <Link href={item.url} className="flex items-center gap-3">
                                  <item.icon className="w-5 h-5" />
                                  <span className="font-medium">{item.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  ))}
                </SidebarContent>


                <SidebarFooter className="border-t border-slate-200/60 p-4">
                  <div className="flex items-center gap-3">
                    <UserButton/>
                  </div>
                </SidebarFooter>
              </Sidebar>
              </SignedIn>

              <main className="flex-1 flex flex-col">
                <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 md:hidden">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
                    <h1 className="text-xl font-bold text-slate-900">SaveSmart</h1>
                  </div>
                </header>

                <div className="flex-1 overflow-auto">
                  {children}
                </div>
              </main>
            </div>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
