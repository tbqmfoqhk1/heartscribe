import OpenAI from 'openai'

// 분석 결과 타입
export interface AnalysisResult {
  emotion: string
  tone: string
  length: string
  situation: string
  mustInclude?: string
  mustAvoid?: string
}

// OpenAI 인스턴스 초기화
let openai: OpenAI | null = null

function initializeOpenAI(): OpenAI | null {
  try {
    // 브라우저와 Node.js 환경 모두 지원
    let apiKey: string | undefined
    
    if (typeof window !== 'undefined') {
      apiKey = (import.meta as any)?.env?.VITE_OPENAI_API_KEY
    } else {
      apiKey = (process as any)?.env?.VITE_OPENAI_API_KEY
    }
    
    if (!apiKey || apiKey.includes('dummy') || apiKey.includes('test')) {
      console.warn('OpenAI API 키가 설정되지 않았습니다.')
      return null
    }

    const client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    })

    return client
  } catch (error) {
    console.error('OpenAI 인스턴스 초기화 실패:', error)
    return null
  }
}

/**
 * 자연어 입력을 분석하여 편지 생성에 필요한 정보를 추출하는 함수
 * @param userInput - 사용자가 입력한 자연어 문장
 * @returns 분석 결과
 */
export async function analyzeUserInput(userInput: string): Promise<AnalysisResult> {
  try {
    // OpenAI 인스턴스 초기화
    if (!openai) {
      openai = initializeOpenAI()
    }

    if (!openai) {
      // API 키가 없으면 기본 분석 로직 사용
      return analyzeWithBasicLogic(userInput)
    }

    // 10초 타임아웃 설정
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('분석 시간이 초과되었습니다.')), 10000)
    })

    // GPT를 사용한 분석 (빠른 응답을 위해 gpt-3.5-turbo 사용)
    const prompt = `분석: "${userInput}" -> JSON: {"emotion":"감정","tone":"문체","length":"길이","situation":"상황","mustInclude":"포함문장","mustAvoid":"제외문장"}`

    const analysisPromise = openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // 더 빠른 모델 사용
      messages: [
        {
          role: 'system',
          content: '사용자 입력을 분석하여 JSON으로 응답. emotion:사과/고백/축하/감사/위로/격려/퇴사, tone:정중한/친근한/격식있는/감성적인/간결한, length:short/medium/long'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200, // 토큰 수 줄임
      temperature: 0.1
    })

    // 타임아웃과 분석을 경쟁시킴
    const completion = await Promise.race([analysisPromise, timeoutPromise])

    const response = completion.choices[0].message.content
    if (!response) {
      throw new Error('분석 결과가 생성되지 않았습니다.')
    }

    // JSON 파싱 (더 안전한 파싱)
    let analysis
    try {
      // JSON 부분만 추출
      const jsonMatch = response.match(/\{.*\}/)
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('JSON 형식이 아닙니다.')
      }
    } catch (parseError) {
      console.error('JSON 파싱 실패, 기본 로직 사용:', parseError)
      return analyzeWithBasicLogic(userInput)
    }
    
    return {
      emotion: analysis.emotion || 'gratitude',
      tone: analysis.tone || 'polite',
      length: analysis.length || 'medium',
      situation: analysis.situation || userInput,
      mustInclude: analysis.mustInclude,
      mustAvoid: analysis.mustAvoid
    }

  } catch (error) {
    console.error('자연어 분석 실패:', error)
    
    // 타임아웃이나 API 오류 시 기본 분석 로직 사용
    if (error instanceof Error && error.message.includes('분석 시간이 초과')) {
      console.log('분석 시간 초과로 기본 로직 사용')
    } else {
      console.log('API 오류로 기본 로직 사용')
    }
    
    return analyzeWithBasicLogic(userInput)
  }
}

/**
 * 기본 로직을 사용한 분석 (GPT 사용 불가능할 때)
 * @param userInput - 사용자 입력
 * @returns 분석 결과
 */
