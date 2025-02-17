
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any[];
}

export const CrawlForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    
    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      // Add the URL to scheduled scrapes
      const { error: scheduleError } = await supabase
        .from('scheduled_scrapes')
        .insert({
          url,
          frequency: '1 day', // Default to daily scraping
          next_run: new Date().toISOString()
        });

      if (scheduleError) throw scheduleError;

      // For demo purposes, let's also add a sample product immediately
      const { error: productError } = await supabase
        .from('products')
        .insert({
          title: "New Product from " + new URL(url).hostname,
          description: "This is an automatically scraped product.",
          source_url: url,
          moderation_status: 'approved', // Auto-approve for demo
          category: "AI & Machine Learning",
          image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
        });

      clearInterval(progressInterval);
      setProgress(100);

      if (productError) throw productError;
      
      toast({
        title: "Success",
        description: "URL has been added to scraping queue and initial product created",
      });

      setUrl('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process URL",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mb-12 p-6 glass-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium text-gray-700">
            Add a product via URL
          </label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full transition-all duration-200"
            required
          />
        </div>
        {isLoading && (
          <Progress value={progress} className="w-full" />
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isLoading ? "Processing..." : "Add Product"}
        </Button>
      </form>
    </Card>
  );
}
