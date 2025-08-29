import React from 'react'

interface Length {
  id: string
  label: string
  description: string
  wordCount: string
}

interface LengthSelectorProps {
  selectedLength: string
  onLengthChange: (length: string) => void
  error?: string
}

const lengths: Length[] = [
  { 
    id: 'short', 
    label: '짧은 편지', 
    description: '핵심만 간단히',
    wordCount: '약 100-200자'
  },
  { 
    id: 'medium', 
    label: '보통 편지', 
    description: '적당한 분량',
    wordCount: '약 300-500자'
  },
  { 
    id: 'long', 
    label: '긴 편지', 
    description: '자세하고 풍부한 내용',
    wordCount: '약 700-1000자'
  },
]

const LengthSelector: React.FC<LengthSelectorProps> = ({ selectedLength, onLengthChange, error }) => {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-900 mb-4">
        편지 길이를 선택해주세요 📏
      </label>
      <div className={`grid grid-cols-3 gap-3 ${error ? 'border-2 border-red-300 rounded-lg p-4' : ''}`}>
        {lengths.map((length) => (
          <button
            key={length.id}
            type="button"
            onClick={() => onLengthChange(length.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedLength === length.id
                ? 'border-red-500 bg-red-50 text-red-700 shadow-md'
                : 'border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50'
            }`}
          >
            <div className="text-sm font-medium">{length.label}</div>
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  )
}

export default LengthSelector
