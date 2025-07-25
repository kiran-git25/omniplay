import { PlayIcon, Grid3x3, Search, Settings, Menu, Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <PlayIcon className="w-5 h-5 text-white fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-white">OpenMedia</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Universal Player</span>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
              Media Library
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
              Archive Tools
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
              Playlists
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Button>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
              <Search className="w-5 h-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  {theme === "light" ? <Sun className="w-5 h-5" /> : 
                   theme === "dark" ? <Moon className="w-5 h-5" /> : 
                   <Monitor className="w-5 h-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary mobile-touch"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 space-y-1">
            <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300">
              Media Library
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300">
              Archive Tools
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300">
              Playlists
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
