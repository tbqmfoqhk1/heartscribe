import { LetterInput } from '../types/letter'
import { generatePromptFromInput } from './generatePrompt'
import OpenAI from 'openai'

// 환경변수 로딩 (Node.js 환경에서만)
if (typeof process !== 'undefined' && process.env) {
  try {
    require('dotenv').config({ path: '.env.local' })
  } catch (error) {
    console.warn('dotenv 로딩 실패:', error)
  }
}

// OpenAI 인스턴스 초기화
let openai: OpenAI | null = null

function initializeOpenAI(): OpenAI | null {
  try {
    // API 키 확인 (브라우저와 Node.js 환경 모두 지원)
    let apiKey: string | undefined
    
    // 브라우저 환경에서는 import.meta.env 사용
    if (typeof window !== 'undefined') {
      apiKey = import.meta.env?.VITE_OPENAI_API_KEY
      console.log('브라우저 환경에서 API 키 확인:', apiKey ? '있음' : '없음')
    } else {
      // Node.js 환경에서는 process.env 사용
      apiKey = process.env?.VITE_OPENAI_API_KEY
      console.log('Node.js 환경에서 API 키 확인:', apiKey ? '있음' : '없음')
    }
    
    if (!apiKey) {
      console.warn('OpenAI API 키가 설정되지 않았습니다.')
      console.log('브라우저 환경:', typeof window !== 'undefined')
      console.log('import.meta.env.VITE_OPENAI_API_KEY:', import.meta.env?.VITE_OPENAI_API_KEY ? '있음' : '없음')
      console.log('process.env.VITE_OPENAI_API_KEY:', process.env?.VITE_OPENAI_API_KEY ? '있음' : '없음')
      return null
    }

    // 더미 키인지 확인
    if (apiKey.includes('dummy') || apiKey.includes('test')) {
      console.warn('더미 API 키가 감지되었습니다. 실제 API 키를 설정해주세요.')
      return null
    }

    // OpenAI 인스턴스 생성
    const client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // 브라우저 환경에서 사용하기 위해 필요
    })

    console.log('OpenAI 인스턴스가 성공적으로 초기화되었습니다.')
    console.log('API 키 길이:', apiKey.length)
    return client
  } catch (error) {
    console.error('OpenAI 인스턴스 초기화 실패:', error)
    return null
  }
}

/**
 * GPT API를 호출하여 편지를 생성하는 함수
 * @param input - 사용자 입력 데이터
 * @returns 생성된 편지 내용
 */
export async function generateLetter(input: LetterInput): Promise<string> {
  try {
    // OpenAI 인스턴스 초기화 (캐시된 인스턴스가 없으면 새로 생성)
    if (!openai) {
      openai = initializeOpenAI()
    }

    if (!openai) {
      throw new Error('OpenAI 인스턴스 초기화에 실패했습니다. API 키를 확인해주세요.')
    }

    // 프롬프트 생성
    const prompt = generatePromptFromInput(input)
    
    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: '당신은 감정이 풍부하고 진심이 담긴 편지를 작성하는 전문가입니다. 사용자의 요청에 따라 자연스럽고 감동적인 편지를 작성해주세요.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('편지 생성에 실패했습니다.')
    }

    const generatedContent = completion.choices[0].message.content
    if (!generatedContent) {
      throw new Error('편지 내용이 생성되지 않았습니다.')
    }

    return generatedContent.trim()

  } catch (error) {
    console.error('편지 생성 중 오류 발생:', error)
    
    // OpenAI API 관련 오류 처리
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('API 설정이 필요합니다. 환경변수 VITE_OPENAI_API_KEY를 확인해주세요.')
      } else if (error.message.includes('rate limit')) {
        throw new Error('API 호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요.')
      } else if (error.message.includes('quota')) {
        throw new Error('API 사용량 한도를 초과했습니다. 잠시 후 다시 시도해주세요.')
      }
    }
    
    throw new Error('편지 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
  }
}

