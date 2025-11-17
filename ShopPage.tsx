
import React from 'react';
import { Product } from '../types.ts';
import { AddToCartIcon } from '../components/icons/AddToCartIcon.tsx';

interface ShopPageProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void; }> = ({ product, onAddToCart }) => {
    const placeholderImageUrl = `https://via.placeholder.com/400x400.png?text=YLR+Product`;
    const imageUrl = product.imageUrl || placeholderImageUrl;

    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-2/5 p-4 order-2 sm:order-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{product.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600 dark:text-yellow-400">${product.price.toFixed(2)}</span>
                    <button 
                        onClick={() => onAddToCart(product)}
                        className="bg-blue-600 text-white font-semibold p-3 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-700 focus:ring-blue-500"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <AddToCartIcon />
                    </button>
                </div>
            </div>
            <div className="sm:w-3/5 order-1 sm:order-2">
                <div className="relative pb-2/3 sm:pb-0 h-48 sm:h-full">
                    <img className="absolute h-full w-full object-cover" src={imageUrl} alt={product.name} />
                </div>
            </div>
        </div>
    );
};


const ShopPage: React.FC<ShopPageProps> = ({ products, onAddToCart }) => {
  return (
    <div className="p-4">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Store</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Support the station by purchasing our branded merchandise.</p>
        </div>
        <div className="mt-6">
            {products.length > 0 ? (
                <div className="space-y-6">
                    {products.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                    <p>No products available at the moment. Please check back later!</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default ShopPage;