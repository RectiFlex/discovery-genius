
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "All",
  "AI & Machine Learning",
  "Virtual Reality",
  "IoT & Smart Home",
  "Blockchain",
  "SaaS",
  "Mobile Apps",
];

export function CategoryFilter() {
  return (
    <div className="flex gap-2 pb-8 overflow-x-auto hide-scrollbar">
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          variant="outline"
          className="whitespace-nowrap rounded-full hover:bg-primary hover:text-white transition-colors"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
