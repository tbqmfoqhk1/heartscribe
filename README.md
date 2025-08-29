# 💌 Heartscribe - 감정 대필 사무소

AI가 도와주는 감정 편지 생성 서비스입니다. 다양한 감정 상황에 맞춘 자연스러운 편지를 생성할 수 있습니다.

## 🚀 주요 기능

- **다양한 감정 지원**: 사과, 고백, 퇴사, 생일축하, 감사, 위로, 격려 등
- **맞춤형 문체**: 정중한, 친근한, 격식있는, 감성적인, 간결한
- **길이 조절**: 짧은, 보통, 긴 편지 길이 선택
- **상황별 맞춤화**: 구체적인 상황 설명을 통한 개인화된 편지 생성

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **AI**: GPT-4 API (OpenAI)

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정 (선택사항)
```bash
# OpenAI API 키가 있는 경우 .env.local 파일 생성
cp env.example .env.local
# .env.local 파일에서 VITE_OPENAI_API_KEY 설정
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드
```bash
npm run build
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── EmotionSelector.tsx      # 감정 선택 컴포넌트
│   ├── ToneSelector.tsx         # 문체 선택 컴포넌트
│   ├── LengthSelector.tsx       # 길이 선택 컴포넌트
│   ├── SituationTextarea.tsx    # 상황 설명 컴포넌트
│   └── AdditionalRequests.tsx   # 추가 요청사항 컴포넌트
├── pages/              # 페이지 컴포넌트
│   ├── Landing.tsx             # 랜딩 페이지
│   ├── CreateLetter.tsx        # 편지 생성 페이지
│   └── ResultPage.tsx          # 결과 페이지
├── lib/                # 핵심 로직
│   ├── generatePrompt.ts       # 프롬프트 생성 함수
│   └── generateLetter.ts       # 편지 생성 함수
├── types/              # TypeScript 타입 정의
│   └── letter.ts              # 편지 관련 타입
├── utils/              # 유틸리티 함수
│   └── mapLength.ts           # 길이 변환 유틸
└── App.tsx             # 메인 앱 컴포넌트
```

## 🎨 UI/UX 특징

- **감성적 디자인**: 따뜻한 색상과 부드러운 그라데이션
- **직관적 인터페이스**: 단계별 가이드와 명확한 옵션 선택
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원

## 🔧 개발 가이드라인

자세한 개발 규칙은 [`.cursor/rules/my-custom-rules.mdc`](.cursor/rules/my-custom-rules.mdc)를 참조하세요.

## 📝 사용 예시

1. **감정 선택**: 원하는 감정 유형 선택 (예: 사과)
2. **상황 설명**: 구체적인 상황을 자세히 입력
3. **스타일 설정**: 문체와 길이 선택
4. **편지 생성**: AI가 맞춤형 편지 생성

## 🔮 향후 계획

- [x] GPT-4 API 연동
- [ ] 편지 저장 및 관리 기능
- [ ] 편지 템플릿 기능
- [ ] 다국어 지원
- [ ] 소셜 공유 기능

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

💝 **Heartscribe**로 마음을 전해보세요!
