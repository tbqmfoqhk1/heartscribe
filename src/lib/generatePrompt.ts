import { LetterInput } from '../types/letter'
import { EMOTION_LABELS, TONE_LABELS } from '../types/letter'
import { mapLengthToCharCount } from '../utils/mapLength'

/**
 * 사용자 입력값을 바탕으로 GPT에 전달할 프롬프트를 생성하는 함수
 * @param input - 사용자 입력 데이터
 * @returns GPT 프롬프트 문자열
 */
export function generatePromptFromInput(input: LetterInput): string {
  const {
    emotion,
    tone,
    length,
    mustInclude,
    mustAvoid,
    situation
  } = input

  // 감정 유형과 문체를 한국어로 변환
  const emotionLabel = EMOTION_LABELS[emotion]
  const toneLabel = TONE_LABELS[tone]
  const lengthDescription = mapLengthToCharCount(length)

  // 포함해야 할 문장 조건
  const includeCondition = mustInclude && mustInclude.trim() 
    ? `- 포함해야 할 문장: "${mustInclude.trim()}"`
    : '- 포함해야 할 문장: 없음'

  // 피해야 할 표현 조건
  const avoidCondition = mustAvoid && mustAvoid.trim()
    ? `- 피해야 할 표현: "${mustAvoid.trim()}"`
    : '- 피해야 할 표현: 없음'

  // 프롬프트 템플릿 생성
  const prompt = `너는 상대방의 감정과 상황에 맞는 편지를 대신 작성해주는 감정 대필가야.  
사용자가 전달한 정보들을 바탕으로, 진심을 담은 편지를 한 편 써줘.

<제약 조건>
- 감정 유형: ${emotionLabel}
- 문체 스타일: ${toneLabel}
- 편지 길이: ${lengthDescription}
${includeCondition}
${avoidCondition}

<상황 설명>
${situation}

이 모든 조건을 바탕으로 진정성 있고, 감정이 잘 전달되며, 자연스러운 한국어 편지를 작성해줘.  
형식적인 문장보다는 진심이 느껴지는 문장으로 구성하고, 맥락 없이 과도한 문학적 표현은 자제해.

편지 내용만 작성하고, 다른 설명이나 주석은 포함하지 마.`

  return prompt
}

/**
 * 프롬프트 생성 함수의 테스트용 예시 데이터
 */
export const EXAMPLE_INPUTS: LetterInput[] = [
  {
    emotion: 'apology',
    tone: 'polite',
    length: 'medium',
    mustInclude: '앞으로는 더 신중하게 행동하겠습니다',
    mustAvoid: '미안합니다',
    situation: '친구와 함께 프로젝트를 진행했는데, 제가 마감일을 놓쳐서 팀 전체가 곤란한 상황에 처했어요. 친구가 많이 실망했고, 저도 정말 후회스러워요. 다시 한번 기회를 달라고 사과하고 싶어요.'
  },
  {
    emotion: 'confession',
    tone: 'emotional',
    length: 'long',
    situation: '같은 회사에서 2년간 함께 일한 동료에게 마음이 생겼어요. 처음에는 단순한 동료로만 생각했는데, 매일 만나면서 그의 따뜻함과 성실함에 점점 끌리게 되었어요. 이제는 더 이상 숨기고 싶지 않아서 고백하고 싶어요.'
  },
  {
    emotion: 'celebration',
    tone: 'friendly',
    length: 'short',
    mustInclude: '정말 자랑스러워!',
    situation: '동생이 대학 입학시험에 합격했어요! 정말 기쁘고 자랑스러워요. 동생이 얼마나 열심히 공부했는지 다 봐왔는데, 그 노력이 결실을 맺어서 정말 기쁩니다.'
  }
]

/**
 * 프롬프트 생성 함수를 테스트하는 함수
 * @param input - 테스트할 입력 데이터
 */
export function testPromptGeneration(input: LetterInput): void {
  console.log('=== 프롬프트 생성 테스트 ===')
  console.log('입력 데이터:', JSON.stringify(input, null, 2))
  console.log('\n생성된 프롬프트:')
  console.log('='.repeat(50))
  console.log(generatePromptFromInput(input))
  console.log('='.repeat(50))
}
