import React, { useState } from 'react'
import { generateLetterWithFallback } from '../lib/generateLetter'
import { LetterInput } from '../types/letter'

const DebugPage: React.FC = () => {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const testInput: LetterInput = {
    emotion: 'apology',
    tone: 'polite',
    length: 'medium',
    mustInclude: '앞으로는 더 신중하게 행동하겠습니다',
    mustAvoid: '미안합니다',
    situation: '친구와 함께 프로젝트를 진행했는데, 제가 마감일을 놓쳐서 팀 전체가 곤란한 상황에 처했어요.'
  }

  const handleTest = async () => {
    setLoading(true)
    setError('')
    setResult('')

    try {
      console.log('테스트 시작...')
      console.log('환경변수 확인:')
      console.log('import.meta.env.VITE_OPENAI_API_KEY:', import.meta.env.VITE_OPENAI_API_KEY ? '있음' : '없음')
      console.log('process.env.VITE_OPENAI_API_KEY:', process.env.VITE_OPENAI_API_KEY ? '있음' : '없음')
      
      const letter = await generateLetterWithFallback(testInput)
      setResult(letter)
      console.log('편지 생성 완료:', letter)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류'
      setError(errorMessage)
      console.error('테스트 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">디버깅 페이지</h1>
        
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">환경변수 상태</h2>
          <div className="space-y-2">
            <p><strong>import.meta.env.VITE_OPENAI_API_KEY:</strong> {import.meta.env.VITE_OPENAI_API_KEY ? '✅ 설정됨' : '❌ 설정되지 않음'}</p>
            <p><strong>process.env.VITE_OPENAI_API_KEY:</strong> {process.env.VITE_OPENAI_API_KEY ? '✅ 설정됨' : '❌ 설정되지 않음'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">편지 생성 테스트</h2>
          <button
            onClick={handleTest}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? '테스트 중...' : '편지 생성 테스트'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-semibold mb-2">오류</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-green-800 font-semibold mb-2">생성된 편지</h3>
            <div className="bg-white rounded p-4">
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DebugPage
