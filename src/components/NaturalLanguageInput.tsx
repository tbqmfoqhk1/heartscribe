import React, { useState, useCallback, useEffect } from 'react'
import { analyzeUserInput, AnalysisResult, formatAnalysisResult } from '../lib/analyzeInput'

interface NaturalLanguageInputProps {
  onAnalysisComplete: (analysis: AnalysisResult) => void
  onAnalysisStart: () => void
  onAnalysisError: (error: string) => void
}

const NaturalLanguageInput: React.FC<NaturalLanguageInputProps> = ({
  onAnalysisComplete,
  onAnalysisStart,
  onAnalysisError
}) => {
  const [input, setInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  // Debounce 처리를 위한 타이머
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)

  // 입력 분석 함수 (debounce 적용)
  const analyzeInput = useCallback(async (text: string) => {
    if (!text.trim()) {
      setAnalysisResult(null)
      return
    }

    setIsAnalyzing(true)
    onAnalysisStart()

    try {
      const analysis = await analyzeUserInput(text)
      setAnalysisResult(analysis)
      onAnalysisComplete(analysis)
    } catch (error) {
      console.error('입력 분석 실패:', error)
      const errorMessage = error instanceof Error && error.message.includes('분석 시간이 초과')
        ? '분석 시간이 초과되었습니다. 다시 입력해주세요.'
        : '입력 분석 중 오류가 발생했습니다.'
      onAnalysisError(errorMessage)
    } finally {
      setIsAnalyzing(false)
    }
  }, [onAnalysisComplete, onAnalysisStart, onAnalysisError])

  // 입력 변경 시 debounce 처리
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    if (input.trim()) {
      const timer = setTimeout(() => {
        analyzeInput(input)
      }, 500) // 0.5초 debounce로 단축

      setDebounceTimer(timer)
    } else {
      setAnalysisResult(null)
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [input, analyzeInput])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  return (
    <div className="space-y-6">
      {/* 입력 영역 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          편지에 대해 자연스럽게 설명해주세요 💬
        </label>
        <div className="relative">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="예시: 친구에게 사과 편지를 쓰고 싶어요. 시험 망친 일 때문에 너무 미안해요. 너무 딱딱하진 않게 부탁해요."
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 resize-none"
          />
          {isAnalyzing && (
            <div className="absolute top-3 right-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
            </div>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-500">
          <p>💡 구체적으로 설명할수록 더 정확한 편지가 생성됩니다!</p>
          <p>⚡ 빠른 분석을 위해 0.5초 후 자동으로 분석됩니다.</p>
          <p>⏱️ 분석 시간은 최대 10초로 제한됩니다.</p>
        </div>
      </div>

      {/* 분석 결과 표시 */}
      {analysisResult && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <span className="text-blue-600 mr-2">✨</span>
            <h3 className="text-blue-800 font-semibold">분석 완료</h3>
          </div>
          <div className="bg-white rounded p-3">
            <pre className="whitespace-pre-wrap text-sm text-gray-800">
              {formatAnalysisResult(analysisResult)}
            </pre>
          </div>
          <div className="mt-3 text-sm text-blue-600">
            <p>✅ 위 내용이 맞다면 아래 "편지 생성하기" 버튼을 눌러주세요!</p>
          </div>
        </div>
      )}

      {/* 입력 예시 */}
      {!input && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">💡 입력 예시</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• "친구에게 사과 편지를 쓰고 싶어요. 시험 망친 일 때문에 너무 미안해요. 너무 딱딱하진 않게 부탁해요."</p>
            <p>• "어머니께 감사 편지를 드리고 싶어요. 퇴직하시는데 그동안 고마운 마음을 담고 싶어요. 정중하고 긴 글로 부탁해요."</p>
            <p>• "동료에게 고백 편지를 쓰고 싶어요. 2년간 함께 일하면서 마음이 생겼어요. 감성적으로 부탁해요."</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default NaturalLanguageInput
