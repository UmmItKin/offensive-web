import * as React from "react";
import { Icon } from "@iconify/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

interface SidebarLayoutProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  currentPath: string;
}

const menuItems = [
  {
    href: "/reverse-shell",
    title: "Reverse Shell",
    icon: "mdi:console",
  },
  {
    href: "/url-injection",
    title: "URL Injection",
    icon: "mdi:web",
  },
  {
    href: "/base64",
    title: "Base64",
    icon: "mdi:code-string",
  },
];

function SidebarContentWrapper({ currentPath }: { currentPath: string }) {
  const { state } = useSidebar();
  
  return (
    <SidebarContent>
      <SidebarGroup>
        {state === "expanded" && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-bold">Offensive Web</h2>
          </div>
        )}
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={currentPath === item.href || (item.href === "/reverse-shell" && currentPath === "/")}
                  tooltip={item.title}
                >
                  <a href={item.href}>
                    <Icon icon={item.icon} className="w-5 h-5" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

export function SidebarLayout({ children, defaultOpen = true, currentPath }: SidebarLayoutProps) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarContentWrapper currentPath={currentPath} />
        </Sidebar>
        <main className="flex-1 overflow-auto flex flex-col">
          <div className="sticky top-0 z-10 bg-background border-b px-4 py-3 flex items-center gap-2">
            <SidebarTrigger />
          </div>
          <div className="container mx-auto p-8 flex-1">
            {children}
          </div>
        </main>
      </div>
      <Toaster position="bottom-right" />
    </SidebarProvider>
  );
}
