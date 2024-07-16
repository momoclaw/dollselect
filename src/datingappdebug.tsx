import React, { useState, useEffect } from 'react';
import { Heart, X, Star, BarChart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const initialProducts: Product[] = [
  { id: 1, name: "7寸抓取", description: "棕色小仓鼠", imageUrl: "https://pic.imgdb.cn/item/66968b59d9c307b7e9681a3b.png" },
  { id: 2, name: "7寸抓取", description: "双色小猫咪", imageUrl: `https://pic.imgdb.cn/item/66968b59d9c307b7e9681a95.webp` },
  { id: 3, name: "7寸抓取", description: "大虾天妇罗", imageUrl: `https://pic.imgdb.cn/item/66968b59d9c307b7e9681a66.png` },
  { id: 4, name: "1积分兑换", description: "草莓捏捏乐", imageUrl: `https://pic.imgdb.cn/item/66968ab3d9c307b7e96591fd.png` },
  { id: 5, name: "5积分兑换", description: "卡皮巴拉湿巾纸 整包", imageUrl: `https://pic.imgdb.cn/item/66968b59d9c307b7e96819c3.png` },
  { id: 6, name: "10积分兑换", description: "草莓美乐蒂40cm", imageUrl: `${process.env.PUBLIC_URL}/images/101.png` },
  { id: 7, name: "10积分兑换", description: "草莓库洛米40cm", imageUrl: `${process.env.PUBLIC_URL}/images/102.png` },
  { id: 8, name: "20积分兑换", description: "小火龙50cm", imageUrl: `${process.env.PUBLIC_URL}/images/103.png` },
  { id: 9, name: "20积分兑换", description: "杰尼龟50cm", imageUrl: `${process.env.PUBLIC_URL}/images/104.png` },
  { id: 10, name: "30积分兑换", description: "露营帐篷", imageUrl: `${process.env.PUBLIC_URL}/images/105.png` },
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
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.log("Current product:", products[currentIndex]);
    console.log("Attempting to load image:", products[currentIndex].imageUrl);
    setImageError(false);
  }, [currentIndex, products]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setShowRating(true);
    } else {
      setIsDisliking(true);
      setTimeout(() => {
        setIsDisliking(false);
        nextProduct();
      }, 300);
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
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">评价结果统计</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <div key={product.id} className="bg-gray-50 rounded-lg p-4 shadow">
                <div className="flex items-center mb-2">
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-full mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">喜欢程度</span>
                    <span className="text-sm font-medium text-gray-700">{likes[index]} / 5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-yellow-400 h-2.5 rounded-full" 
                      style={{ width: `${(likes[index] / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-orange-500 text-white p-4 text-center font-custom">
        <h1 className="text-2xl font-bold">欢迎来到夹纪元选品会</h1>
      </header>
      
      <div className="flex-grow flex flex-col justify-center items-center p-4">
        <div 
          className={`w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
            isDisliking ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="bg-gray-200 text-black p-2 text-center">
            新品 {currentIndex + 1} / {products.length}
          </div>
          <div className="relative">
            {imageError ? (
              <div className="h-64 flex items-center justify-center text-red-500">图片加载失败</div>
            ) : (
              <img 
                src={currentProduct.imageUrl} 
                alt={currentProduct.name} 
                className="w-full h-64 object-cover" 
                onError={(e) => {
                  console.error("Image failed to load:", e.currentTarget.src);
                  setImageError(true);
                }}
              />
            )}
            <div className="absolute top-1 right-1 bg-white rounded-full p-0.2">
              <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" className="w-8 h-8" />
            </div>
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
      </div>

      {showRating && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-xl font-bold text-black mb-4 text-center">请选择您喜欢的程度</div>
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