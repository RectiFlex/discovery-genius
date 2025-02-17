
import { Button } from "@/components/ui/button";
import { LogIn, Plus } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-semibold">ProductHunt</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Submit
          </Button>
          <Button className="gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
}
