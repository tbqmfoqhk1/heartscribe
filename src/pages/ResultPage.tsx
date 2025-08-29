import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LetterResultCard from '../components/LetterResultCard'
import LetterMetaInfo from '../components/LetterMetaInfo'

interface ResultPageState {
  formData: {
    emotion: string
    tone: string
    length: string
    situation: string
    mustInclude?: string
    mustAvoid?: string
  }
  prompt: string
  generatedLetter: string
}

const ResultPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as ResultPageState

  // state가 없으면 홈으로 리다이렉트
  if (!state) {
    navigate('/')
    return null
  }

  const { formData, generatedLetter } = state
  
  // 디버깅 로그
  console.log('ResultPage 렌더링:', { formData, generatedLetter })
  console.log('generatedLetter 타입:', typeof generatedLetter)
  console.log('generatedLetter 길이:', generatedLetter?.length)

  const handleCreateNew = () => {
    navigate('/create')
  }

  const handleEditLetter = () => {
    // URL query string으로 이전 입력값들을 전달
    const params = new URLSearchParams({
      emotion: formData.emotion,
      tone: formData.tone,
      length: formData.length,
      situation: formData.situation,
      mustInclude: formData.mustInclude || '',
      mustAvoid: formData.mustAvoid || ''
    })
    
    navigate(`/create?${params.toString()}`)
  }

  const handleGoHome = () => {
    navigate('/')
  }

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(generatedLetter)
    alert('편지가 클립보드에 복사되었습니다!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            편지가 완성되었습니다! ✨
          </h1>
          <p className="text-lg text-gray-600">
            AI가 당신의 마음을 아름답게 표현했어요
          </p>
        </div>

        {/* 진행률 표시 */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>편지 생성 완료</span>
            <span>2/2 단계</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full w-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 생성된 편지 */}
          <div className="lg:col-span-2">
            <LetterResultCard 
              generatedLetter={generatedLetter}
              onCopyLetter={handleCopyLetter}
            />
          </div>

          {/* 편지 정보 */}
          <div className="lg:col-span-1">
            <LetterMetaInfo formData={formData} />
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleEditLetter}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200"
          >
            ✏️ 편지 수정하기
          </button>
          <button
            onClick={handleCreateNew}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-200"
          >
            💌 새로운 편지 작성하기
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
          >
            🏠 홈으로 돌아가기
          </button>
        </div>

        {/* 안내 문구 */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>💡 생성된 편지는 참고용으로만 사용하시고, 필요에 따라 수정하여 사용하세요.</p>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
