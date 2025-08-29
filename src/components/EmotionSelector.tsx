import React from 'react'

interface Emotion {
  id: string
  label: string
  emoji: string
  description: string
}

interface EmotionSelectorProps {
  selectedEmotion: string
  onEmotionChange: (emotion: string) => void
  error?: string
}

const emotions: Emotion[] = [
  { id: 'apology', label: '사과', emoji: '😔', description: '미안한 마음을 전하고 싶어요' },
  { id: 'confession', label: '고백', emoji: '💝', description: '마음을 고백하고 싶어요' },
  { id: 'resignation', label: '퇴사', emoji: '👋', description: '퇴사 의사를 전달하고 싶어요' },
  { id: 'celebration', label: '축하', emoji: '🎂', description: '축하의 마음을 전하고 싶어요' },
  { id: 'gratitude', label: '감사', emoji: '🙏', description: '감사한 마음을 전하고 싶어요' },
  { id: 'comfort', label: '위로', emoji: '🤗', description: '위로의 마음을 전하고 싶어요' },
  { id: 'encouragement', label: '격려', emoji: '💪', description: '격려의 마음을 전하고 싶어요' },
]

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ selectedEmotion, onEmotionChange, error }) => {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-900 mb-4">
        어떤 감정의 편지인가요? 💝
      </label>
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${error ? 'border-2 border-red-300 rounded-lg p-4' : ''}`}>
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            type="button"
            onClick={() => onEmotionChange(emotion.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedEmotion === emotion.id
                ? 'border-red-500 bg-red-50 text-red-700 shadow-md'
                : 'border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50'
            }`}
          >
            <div className="text-2xl mb-2">{emotion.emoji}</div>
            <div className="text-sm font-medium">{emotion.label}</div>
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

export default EmotionSelector
