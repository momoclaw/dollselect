import React, { useState, useRef } from 'react';
import { Heart, X } from 'lucide-react';

// 模拟的产品数据
const products = [
  { id: 1, name: "新款智能手表", description: "支持心率监测和睡眠追踪", color: "bg-blue-400" },
  { id: 2, name: "无线降噪耳机", description: "20小时续航，高清音质", color: "bg-green-400" },
  { id: 3, name: "便携式投影仪", description: "1080P高清，自动对焦", color: "bg-yellow-400" },
  { id: 4, name: "智能家居套装", description: "包含智能灯泡、插座和传感器", color: "bg-pink-400" },
  { id: 5, name: "多功能搅拌机", description: "强劲马达，多种模式", color: "bg-purple-400" },
];

const ProductCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [likes, setLikes] = useState(new Array(products.length).fill(0));
  const [dislikes, setDislikes] = useState(new Array(products.length).fill(0));
  const [showResults, setShowResults] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentProduct = products[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return;
    const currentX = e.touches[0].clientX;
    const newPosition = currentX - startX;
    setPosition(newPosition);
  };

  const handleTouchEnd = () => {
    if (Math.abs(position) > 100) {
      if (position > 0) {
        setLikes(prev => {
          const newLikes = [...prev];
          newLikes[currentIndex]++;
          return newLikes;
        });
      } else {
        setDislikes(prev => {
          const newDislikes = [...prev];
          newDislikes[currentIndex]++;
          return newDislikes;
        });
      }
      nextProduct();
    }
    setPosition(0);
    setStartX(null);
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
      <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
        <div className="text-2xl font-bold mb-4">评价结果统计</div>
        {products.map((product, index) => (
          <div key={product.id} className="mb-4 w-full max-w-sm bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>喜欢: {likes[index]} 不喜欢: {dislikes[index]}</p>
            <div className="mt-2 bg-gray-200 h-4 rounded-full">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${(likes[index] / (likes[index] + dislikes[index])) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div
        ref={cardRef}
        className={`w-full max-w-sm ${currentProduct.color} rounded-lg shadow-lg overflow-hidden`}
        style={{
          transform: `translateX(${position}px) rotate(${position / 20}deg)`,
          transition: 'transform 0.3s ease',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-64 flex items-center justify-center relative" style={{ background: 'rgba(0,0,0,0.1)' }}>
          <p className="text-2xl font-bold text-black text-center px-4">向左滑动不喜欢，向右滑动喜欢</p>
          {position < -20 && (
            <div className="absolute top-5 left-5 text-red-500">
              <X size={40} />
            </div>
          )}
          {position > 20 && (
            <div className="absolute top-5 right-5 text-green-500">
              <Heart size={40} />
            </div>
          )}
        </div>
        <div className="bg-white p-4">
          <h2 className="text-xl font-bold text-black">{currentProduct.name}</h2>
          <p className="text-sm text-black">{currentProduct.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
