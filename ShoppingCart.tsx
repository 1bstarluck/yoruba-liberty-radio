
import React from 'react';
import { CartItem } from '../types.ts';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon.tsx';
import { PayPalIcon } from './icons/PayPalIcon.tsx';
import { StripeIcon } from './icons/StripeIcon.tsx';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveFromCart: (productId: number) => void;
  onAddToCart: (product: CartItem) => void;
  onStartShopping: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose, cartItems, onRemoveFromCart, onAddToCart, onStartShopping }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 focus:outline-none">
              &times;
            </button>
          </header>

          <div className="flex-grow p-4 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                <ShoppingCartIcon className="w-24 h-24 mb-4 text-gray-300 dark:text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Your cart is empty</h3>
                <p className="mt-2">Looks like you haven't added anything yet.</p>
                <button
                  onClick={onStartShopping}
                  className="mt-6 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Start Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex items-center space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button onClick={() => onRemoveFromCart(item.id)} className="px-2 py-1 border rounded-md dark:border-gray-600 dark:text-gray-300">-</button>
                        <span className="px-3 text-gray-800 dark:text-white">{item.quantity}</span>
                        <button onClick={() => onAddToCart(item)} className="px-2 py-1 border rounded-md dark:border-gray-600 dark:text-gray-300">+</button>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {cartItems.length > 0 && (
             <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-200">Total:</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">${total}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Proceed to Checkout
                </button>
                <div className="mt-3 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Accepted Payment Methods</p>
                    <div className="flex justify-center items-center space-x-4">
                        <PayPalIcon className="h-6 text-gray-700 dark:text-gray-300" />
                        <StripeIcon className="h-6 text-gray-700 dark:text-gray-300" />
                    </div>
                </div>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;