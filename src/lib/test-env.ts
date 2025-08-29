// 환경변수 테스트 스크립트
console.log('🔧 환경변수 테스트 시작\n')

// Node.js 환경에서는 process.env만 사용 가능
console.log('1. process.env 접근:')
console.log('VITE_OPENAI_API_KEY:', process.env.VITE_OPENAI_API_KEY ? '설정됨' : '설정되지 않음')
console.log('API 키 길이:', process.env.VITE_OPENAI_API_KEY?.length || 0)

console.log('\n2. 전체 환경변수 확인:')
console.log('process.env 키들:', Object.keys(process.env).filter(key => key.includes('OPENAI')))

console.log('\n3. API 키 시작 부분 (보안상 일부만):')
const apiKey = process.env.VITE_OPENAI_API_KEY
if (apiKey) {
  console.log('API 키 시작:', apiKey.substring(0, 7) + '...')
  console.log('API 키 끝:', '...' + apiKey.substring(apiKey.length - 4))
} else {
  console.log('❌ API 키가 설정되지 않았습니다.')
  console.log('💡 .env.local 파일에 VITE_OPENAI_API_KEY=your_api_key_here 를 추가해주세요.')
}
