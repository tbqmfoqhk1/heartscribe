import React from 'react'

interface LetterResultCardProps {
  generatedLetter: string
  onCopyLetter: () => void
}

const LetterResultCard: React.FC<LetterResultCardProps> = ({ generatedLetter, onCopyLetter }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">생성된 편지</h2>
        <button
          onClick={onCopyLetter}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
        >
          📋 복사하기
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-pink-500">
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {generatedLetter}
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>💡 이 편지는 참고용으로만 사용하시고, 필요에 따라 수정하여 사용하세요.</p>
      </div>
    </div>
  )
}

export default LetterResultCard
