import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing: React.FC = () => {
  const navigate = useNavigate()

  const handleEmotionClick = (emotion: string) => {
    navigate(`/create?emotion=${emotion}`)
  }

  const handleGetStarted = () => {
    navigate('/create')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 메인 아이콘 */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full shadow-lg mb-6">
            <span className="text-4xl">💌</span>
          </div>
        </div>

        {/* 메인 제목 */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Heartscribe
        </h1>
        
        {/* 서브타이틀 */}
        <p className="text-xl md:text-2xl text-gray-700 mb-4">
          감정 대필 사무소
        </p>

        {/* 소개 문구 */}
        <div className="mb-12">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
            마음을 전하고 싶지만 표현하기 어려우신가요?
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            AI가 도와드려요. 진심이 담긴 편지를 함께 작성해보세요.
          </p>
        </div>

        {/* 감정 아이콘들 */}
        <div className="flex justify-center items-center space-x-4 mb-12">
          <button 
            onClick={() => handleEmotionClick('apology')}
            className="flex flex-col items-center hover:scale-110 transition-transform duration-200"
          >
            <span className="text-2xl mb-2">😔</span>
            <span className="text-sm text-gray-600">사과</span>
          </button>
          <button 
            onClick={() => handleEmotionClick('confession')}
            className="flex flex-col items-center hover:scale-110 transition-transform duration-200"
          >
            <span className="text-2xl mb-2">💝</span>
            <span className="text-sm text-gray-600">고백</span>
          </button>
          <button 
            onClick={() => handleEmotionClick('celebration')}
            className="flex flex-col items-center hover:scale-110 transition-transform duration-200"
          >
            <span className="text-2xl mb-2">🎂</span>
            <span className="text-sm text-gray-600">축하</span>
          </button>
          <button 
            onClick={() => handleEmotionClick('comfort')}
            className="flex flex-col items-center hover:scale-110 transition-transform duration-200"
          >
            <span className="text-2xl mb-2">🤗</span>
            <span className="text-sm text-gray-600">위로</span>
          </button>
          <button 
            onClick={() => handleEmotionClick('gratitude')}
            className="flex flex-col items-center hover:scale-110 transition-transform duration-200"
          >
            <span className="text-2xl mb-2">🙏</span>
            <span className="text-sm text-gray-600">감사</span>
          </button>
        </div>

        {/* CTA 버튼 */}
        <div className="mb-8">
          <button
            onClick={handleGetStarted}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="mr-2">💌</span>
            편지 쓰러 가기
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </div>

        {/* 추가 정보 */}
        <div className="text-sm text-gray-500 space-y-2">
          <p>사과, 고백, 축하, 위로, 감사... 어떤 마음이든</p>
          <p>AI가 당신의 진심을 아름답게 표현해드려요</p>
        </div>

        {/* 장점들 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-semibold text-gray-800 mb-1">맞춤형 편지</h3>
            <p className="text-sm text-gray-600">상황과 감정에 맞는 개인화된 편지</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-1">빠른 생성</h3>
            <p className="text-sm text-gray-600">몇 분 안에 완성되는 편지</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-1">다양한 스타일</h3>
            <p className="text-sm text-gray-600">문체와 길이를 자유롭게 선택</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
