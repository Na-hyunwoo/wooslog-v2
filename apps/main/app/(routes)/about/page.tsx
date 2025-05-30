import Image from 'next/image';

import { AboutPageSchema } from '../../../components/AboutPageSchema';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    '프론트엔드 개발자 나현우입니다. 확장성을 고려한 코드 작성을 중요하게 생각하며, 지속 가능한 방식으로 성장하는 방법에 대해 고민합니다.',
  openGraph: {
    description:
      '프론트엔드 개발자 나현우입니다. 확장성을 고려한 코드 작성을 중요하게 생각하며, 지속 가능한 방식으로 성장하는 방법에 대해 고민합니다.',
    images: ['/avatar.png'],
    title: '나현우 소개',
    type: 'profile',
  },
  title: '소개',
};

export default function About() {
  return (
    <main className="mx-auto max-w-screen-sm py-8 px-2 break-all">
      <AboutPageSchema />

      <Image
        src="/avatar.png"
        alt="nahyunwoo"
        width={80}
        height={80}
        className="rounded-full shadow-2xl"
      />
      <div className="mt-8 flex flex-col gap-y-4 font-medium">
        <p>안녕하세요, 프론트엔드 개발자 나현우입니다.</p>
        <p>
          2021년 12월, 운 좋게{' '}
          <a
            href="https://wrtn.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            뤼튼
          </a>
          에서 개발자로 커리어를 시작했습니다. 이후 2023년 2월부터 현재까지{' '}
          <a
            href="https://www.tumblbug.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            텀블벅
          </a>
          에서 서비스 운영을 담당하고 있습니다.
        </p>
        <p>
          여러 차례 신규 웹 애플리케이션을 구축한 경험이 있으며, 현재 속한 조직은 애플리케이션
          규모에 비해 개발 인원이 적어, 웹 개발 환경에서 발생하는 광범위한 문제를 해결하는 데
          집중하고 있습니다.
        </p>
        <p>
          개발할 때는 확장성을 고려한 코드 작성을 중요하게 생각하며, 지속 가능한 방식으로 성장하는
          방법에 대해 고민합니다.
        </p>
        <p>현재 가장 관심 있는 기술 과제는 다음과 같습니다:</p>
        <ol>
          <li className="ml-2">
            1. 대규모 React 애플리케이션을 안전하게 Next.js로 마이그레이션하는 방법
          </li>
          <li className="ml-2">2. 팀의 생산성을 저하시키지 않는 디자인 시스템을 구축하는 방법</li>
        </ol>
        <p>
          이 외에도 웹뷰 환경에서 다루기 까다로운 문제(중첩 모달, 백 버튼 처리 등) 에 관심이
          많습니다.
        </p>
        <p>
          더 궁금한 점이 있으시면 언제든 연락 주세요! 👉{' '}
          <a
            href="mailto:contactharry97@gmail.com"
            className="inline-block font-bold text-[#3182f6] underline transition-transform duration-200 lg:hover:scale-105"
          >
            메일 보내기
          </a>
        </p>
      </div>
    </main>
  );
}
