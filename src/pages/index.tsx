import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/common/Layout';
import TopBanner from '@/components/home/TopBanner';
import ChallengeCardWide from '@/components/home/ChallengeCardWide';
import ChallengeCard from '@/components/home/ChallengeCard';
import ChallengeRequest from '@/components/home/ChallengeRequest';

const myData = [
  {
    challenge_id: 34525,
    title: '기술 면접 1기',
    thumbnail: 'https://via.placeholder.com/226x108.jpg',
  },
  {
    challenge_id: 341756,
    title: '기술 면접 2기',
    thumbnail: 'https://via.placeholder.com/226x108.jpg',
  },
  {
    challenge_id: 69565,
    title: '챌린지챌린지챌린지챌린지챌린지챌린지',
    thumbnail: 'https://via.placeholder.com/226x108.jpg',
  },
  {
    challenge_id: 154654,
    title: '챌린지챌린지챌린지챌린지챌린지챌린지',
    thumbnail: 'https://via.placeholder.com/226x108.jpg',
  },
];

export default function Home() {
  return (
    <Layout headerText="WAVED">
      <TopBanner />
      <SSection>
        <STitleLink href="/mychallenge">
          <h2>진행 중인 챌린지</h2>
          <Image
            src="/icons/icon-left-arrow.svg"
            alt="마이 챌린지로 가기"
            width={24}
            height={24}
            priority
          />
        </STitleLink>
        <SListScrollX>
          {myData.map((challenge) => (
            // 현재 key 속성 누락 콘솔 경고 발생 : Warning: Each child in a list should have a unique "key" prop.
            // 추후 challenge_id 값 받아와 key로 설정해 문제 해결 예정
            <ChallengeCardWide {...challenge} />
          ))}
        </SListScrollX>
      </SSection>
      <SSection>
        <STitle>
          <h2>💻 프론트엔드 챌린지</h2>
          <p>프론트엔드 개발자들을 위한 챌린지</p>
        </STitle>
        <SListGrid>
          {myData.map((challenge) => (
            <ChallengeCard {...challenge} />
          ))}
        </SListGrid>
      </SSection>
      <SSection>
        <STitle>
          <h2>👨‍💻 백엔드 챌린지</h2>
          <p>백엔드 개발자들을 위한 챌린지</p>
        </STitle>
        <SListGrid>
          {myData.map((challenge) => (
            <ChallengeCard {...challenge} />
          ))}
        </SListGrid>
      </SSection>
      <SSection>
        <STitle>
          <h2>🏃‍♂️ 학습 챌린지</h2>
          <p>확정 텍스트가 필요한 챌린지 챌린지 챌린지</p>
        </STitle>
        <SListGrid>
          {myData.map((challenge) => (
            <ChallengeCard {...challenge} />
          ))}
        </SListGrid>
      </SSection>
      <SSection>
        <STitle>
          <h2>🏃‍♂️ 생활 챌린지</h2>
          <p>확정 텍스트가 필요한 챌린지 챌린지 챌린지</p>
        </STitle>
        <SListGrid>
          {myData.map((challenge) => (
            <ChallengeCard {...challenge} />
          ))}
        </SListGrid>
      </SSection>
      <ChallengeRequest />
    </Layout>
  );
}

const SSection = styled.section`
  &:last-of-type {
    padding-bottom: 20px;
  }
`;

const STitleLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 2.5rem);
  height: 44px;
  margin: 0.75rem 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  h2 {
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  }
  img {
    transform: rotate(180deg);
    display: inline-block;
    width: 24px;
    height: 24px;
  }
`;

const STitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 2.5rem);
  min-height: 44px;
  margin: 1.5rem 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  h2 {
    line-height: 24px;
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  }
  p {
    line-height: 20px;
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
  }
`;

const SListScrollX = styled.ul`
  width: 100%;
  overflow-x: auto;
  padding: 0 20px;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  /* 스크롤바 미노출 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;

const SListGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(10px, 1fr));
  grid-row-gap: 1rem;
  grid-column-gap: 0.5rem;
  width: 100%;
  padding: 0 1.25rem;
`;
