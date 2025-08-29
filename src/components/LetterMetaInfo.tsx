import React from 'react'
import { EMOTION_LABELS, TONE_LABELS, LENGTH_LABELS } from '../types/letter'

interface LetterMetaInfoProps {
  formData: {
    emotion: string
    tone: string
    length: string
    situation: string
    mustInclude?: string
    mustAvoid?: string
  }
}

const LetterMetaInfo: React.FC<LetterMetaInfoProps> = ({ formData }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">편지 정보</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">감정</label>
          <div className="text-gray-900 font-medium">
            {EMOTION_LABELS[formData.emotion as keyof typeof EMOTION_LABELS] || formData.emotion}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">문체</label>
          <div className="text-gray-900 font-medium">
            {TONE_LABELS[formData.tone as keyof typeof TONE_LABELS] || formData.tone}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">길이</label>
          <div className="text-gray-900 font-medium">
            {LENGTH_LABELS[formData.length as keyof typeof LENGTH_LABELS] || formData.length}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">상황 설명</label>
          <div className="text-gray-900 text-sm leading-relaxed">
            {formData.situation}
          </div>
        </div>

        {formData.mustInclude && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">포함 요청</label>
            <div className="text-gray-900 text-sm">
              "{formData.mustInclude}"
            </div>
          </div>
        )}

        {formData.mustAvoid && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">제외 요청</label>
            <div className="text-gray-900 text-sm">
              "{formData.mustAvoid}"
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LetterMetaInfo
