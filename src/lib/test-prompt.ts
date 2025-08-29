import { generatePromptFromInput, EXAMPLE_INPUTS, testPromptGeneration } from './generatePrompt'

// 테스트 실행
console.log('🚀 프롬프트 생성 함수 테스트 시작\n')

// 예시 데이터로 테스트
EXAMPLE_INPUTS.forEach((input, index) => {
  console.log(`\n📝 테스트 케이스 ${index + 1}:`)
  testPromptGeneration(input)
  console.log('\n' + '='.repeat(80) + '\n')
})

// 커스텀 테스트 케이스
const customTest: typeof EXAMPLE_INPUTS[0] = {
  emotion: 'gratitude',
  tone: 'formal',
  length: 'long',
  mustInclude: '삼가 감사드립니다',
  mustAvoid: '',
  situation: '회사에서 10년간 함께 일한 상사가 퇴직하게 되었어요. 그동안 정말 많은 것을 가르쳐주시고, 제가 실수할 때마다 따뜻하게 이끌어주셨어요. 정말 감사한 마음을 전하고 싶어요.'
}

console.log('📝 커스텀 테스트 케이스:')
testPromptGeneration(customTest)
