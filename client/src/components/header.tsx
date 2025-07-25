import { PlayIcon, Grid3x3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <PlayIcon className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-semibold text-gray-900">OpenMedia</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-gray-600 hover:text-primary">
              Library
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-primary">
              Playlists
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-primary">
              Settings
            </Button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-600 hover:text-primary">
              <Grid3x3 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