/**
 * 더미 데이터로 편지를 생성하는 함수 (API 키가 없을 때 사용)
 * @param input - 사용자 입력 데이터
 * @returns 더미 편지 내용
 */
export function generateDummyLetter(input: LetterInput): string {
  const { emotion, tone, length, situation, mustInclude, mustAvoid } = input
  
  // 감정별 기본 템플릿
  const templates = {
    apology: `안녕하세요,

${situation}

정말 죄송합니다. 제가 한 실수로 인해 곤란한 상황이 되었고, 마음이 무겁습니다.

${mustInclude ? mustInclude : '앞으로는 더욱 신중하게 행동하겠습니다.'}

다시 한번 기회를 주시면 감사하겠습니다.

[이름]`,
    
    confession: `안녕하세요,

${situation}

이 편지를 쓰면서도 마음이 떨립니다. 당신을 바라보는 제 마음이 조금씩 변해왔다는 것을 깨달았습니다.

처음에는 단순히 좋은 동료라고만 생각했습니다. 하지만 매일 만나면서, 당신의 따뜻한 모습에 점점 마음이 끌리게 되었습니다.

${mustInclude ? mustInclude : '이 마음을 전하지 않으면 평생 후회할 것 같아서 용기를 내어 편지를 씁니다.'}

답장을 기다리겠습니다.

[이름]`,
    
    celebration: `축하합니다! 🎉

${situation}

${mustInclude ? mustInclude : '정말 자랑스럽고 기쁩니다!'}

앞으로도 더욱 성공하시길 바랍니다!

[이름]`,
    
    gratitude: `안녕하세요,

${situation}

그동안 보내주신 관심과 도움에 깊이 감사드립니다.

${mustInclude ? mustInclude : '정말 감사합니다.'}

앞으로도 더욱 열심히 하겠습니다.

[이름]`,
    
    comfort: `안녕하세요,

${situation}

지금 많이 힘들겠어요. 하지만 시간이 모든 것을 치유해줄 거예요.

${mustInclude ? mustInclude : '당신이 혼자가 아니라는 걸 잊지 마세요.'}

항상 응원하겠습니다.

[이름]`,
    
    encouragement: `안녕하세요,

${situation}

힘든 시간이지만, 당신은 충분히 해낼 수 있어요.

${mustInclude ? mustInclude : '포기하지 마세요. 당신을 믿습니다.'}

함께 이겨내요!

[이름]`,
    
    resignation: `안녕하세요,

${situation}

그동안 함께 일하며 배운 것들이 많았습니다.

${mustInclude ? mustInclude : '새로운 도전을 응원합니다.'}

건강하시고 행복하세요.

[이름]`
  }

  // 감정에 따른 템플릿 선택
  const template = templates[emotion] || templates.gratitude
  
  // 길이에 따른 조정
  let result = template
  if (length === 'short') {
    // 짧은 편지는 핵심만 추출
    const lines = result.split('\n\n')
    if (lines.length > 2) {
      result = lines[0] + '\n\n' + lines[lines.length - 1]
    }
  } else if (length === 'long') {
    // 긴 편지는 추가 내용 삽입
    result = result.replace('[이름]', `\n\n새로운 시작을 응원합니다.\n\n[이름]`)
  }

  return result
}

/**
 * 편지 생성 함수 (API 키 유무에 따라 자동 선택)
 * @param input - 사용자 입력 데이터
 * @returns 생성된 편지 내용
 */
export async function generateLetterWithFallback(input: LetterInput): Promise<string> {
  try {
    // OpenAI 인스턴스 초기화 시도
    if (!openai) {
      openai = initializeOpenAI()
    }
    
    if (openai) {
      // OpenAI 인스턴스가 성공적으로 초기화되면 API 호출
      return await generateLetter(input)
    } else {
      // API 키가 없으면 더미 데이터 반환
      console.warn('OpenAI API 키가 설정되지 않아 더미 데이터를 반환합니다.')
      return generateDummyLetter(input)
    }
  } catch (error) {
    console.error('편지 생성 실패, 더미 데이터 반환:', error)
    return generateDummyLetter(input)
  }
}
