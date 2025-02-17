
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, Flag, Users } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/reports", label: "Reports", icon: Flag },
];

export function AdminNav() {
  const location = useLocation();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-semibold">
              ProductHunt Admin
            </Link>
            <div className="hidden md:flex md:space-x-4">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  className={cn(
                    "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    location.pathname === href
                      ? "text-primary bg-primary/5"
                      : "text-gray-600 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
