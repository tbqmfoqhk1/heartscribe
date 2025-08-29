import React from 'react'

interface Tone {
  id: string
  label: string
  description: string
  example: string
}

interface ToneSelectorProps {
  selectedTone: string
  onToneChange: (tone: string) => void
  error?: string
}

const tones: Tone[] = [
  { 
    id: 'polite', 
    label: '정중한', 
    description: '공식적이고 예의 바른 톤',
    example: '감사드립니다. 부탁드립니다.'
  },
  { 
    id: 'friendly', 
    label: '친근한', 
    description: '편안하고 친밀한 톤',
    example: '안녕! 정말 고마워~'
  },
  { 
    id: 'formal', 
    label: '격식있는', 
    description: '매우 공식적이고 격식있는 톤',
    example: '삼가 말씀드립니다. 감사하옵니다.'
  },
  { 
    id: 'emotional', 
    label: '감성적인', 
    description: '감정이 풍부하고 따뜻한 톤',
    example: '마음이 너무 아파서... 정말 사랑해요.'
  },
  { 
    id: 'concise', 
    label: '간결한', 
    description: '짧고 명확한 톤',
    example: '고마워. 미안해. 사랑해.'
  },
]

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onToneChange, error }) => {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-900 mb-4">
        원하는 문체를 선택해주세요 ✍️
      </label>
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${error ? 'border-2 border-red-300 rounded-lg p-4' : ''}`}>
        {tones.map((tone) => (
          <button
            key={tone.id}
            type="button"
            onClick={() => onToneChange(tone.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedTone === tone.id
                ? 'border-red-500 bg-red-50 text-red-700 shadow-md'
                : 'border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50'
            }`}
          >
            <div className="text-sm font-medium">{tone.label}</div>
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

export default ToneSelector