function analyzeWithBasicLogic(userInput: string): AnalysisResult {
  const input = userInput.toLowerCase()
  
  // 감정 유형 추출
  let emotion = 'gratitude' // 기본값
  if (input.includes('사과') || input.includes('미안') || input.includes('죄송')) {
    emotion = 'apology'
  } else if (input.includes('고백') || input.includes('마음') || input.includes('사랑')) {
    emotion = 'confession'
  } else if (input.includes('축하') || input.includes('생일') || input.includes('합격')) {
    emotion = 'celebration'
  } else if (input.includes('감사') || input.includes('고마워')) {
    emotion = 'gratitude'
  } else if (input.includes('위로') || input.includes('힘들') || input.includes('아파')) {
    emotion = 'comfort'
  } else if (input.includes('격려') || input.includes('응원') || input.includes('힘내')) {
    emotion = 'encouragement'
  } else if (input.includes('퇴사') || input.includes('이직')) {
    emotion = 'resignation'
  }

  // 문체 스타일 추출
  let tone = 'polite' // 기본값
  if (input.includes('딱딱') || input.includes('격식') || input.includes('정중')) {
    tone = 'formal'
  } else if (input.includes('친근') || input.includes('편안') || input.includes('친구')) {
    tone = 'friendly'
  } else if (input.includes('감성') || input.includes('따뜻') || input.includes('마음')) {
    tone = 'emotional'
  } else if (input.includes('간결') || input.includes('짧') || input.includes('간단')) {
    tone = 'concise'
  }

  // 길이 추출
  let length = 'medium' // 기본값
  if (input.includes('짧') || input.includes('간단') || input.includes('간결')) {
    length = 'short'
  } else if (input.includes('길') || input.includes('자세') || input.includes('풍부')) {
    length = 'long'
  }

  // 포함/제외 문장 추출
  let mustInclude = undefined
  let mustAvoid = undefined
  
  if (input.includes('포함') || input.includes('넣어')) {
    const includeMatch = input.match(/(포함|넣어).*?(?=\.|요|다|고)/)
    if (includeMatch) {
      mustInclude = includeMatch[0]
    }
  }
  
  if (input.includes('피해') || input.includes('제외') || input.includes('안 써')) {
    const avoidMatch = input.match(/(피해|제외|안 써).*?(?=\.|요|다|고)/)
    if (avoidMatch) {
      mustAvoid = avoidMatch[0]
    }
  }

  return {
    emotion,
    tone,
    length,
    situation: userInput,
    mustInclude,
    mustAvoid
  }
}

/**
 * 분석 결과를 사용자 친화적인 텍스트로 변환
 * @param analysis - 분석 결과
 * @returns 사용자 친화적인 설명
 */
export function formatAnalysisResult(analysis: AnalysisResult): string {
  const emotionLabels: Record<string, string> = {
    apology: '사과',
    confession: '고백',
    celebration: '축하',
    gratitude: '감사',
    comfort: '위로',
    encouragement: '격려',
    resignation: '퇴사'
  }

  const toneLabels: Record<string, string> = {
    polite: '정중한',
    friendly: '친근한',
    formal: '격식있는',
    emotional: '감성적인',
    concise: '간결한'
  }

  const lengthLabels: Record<string, string> = {
    short: '짧은',
    medium: '보통',
    long: '긴'
  }

  let result = `📝 분석 결과:\n\n`
  result += `• 감정: ${emotionLabels[analysis.emotion] || analysis.emotion}\n`
  result += `• 문체: ${toneLabels[analysis.tone] || analysis.tone}\n`
  result += `• 길이: ${lengthLabels[analysis.length] || analysis.length}\n`
  result += `• 상황: ${analysis.situation}\n`

  if (analysis.mustInclude) {
    result += `• 포함할 문장: ${analysis.mustInclude}\n`
  }

  if (analysis.mustAvoid) {
    result += `• 피할 표현: ${analysis.mustAvoid}\n`
  }

  return result
}
