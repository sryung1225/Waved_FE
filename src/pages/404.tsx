import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { SLayoutWrapper } from '@/components/common/Layout';

export default function Custom404() {
  return (
    <SCustom404Wrapper noHeader noFooter>
      <Head>
        <title>WAVED | 404 에러</title>
        <meta name="description" content="해당 페이지를 찾을 수 없습니다." />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <main>
        <SCustom404>
          <Image
            src="/images/image-404.svg"
            alt="404 에러"
            width={247}
            height={247}
            priority
          />
          <SMainText>해당 페이지를 찾을 수 없습니다.</SMainText>
          <SSubText>
            찾으려는 페이지의 주소가 정확한지
            <br />
            다시 한번 확인해 주세요.
          </SSubText>
          <SLink href="/home">홈으로 이동</SLink>
        </SCustom404>
      </main>
    </SCustom404Wrapper>
  );
}

const SCustom404Wrapper = styled(SLayoutWrapper)`
  display: flex;
`;

const SCustom404 = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: auto 0;
`;

const SMainText = styled.h3`
  margin: 1rem 0 0.5rem;
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: ${({ theme }) => theme.fontWeight.headlineh2};
`;

const SSubText = styled.p`
  color: ${({ theme }) => theme.color.gray_52};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  text-align: center;
`;

const SLink = styled(Link)`
  margin: 2rem 0 4.5rem;
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  text-decoration: underline;
`;
