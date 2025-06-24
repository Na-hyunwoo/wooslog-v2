import Image from 'next/image';

import { AboutPageSchema } from './components';

import { PageViewTracker } from '@/components';
import { METADATA } from '@/const';

export const metadata = METADATA.ABOUT;

export default function About() {
  return (
    <main className="mx-auto max-w-screen-sm py-8 px-4 break-all">
      <AboutPageSchema />
      <PageViewTracker pageType="about" />

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
          저는 자사고에서 대입 실패를 경험하며 이를 극복하지 못해 정신적 트라우마를 앓았습니다.
          감정의 밑바닥을 경험하고 얻은 교훈은 의미 있는 일을 해야겠다는 생각으로 이어졌습니다. 이는
          현시대에 가장 영향력 있는 도구인 소프트웨어에 발을 들이게 되는 계기가 되었습니다.
        </p>
        <p>
          큰 임펙트를 내기 위해 가장 먼저 해야 하는 일은 나와 가까운 문제를 해결하는 것이라 생각해
          눈 앞에있는 문제를 정의하고 해결하는 습관을 지니고 있습니다. 능동적으로 병목을 파악하여 웹
          페이지의 성능을 높이기 위한 이미지 최적화 작업을 진행한 경험이 있고, 광고 플랫폼을 빠른
          시간에 만들어 회사의 현금 흐름을 창출한 경험도 있습니다.
        </p>
        <p>
          뿐만 아니라, 오랫동안 해결되지 못했던 많은 레거시를 제거하며 아무도 하려 하지 않았던
          중요한 문제들을 해결하였습니다.
        </p>
        <p>
          2021년 12월{' '}
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
        <p>
          더 궁금한 점이 있으시면 편하게{' '}
          <a
            href="mailto:contactharry97@gmail.com"
            className="inline-block font-bold text-[#3182f6] underline"
          >
            연락
          </a>
          주세요.
        </p>
      </div>
    </main>
  );
}
