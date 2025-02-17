
import { Navbar } from "@/components/Navbar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { CrawlForm } from "@/components/CrawlForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Next-Gen Products
          </h1>
          <p className="text-lg text-gray-600">
            Explore and upvote the most innovative products across all industries
          </p>
        </div>
        <CrawlForm />
        <CategoryFilter />
        <ProductGrid />
      </main>
    </div>
  );
};

export default Index;
