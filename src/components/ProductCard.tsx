
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  upvotes: number;
  category: string;
}

export function ProductCard({ title, description, image, upvotes, category }: ProductCardProps) {
  return (
    <Card className="glass-card hover-card overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-primary/60 mb-2">
              {category}
            </p>
            <h3 className="font-semibold text-xl leading-tight text-primary">
              {title}
            </h3>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full hover:bg-primary/5"
          >
            <ThumbsUp className="h-5 w-5" />
            <span className="ml-2 text-sm">{upvotes}</span>
          </Button>
        </div>
        <p className="text-secondary text-sm line-clamp-2">
          {description}
        </p>
      </div>
    </Card>
  );
}
