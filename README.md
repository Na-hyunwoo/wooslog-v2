# Wooslog v2

Notion API를 활용한 개인 블로그 플랫폼입니다. Next.js App Router를 사용하고 있으며, Turborepo를 통한 모노레포 구조로 구성되어 있습니다.

## 프로젝트 구조

```
wooslog-v2/
├── apps/
│   └── main/          # 메인 블로그 애플리케이션
├── packages/
│   ├── eslint-config/  # 공유 ESLint 설정
│   ├── prettier-config/ # 공유 Prettier 설정
│   ├── tailwind-config/ # 공유 Tailwind 설정
│   ├── tsconfig/       # 공유 TypeScript 설정
│   └── ui/            # 공유 UI 컴포넌트
```

## 기술 스택

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **패키지 관리**: pnpm
- **모노레포 관리**: Turborepo
- **컨텐츠 관리**: Notion API
- **배포**: GitHub Actions, Oracle Cloud, Docker

## 주요 기능

- Notion을 CMS로 활용한 블로그 컨텐츠 관리
- 정적 생성(SSG) 지원
- 이미지 최적화 및 지연 로딩(lazy loading)
- 반응형 디자인
- 코드 블록 구문 강조(syntax highlighting)

## 구성 요소

### 메인 앱 (apps/main)

블로그의 핵심 기능을 포함하고 있는 Next.js 애플리케이션입니다.

- **페이지 구조**:

  - 홈(`/posts`): 블로그 포스트 목록 표시
  - 포스트(`/posts/[id]`): 개별 블로그 포스트 표시
  - 소개(`/about`): 소개 페이지

- **주요 컴포넌트**:
  - `Card`: 블로그 포스트 카드 (이미지 lazy loading 적용)
  - `BlockConverter`: Notion 블록을 React 컴포넌트로 변환

### 공유 패키지 (packages/\*)

모노레포 구조에서 여러 앱이 공유할 수 있는 설정과 컴포넌트들을 포함합니다.

## 배포

GitHub Actions를 통해 CI/CD 파이프라인을 구성하여 Oracle Cloud 서버에 Docker 컨테이너로 배포합니다.

## 참고 사항

이 저장소는 개인 블로그 개발 과정 및 결과물을 공유하기 위한 목적으로 공개되었습니다. 개발자로서 성장하기 위해 의견을 나누고 소통하기 위한 공간입니다.

## 라이선스

MIT © hyunwoo
