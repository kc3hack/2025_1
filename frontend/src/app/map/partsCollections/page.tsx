import React from 'react';

const PartsCollection: React.FC = () => {
  const parts = Array.from({ length: 64 }, (_, index) => `Part ${index + 1}`);

  return (
    <div className="bg-[url('/background/glass.png')] bg-cover bg-center min-h-screen">
      <div className="w-full h-screen flex flex-col">
        <div className="w-full text-center mt-10">
          <h1 className="text-4xl font-bold">パーツコレクション</h1>
        </div>
        <div className="h-[80%] overflow-y-scroll mt-5 px-48" content='center'>
          <div className="flex flex-wrap justify-center">
            {parts.map((part, index) => (
              <div key={index} className="w-48 h-56 m-4 bg-gray-200 flex items-center justify-center border border-gray-300 rounded">
                {part}
              </div>
            ))}
          </div>
        </div>
        <button className="fixed bottom-10 left-5 w-36 h-16 bg-gray-100 text-black rounded hover:bg-gray-300">
              戻る
        </button>
      </div>
    </div>
  );
};

export default PartsCollection;