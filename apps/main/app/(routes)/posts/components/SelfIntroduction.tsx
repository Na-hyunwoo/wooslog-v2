import Image from 'next/image';

export const SelfIntroduction = () => {
  return (
    <section className="flex items-center bg-slate-800/50 justify-center gap-x-4 my-10 rounded-2xl p-4 w-fit mx-2">
      <Image
        src="/avatar.png"
        alt="avatar"
        width={80}
        height={80}
        className="rounded-full shadow-2xl"
        priority
      />
      <div>
        <p className="font-bold">나현우</p>
        <p className="font-medium text-xs md:text-sm">
          코드 한 줄에도 깊은 고민을 담는 개발자입니다. 단순히 작동하는 코드를 넘어, 유지보수성과
          확장성을 고려한 설계를 추구합니다.
        </p>
        <p className="font-medium text-xs md:text-sm hidden lg:block">
          시간에 쫓겨 삼켜야 했던 고민들을 개인 프로젝트에서 풀어내며, 그 과정에서 얻은 통찰력으로
          더 나은 개발자가 되려 노력합니다.
        </p>
      </div>
    </section>
  );
};
