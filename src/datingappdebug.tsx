import React, { useState, useEffect } from 'react';
import { Heart, X, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const initialProducts: Product[] = [
  { id: 1, name: "产品1", description: "这是产品1的描述", imageUrl: "https://cdn.discordapp.com/attachments/1105120304709259369/1260272971461693552/e3a3c5dd7d400730bc66383ddf964363.jpg?ex=669203eb&is=6690b26b&hm=a908ec4cd45b6244a0805e5b552b9dd451a11c6d90c99303eb8a5234bd5c8c99&" },
  { id: 2, name: "产品2", description: "这是产品2的描述", imageUrl: "/api/placeholder/400/300" },
  { id: 3, name: "产品3", description: "这是产品3的描述", imageUrl: "/api/placeholder/400/300" },
];

interface ProductCardProps {
  products?: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products = initialProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState<number[]>(new Array(products.length).fill(0));
  const [showResults, setShowResults] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);

  useEffect(() => {
    if (isDisliking) {
      const timer = setTimeout(() => {
        setIsDisliking(false);
        nextProduct();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isDisliking]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setShowRating(true);
    } else {
      setIsDisliking(true);
    }
  };

  const handleRating = (rating: number) => {
    setLikes(prev => {
      const newLikes = [...prev];
      newLikes[currentIndex] = rating;
      return newLikes;
    });
    setShowRating(false);
    nextProduct();
  };

  const nextProduct = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="text-2xl font-bold mb-4">评价结果统计</div>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          {products.map((product, index) => (
            <div key={product.id} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200">
                      喜欢程度
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-yellow-600">
                      {likes[index]} / 5
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-yellow-200">
                  <div style={{ width: `${(likes[index] / 5) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-400"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div 
        className={`w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          isDisliking ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="relative h-64 flex items-center justify-center overflow-hidden">
          <img src={currentProduct.imageUrl} alt={currentProduct.name} className="w-full h-full object-cover" />
          <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
            产品 {currentIndex + 1} / {products.length}
          </p>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-black">{currentProduct.name}</h2>
          <p className="text-sm text-black mt-2">{currentProduct.description}</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-16">
        <button
          onClick={() => handleSwipe('left')}
          className="bg-white rounded-full p-6 shadow-lg transform transition-transform duration-200 hover:scale-110"
          disabled={isDisliking}
        >
          <X className="text-red-500" size={48} />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="bg-white rounded-full p-6 shadow-lg transform transition-transform duration-200 hover:scale-110"
          disabled={isDisliking}
        >
          <Heart className="text-green-500" size={48} />
        </button>
      </div>

      {showRating && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-xl font-bold mb-4 text-center">请选择您喜欢的程度</div>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => handleRating(rating)}
                  className="w-12 h-12 bg-yellow-400 text-white rounded-full flex flex-col items-center justify-center hover:bg-yellow-500 transition-colors duration-200"
                >
                  <span className="text-sm">{rating}</span>
                  <Star fill="white" size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;