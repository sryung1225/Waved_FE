import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { SHeaderWrapper } from '@/components/common/Header';
import Notification from '@/components/home/Notification';

export default function HomeHeader({ updateKey }: { updateKey: boolean }) {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  useEffect(() => {
    const hasAccessToken = !!getCookie('accessToken');
    if (hasAccessToken) {
      setIsLogined(hasAccessToken);
    }
  }, []);
  return (
    <>
      <Head>
        <title>WAVED</title>
        <meta
          name="description"
          content="개발 직군 취준생들을 위한 챌린지 서비스, WAVED입니다."
        />
      </Head>
      <SHeader>
        <SLogo>
          <h1 className="a11yHidden">WAVED</h1>
          <Image
            src="/icons/icon-waved.svg"
            alt="WAVED 로고"
            width={90}
            height={20}
          />
        </SLogo>
        {isLogined && <Notification updateKey={updateKey} />}
      </SHeader>
    </>
  );
}

const SHeader = styled(SHeaderWrapper)`
  justify-content: space-between;
  padding: 0 1.25rem;
`;

const SLogo = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
`;
