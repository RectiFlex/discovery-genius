
import { ProductCard } from "./ProductCard";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Artificial Intelligence Platform",
    description: "A powerful AI platform that helps businesses automate their workflows and improve productivity.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    upvotes: 128,
    category: "AI & Machine Learning"
  },
  {
    id: 2,
    title: "Virtual Reality Workspace",
    description: "Transform your remote work experience with immersive virtual reality environments.",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac",
    upvotes: 95,
    category: "Virtual Reality"
  },
  {
    id: 3,
    title: "Smart Home Ecosystem",
    description: "Connect and control all your smart home devices from a single, intuitive interface.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    upvotes: 76,
    category: "IoT & Smart Home"
  },
  {
    id: 4,
    title: "Blockchain Security Suite",
    description: "Enterprise-grade security solutions powered by advanced blockchain technology.",
    image: "https://images.unsplash.com/photo-1639152201720-5e536d254d81",
    upvotes: 64,
    category: "Blockchain"
  }
];

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_PRODUCTS.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
