import { LengthType } from '../types/letter'

/**
 * 길이 옵션을 문자 수 기준으로 변환하는 함수
 * @param length - 길이 옵션 ('short' | 'medium' | 'long')
 * @returns 문자 수 기준 설명
 */
export function mapLengthToCharCount(length: LengthType): string {
  switch (length) {
    case 'short':
      return '약 100-200자'
    case 'medium':
      return '약 300-500자'
    case 'long':
      return '약 700-1000자'
    default:
      return '약 300-500자'
  }
}

/**
 * 길이 옵션을 한국어 설명으로 변환하는 함수
 * @param length - 길이 옵션 ('short' | 'medium' | 'long')
 * @returns 한국어 설명
 */
export function mapLengthToDescription(length: LengthType): string {
  switch (length) {
    case 'short':
      return '핵심만 간단히'
    case 'medium':
      return '적당한 분량'
    case 'long':
      return '자세하고 풍부한 내용'
    default:
      return '적당한 분량'
  }
}
