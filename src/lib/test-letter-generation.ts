import { generateLetterWithFallback, generateDummyLetter } from './generateLetter'
import { EXAMPLE_INPUTS } from './generatePrompt'

// 테스트 실행
console.log('🚀 편지 생성 함수 테스트 시작\n')

// 더미 데이터 테스트
console.log('📝 더미 데이터 테스트:')
EXAMPLE_INPUTS.forEach((input, index) => {
  console.log(`\n--- 테스트 케이스 ${index + 1} ---`)
  console.log('입력:', JSON.stringify(input, null, 2))
  
  const dummyLetter = generateDummyLetter(input)
  console.log('\n생성된 편지:')
  console.log('='.repeat(50))
  console.log(dummyLetter)
  console.log('='.repeat(50))
})

// API 호출 테스트 (API 키가 있는 경우)
console.log('\n\n🔗 API 호출 테스트:')
EXAMPLE_INPUTS.slice(0, 1).forEach(async (input, index) => {
  console.log(`\n--- API 테스트 케이스 ${index + 1} ---`)
  console.log('입력:', JSON.stringify(input, null, 2))
  
  try {
    const letter = await generateLetterWithFallback(input)
    console.log('\n생성된 편지:')
    console.log('='.repeat(50))
    console.log(letter)
    console.log('='.repeat(50))
  } catch (error) {
    console.error('API 호출 실패:', error)
  }
})

// OpenAI 인스턴스 초기화 테스트
console.log('\n\n🔧 OpenAI 인스턴스 초기화 테스트:')
console.log('환경변수 VITE_OPENAI_API_KEY 확인 중...')
const apiKey = import.meta.env?.VITE_OPENAI_API_KEY || process.env?.VITE_OPENAI_API_KEY
if (apiKey) {
  console.log('✅ API 키가 설정되어 있습니다.')
  console.log('API 키 길이:', apiKey.length)
  console.log('API 키 시작 부분:', apiKey.substring(0, 7) + '...')
} else {
  console.log('❌ API 키가 설정되지 않았습니다.')
  console.log('💡 .env.local 파일에 VITE_OPENAI_API_KEY를 설정해주세요.')
}
