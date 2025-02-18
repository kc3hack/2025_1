import React from 'react';

const StartPage: React.FC = () => {
  return (
    <div className="bg-[url('/background/glass.png')] bg-cover bg-center min-h-screen">
      <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className="w-[600px] h-[80px] text-center mt-[168px]">
          <h1 className="text-8xl font-bold">古墳メーカー</h1>
        </div>
        <form className="mt-20 flex flex-col items-center">
          <div className="mb-3">
            <input
              type="text"
              placeholder="ユーザー名"
              className="w-[500px] h-[50px] p-2 text-lg border border-gray-300 rounded"
            />
          </div>
          <div className="mt-10 mb-10 mb-3">
            <input
              type="password"
              placeholder="パスワード"
              className="w-[500px] h-[50px] p-2 text-lg border border-gray-300 rounded"
            />
          </div>
          <div className="mt-10 mb-3">
            <button
              type="submit"
              className="w-[600px] h-[100px] p-2 text-6xl font-bold bg-gray-100 text-black rounded hover:bg-gray-300"
            >
              ゲームスタート
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartPage;