import React from 'react'

interface AdditionalRequestsProps {
  avoidText: string
  includeText: string
  onAvoidTextChange: (value: string) => void
  onIncludeTextChange: (value: string) => void
}

const AdditionalRequests: React.FC<AdditionalRequestsProps> = ({
  avoidText,
  includeText,
  onAvoidTextChange,
  onIncludeTextChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          추가 요청사항 (선택사항) ✨
        </label>
        
        {/* 피하고 싶은 문장 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            피하고 싶은 문장이나 표현이 있나요? 🚫
          </label>
          <textarea
            value={avoidText}
            onChange={(e) => onAvoidTextChange(e.target.value)}
            placeholder="예: '죄송합니다'라는 표현 대신 다른 표현을 사용해주세요"
            rows={3}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 resize-none"
          />
        </div>

        {/* 넣고 싶은 문장 */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            꼭 넣고 싶은 문장이나 표현이 있나요? ✅
          </label>
          <textarea
            value={includeText}
            onChange={(e) => onIncludeTextChange(e.target.value)}
            placeholder="예: '항상 감사합니다'라는 문장을 포함해주세요"
            rows={3}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 resize-none"
          />
        </div>

        <div className="mt-3 text-sm text-gray-500">
          <p>💡 특별한 요청사항이 없다면 비워두셔도 됩니다!</p>
        </div>
      </div>
    </div>
  )
}

export default AdditionalRequests
