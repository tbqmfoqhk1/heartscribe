// 감정 유형
export type EmotionType = 
  | 'apology'      // 사과
  | 'confession'   // 고백
  | 'resignation'  // 퇴사
  | 'celebration'  // 축하
  | 'gratitude'    // 감사
  | 'comfort'      // 위로
  | 'encouragement' // 격려

// 문체 스타일
export type ToneType = 
  | 'polite'       // 정중한
  | 'friendly'     // 친근한
  | 'formal'       // 격식있는
  | 'emotional'    // 감성적인
  | 'concise'      // 간결한

// 편지 길이
export type LengthType = 'short' | 'medium' | 'long'

// 사용자 입력 데이터
export interface LetterInput {
  emotion: EmotionType
  tone: ToneType
  length: LengthType
  mustInclude?: string
  mustAvoid?: string
  situation: string
}

// 감정 유형 매핑
export const EMOTION_LABELS: Record<EmotionType, string> = {
  apology: '사과',
  confession: '고백',
  resignation: '퇴사',
  celebration: '축하',
  gratitude: '감사',
  comfort: '위로',
  encouragement: '격려'
}

// 문체 스타일 매핑
export const TONE_LABELS: Record<ToneType, string> = {
  polite: '정중한',
  friendly: '친근한',
  formal: '격식있는',
  emotional: '감성적인',
  concise: '간결한'
}

// 길이 매핑
export const LENGTH_LABELS: Record<LengthType, string> = {
  short: '짧은',
  medium: '보통',
  long: '긴'
}
