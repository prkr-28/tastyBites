import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';
import { toast } from 'react-toastify';

const RestaurantCateg = ({ data, showItems, setshowindex }) => {
  const toggleList = () => {
    setshowindex();
  };

  const { title, itemCards } = data;
  const dispatch = useDispatch();

  const handleAddItem = (menu) => {
    dispatch(addItem(menu));
    toast.success('Item added to cart! 🛒', {
      position: 'top-center',
      autoClose: 1300,
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={toggleList}
        className="w-full text-left bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-200 flex justify-between items-center"
      >
        <span className="text-sm sm:text-base lg:text-lg text-gray-800">
          {title} ({itemCards?.length || 0})
        </span>
        <span className="text-lg sm:text-xl transition-transform duration-200" 
              style={{ transform: showItems ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          🔻
        </span>
      </button>

      {/* Accordion Body */}
      {showItems && (
        <div className="bg-gray-50 border-t border-gray-200">
          {itemCards?.map((menu) => (
            <div
              key={menu.card.info.id}
              className="border-b border-gray-200 last:border-b-0 p-4 sm:p-6 hover:bg-white transition-colors duration-200"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Item Details */}
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 pr-4">
                      {menu.card.info.name}
                    </h3>
                    {menu.card.info.isVeg !== undefined && (
                      <div className={`w-4 h-4 border-2 flex items-center justify-center ${
                        menu.card.info.isVeg ? 'border-green-500' : 'border-red-500'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          menu.card.info.isVeg ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <p className="text-base sm:text-lg font-bold text-gray-800">
                      ₹{menu.card.info.price / 100 || menu.card.info.defaultPrice / 100}
                    </p>
                    
                    {menu.card.info.ratings?.aggregatedRating?.rating && (
                      <div className="flex items-center space-x-1 text-sm">
                        <span className="text-green-600 font-medium">
                          ⭐ {menu.card.info.ratings.aggregatedRating.rating}
                        </span>
                        <span className="text-gray-500">
                          ({menu.card.info.ratings.aggregatedRating.ratingCountV2})
                        </span>
                      </div>
                    )}
                  </div>

                  {menu.card.info.description && (
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
                      {menu.card.info.description}
                    </p>
                  )}

                  <button
                    onClick={() => handleAddItem(menu)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base flex items-center space-x-2 w-fit"
                  >
                    <span>🛒</span>
                    <span>Add to Cart</span>
                  </button>
                </div>

                {/* Item Image */}
                <div className="flex-shrink-0 lg:w-32 xl:w-40">
                  <img
                    className="w-full h-24 sm:h-28 lg:h-32 object-cover rounded-lg shadow-md"
                    src={
                      menu.card.info.imageId
                        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${menu.card.info.imageId}`
                        : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&crop=center'
                    }
                    alt={menu.card.info.name}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantCateg;