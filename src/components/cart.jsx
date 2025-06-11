import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeItem } from '../utils/cartSlice';
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Cart = () => {
  const cartItems = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  // Total price calculation
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice =
      item.card.info.price / 100 || item.card.info.defaultPrice / 100;
    return total + itemPrice * item.quantity;
  }, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.warn('Cart cleared! 🗑️', {
      position: 'top-center',
      autoClose: 1500,
    });
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.warn('Item removed from cart', {
      position: 'top-center',
      autoClose: 1500,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FaShoppingCart className="text-3xl sm:text-4xl text-orange-500" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              Your Cart
            </h1>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto rounded-full"></div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center">
            <div className="text-6xl sm:text-8xl mb-6">🛒</div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              Looks like you haven't added any delicious items to your cart yet.
            </p>
            <a
              href="/"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl transition-colors duration-200"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          /* Cart with Items */
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Order Summary ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item.card.info.id}
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Item Details */}
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                          {item.card.info.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                          <span className="font-medium">
                            Quantity: {item.quantity}
                          </span>
                          <span>
                            ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100} each
                          </span>
                        </div>
                      </div>

                      {/* Price and Remove Button */}
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                          <p className="text-lg sm:text-xl font-bold text-green-600">
                            ₹{(
                              (item.card.info.price / 100 || item.card.info.defaultPrice / 100) * 
                              item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                        
                        <button
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
                          onClick={() => handleRemoveItem(item.card.info.id)}
                          aria-label="Remove item"
                        >
                          <FaTrashAlt size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg sm:text-xl">
                  <span className="font-semibold text-gray-800">Subtotal:</span>
                  <span className="font-bold text-gray-800">₹{totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Delivery Fee:</span>
                  <span>₹40.00</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Taxes & Other fees:</span>
                  <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between items-center text-xl sm:text-2xl font-bold">
                  <span className="text-gray-800">Total:</span>
                  <span className="text-green-600">
                    ₹{(totalPrice + 40 + totalPrice * 0.05).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-xl transition-colors duration-200 text-base sm:text-lg">
                Proceed to Checkout 🚀
              </button>
              
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transition-colors duration-200 text-base sm:text-lg"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;