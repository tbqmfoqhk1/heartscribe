import React from 'react'

interface SituationTextareaProps {
  value: string
  onChange: (situation: string) => void
  error?: string
}

const SituationTextarea: React.FC<SituationTextareaProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-900 mb-4">
        구체적인 상황을 설명해주세요 📝
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="예: 친구와 다퉈서 사과하고 싶어요. 제가 성급하게 말해서 친구가 상처받았어요..."
        className={`w-full h-32 p-4 border-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ${
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:border-red-500'
        }`}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  )
}

export default SituationTextarea
