import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import NaturalLanguageInput from '../components/NaturalLanguageInput'
import EmotionSelector from '../components/EmotionSelector'
import ToneSelector from '../components/ToneSelector'
import LengthSelector from '../components/LengthSelector'
import SituationTextarea from '../components/SituationTextarea'
import AdditionalRequests from '../components/AdditionalRequests'
import { generatePromptFromInput } from '../lib/generatePrompt'
import { generateLetterWithFallback } from '../lib/generateLetter'
import { LetterInput } from '../types/letter'
import { AnalysisResult } from '../lib/analyzeInput'

interface LetterFormData {
  emotion: string
  situation: string
  tone: string
  length: string
  avoidText: string
  includeText: string
}

interface ValidationErrors {
  emotion?: string
  situation?: string
  tone?: string
  length?: string
}

const CreateLetter: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const [formData, setFormData] = useState<LetterFormData>({
    emotion: '',
    situation: '',
    tone: '',
    length: '',
    avoidText: '',
    includeText: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [inputMode, setInputMode] = useState<'manual' | 'natural'>('manual') // 기본값은 수동 입력

  // URL 파라미터에서 이전 입력값들을 가져와 초기값으로 설정
  useEffect(() => {
    const emotionFromUrl = searchParams.get('emotion')
    const toneFromUrl = searchParams.get('tone')
    const lengthFromUrl = searchParams.get('length')
    const situationFromUrl = searchParams.get('situation')
    const mustIncludeFromUrl = searchParams.get('mustInclude')
    const mustAvoidFromUrl = searchParams.get('mustAvoid')

    // 이전 입력값이 있으면 폼에 설정
    if (emotionFromUrl || toneFromUrl || lengthFromUrl || situationFromUrl) {
      setFormData(prev => ({
        ...prev,
        emotion: emotionFromUrl || prev.emotion,
        tone: toneFromUrl || prev.tone,
        length: lengthFromUrl || prev.length,
        situation: situationFromUrl || prev.situation,
        includeText: mustIncludeFromUrl || prev.includeText,
        avoidText: mustAvoidFromUrl || prev.avoidText
      }))
      
      console.log('이전 입력값 복원:', {
        emotion: emotionFromUrl,
        tone: toneFromUrl,
        length: lengthFromUrl,
        situation: situationFromUrl,
        mustInclude: mustIncludeFromUrl,
        mustAvoid: mustAvoidFromUrl
      })
    }
  }, [searchParams])

  // 입력값 유효성 검사 함수
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {}
    
    if (inputMode === 'manual') {
      if (!formData.emotion.trim()) {
        errors.emotion = '감정을 선택해주세요.'
      }
      if (!formData.situation.trim()) {
        errors.situation = '상황 설명을 입력해주세요.'
      }
      if (!formData.tone.trim()) {
        errors.tone = '문체를 선택해주세요.'
      }
      if (!formData.length.trim()) {
        errors.length = '편지 길이를 선택해주세요.'
      }
    } else {
      // 자연어 입력 모드에서는 상황 설명만 필수
      if (!formData.situation.trim()) {
        errors.situation = '상황 설명을 입력해주세요.'
      }
      if (!analysisResult) {
        errors.situation = '입력 분석이 완료되지 않았습니다. 잠시 기다려주세요.'
      }
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // 기존 방식 핸들러 함수들
  const handleEmotionChange = (emotion: string) => {
    setFormData(prev => ({ ...prev, emotion }))
    // 에러가 있으면 제거
    if (validationErrors.emotion) {
      setValidationErrors(prev => ({ ...prev, emotion: undefined }))
    }
  }

  const handleSituationChange = (situation: string) => {
    setFormData(prev => ({ ...prev, situation }))
    // 에러가 있으면 제거
    if (validationErrors.situation) {
      setValidationErrors(prev => ({ ...prev, situation: undefined }))
    }
  }

  const handleToneChange = (tone: string) => {
    setFormData(prev => ({ ...prev, tone }))
    // 에러가 있으면 제거
    if (validationErrors.tone) {
      setValidationErrors(prev => ({ ...prev, tone: undefined }))
    }
  }

  const handleLengthChange = (length: string) => {
    setFormData(prev => ({ ...prev, length }))
    // 에러가 있으면 제거
    if (validationErrors.length) {
      setValidationErrors(prev => ({ ...prev, length: undefined }))
    }
  }

  const handleAvoidTextChange = (avoidText: string) => {
    setFormData(prev => ({ ...prev, avoidText }))
  }

  const handleIncludeTextChange = (includeText: string) => {
    setFormData(prev => ({ ...prev, includeText }))
  }

  // 자연어 분석 결과 처리 함수들
  const handleAnalysisComplete = (analysis: AnalysisResult) => {
    setAnalysisResult(analysis)
    setIsAnalyzing(false) // 분석 완료 시 로딩 상태 해제
    setFormData({
      emotion: analysis.emotion,
      situation: analysis.situation,
      tone: analysis.tone,
      length: analysis.length,
      includeText: analysis.mustInclude || '',
      avoidText: analysis.mustAvoid || ''
    })
  }

  const handleAnalysisStart = () => {
    setIsAnalyzing(true)
    setError(null)
  }

  const handleAnalysisError = (errorMessage: string) => {
    setError(errorMessage)
    setIsAnalyzing(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // 유효성 검사
    if (!validateForm()) {
      return
    }

    // 단계별 입력 모드에서는 분석 결과가 필요 없음
    if (inputMode === 'manual' && !formData.emotion) {
      setError('감정을 선택해주세요.')
      return
    }

    // 자연어 입력 모드에서는 분석 결과가 필요함
    if (inputMode === 'natural' && !analysisResult) {
      setError('입력 분석이 완료되지 않았습니다. 잠시 기다려주세요.')
      return
    }

    // 단계별 입력 모드에서는 분석 중이어도 진행 가능
    if (inputMode === 'manual' && isAnalyzing) {
      setIsAnalyzing(false) // 분석 상태 강제 해제
    }

    setIsLoading(true)
    
    try {
      // LetterInput 형태로 변환
      const letterInput: LetterInput = {
        emotion: formData.emotion as any,
        tone: formData.tone as any,
        length: formData.length as any,
        situation: formData.situation,
        mustInclude: formData.includeText || undefined,
        mustAvoid: formData.avoidText || undefined
      }

      // 프롬프트 생성
      const prompt = generatePromptFromInput(letterInput)
      
      console.log('편지 생성 시작...')
      const generatedLetter = await generateLetterWithFallback(letterInput)
      console.log('생성된 편지:', generatedLetter)
      console.log('편지 타입:', typeof generatedLetter)
      console.log('편지 길이:', generatedLetter?.length)
      
      // 결과 페이지로 이동
      console.log('결과 페이지로 이동 중...')
      navigate('/result', { 
        state: { 
          formData,
          prompt,
          generatedLetter
        } 
      })
    } catch (err) {
      console.error('편지 생성 중 오류:', err)
      const errorMessage = err instanceof Error 
        ? err.message 
        : '편지 생성 중 오류가 발생했습니다. 다시 시도해주세요.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = inputMode === 'natural' 
    ? (analysisResult && formData.situation.trim().length > 0)
    : (formData.emotion && formData.situation && formData.tone && formData.length)
  
  // 수정 모드인지 확인 (URL에 이전 입력값이 있는지)
  const isEditMode = searchParams.get('emotion') || searchParams.get('tone') || searchParams.get('length') || searchParams.get('situation')

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isEditMode ? '편지 수정하기 ✏️' : '편지 작성하기 💌'}
          </h1>
          <p className="text-lg text-gray-600">
            {isEditMode 
              ? '편지 내용을 수정하고 다시 생성해보세요'
              : 'AI가 당신의 마음을 아름답게 표현해드릴게요'
            }
          </p>
          {isEditMode && (
            <div className="mt-4 inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              ✨ 이전 입력값이 자동으로 복원되었습니다
            </div>
          )}
        </div>

        {/* 입력 모드 선택 */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setInputMode('manual')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                inputMode === 'manual'
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-red-300'
              }`}
            >
              <span className="mr-2">✏️</span>
              단계별 입력
            </button>
            <button
              onClick={() => setInputMode('natural')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                inputMode === 'natural'
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-red-300'
              }`}
            >
              <span className="mr-2">💬</span>
              자연어 입력
            </button>
          </div>
        </div>

        {/* 진행률 표시 */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>편지 작성 중...</span>
            <span>1/2 단계</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full w-1/2"></div>
          </div>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            {inputMode === 'natural' ? (
              /* 자연어 입력 모드 */
              <div className="mb-8">
                <NaturalLanguageInput
                  onAnalysisComplete={handleAnalysisComplete}
                  onAnalysisStart={handleAnalysisStart}
                  onAnalysisError={handleAnalysisError}
                />
              </div>
            ) : (
              /* 단계별 입력 모드 */
              <>
                {/* 감정 선택 */}
                <div className="mb-8">
                  <EmotionSelector
                    selectedEmotion={formData.emotion}
                    onEmotionChange={handleEmotionChange}
                    error={validationErrors.emotion}
                  />
                </div>

                {/* 상황 설명 */}
                <div className="mb-8">
                  <SituationTextarea
                    value={formData.situation}
                    onChange={handleSituationChange}
                    error={validationErrors.situation}
                  />
                </div>

                {/* 문체 선택 */}
                <div className="mb-8">
                  <ToneSelector
                    selectedTone={formData.tone}
                    onToneChange={handleToneChange}
                    error={validationErrors.tone}
                  />
                </div>

                {/* 길이 선택 */}
                <div className="mb-8">
                  <LengthSelector
                    selectedLength={formData.length}
                    onLengthChange={handleLengthChange}
                    error={validationErrors.length}
                  />
                </div>

                {/* 추가 요청사항 */}
                <div className="mb-8">
                  <AdditionalRequests
                    avoidText={formData.avoidText}
                    includeText={formData.includeText}
                    onAvoidTextChange={handleAvoidTextChange}
                    onIncludeTextChange={handleIncludeTextChange}
                  />
                </div>
              </>
            )}

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <span className="text-red-500 mr-3 mt-0.5">⚠️</span>
                  <div>
                    <p className="text-red-700 font-medium mb-1">편지 생성 중 오류가 발생했습니다</p>
                    <p className="text-red-600 text-sm">{error}</p>
                    <p className="text-red-500 text-xs mt-2">잠시 후 다시 시도해주세요.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 제출 버튼 */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={!isFormValid || isLoading || (inputMode === 'natural' && isAnalyzing)}
                className={`px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                  isFormValid && !isLoading && !(inputMode === 'natural' && isAnalyzing)
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    편지를 생성하고 있어요...
                  </>
                ) : (inputMode === 'natural' && isAnalyzing) ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500 mr-2"></div>
                    입력을 분석하고 있어요...
                  </>
                ) : (
                  <>
                    <span className="mr-2">✨</span>
                    편지 생성하기
                    <span className="ml-2">→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* 안내 문구 */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>💡 모든 정보는 안전하게 보호되며, 편지 생성 후 자동으로 삭제됩니다.</p>
        </div>
      </div>
    </div>
  )
}

export default CreateLetter
