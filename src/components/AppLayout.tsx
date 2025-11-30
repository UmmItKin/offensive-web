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

interface AppLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    id: "reverse-shell",
    title: "Reverse Shell",
    icon: "mdi:console",
  },
  {
    id: "url-injection",
    title: "URL Injection",
    icon: "mdi:web",
  },
  {
    id: "base64",
    title: "Base64",
    icon: "mdi:code-string",
  },
];

function SidebarContentWrapper({ currentSection, onSectionChange }: { currentSection: string; onSectionChange: (section: string) => void }) {
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
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => onSectionChange(item.id)}
                  isActive={currentSection === item.id}
                  tooltip={item.title}
                >
                  <Icon icon={item.icon} className="w-5 h-5" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

export function AppLayout({ children, currentSection, onSectionChange }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarContentWrapper currentSection={currentSection} onSectionChange={onSectionChange} />
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 bg-background border-b px-4 py-3">
            <SidebarTrigger />
          </div>
          <div className="container mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
