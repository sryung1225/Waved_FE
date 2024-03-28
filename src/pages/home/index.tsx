import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { SLayoutWrapper } from '@/components/common/Layout';
import Footer from '@/components/common/Footer';
import TopBanner from '@/components/home/TopBanner';
import ChallengeCardWide from '@/components/home/ChallengeCardWide';
import FloatingBtn from '@/components/home/FloatingBtn';
import HomeHeader from '@/components/home/HomeHeader';
import SnackBar from '@/components/common/SnackBar';
import ISnackBarState from '@/types/snackbar';
import IRecruitingChallenge from '@/types/recruitingChallenge';
import IMyProcessingChallenge from '@/types/myProcessingChallenge';
import RecruitingChallenge from '@/components/home/RecruitingChallenge';
import ScrollXBox from '@/components/common/ScrollXBox';
import {
  getMyProcessingChallengeApi,
  getRecruitingChallengeApi,
} from '@/lib/axios/home/api';
import createServerInstance from '@/lib/axios/serverInstance';
import serverErrorCatch from '@/lib/axios/serverErrorCatch';

interface IHome {
  isLogined: boolean;
  myProcessingChallenges: IMyProcessingChallenge[] | null;
  recruitingChallenges: IRecruitingChallenge[] | null;
  requireSnackBar?: boolean;
  errorMsg?: string;
}
export default function Home({
  isLogined,
  myProcessingChallenges,
  recruitingChallenges,
  requireSnackBar,
  errorMsg,
}: IHome) {
  const router = useRouter();
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
    type: 'warning',
  });

  useEffect(() => {
    const handleRedirect = async () => {
      const { redirected } = router.query;
      if (redirected) {
        setSnackBarState({
          open: true,
          text: '로그인이 필요한 페이지입니다.',
          type: 'warning',
        });
        await router.replace('/home', undefined, { shallow: true });
      }
      setTimeout(() => {
        setSnackBarState({
          open: false,
          text: '',
        });
      }, 3500);
    };
    handleRedirect().catch((error) => console.error(error));
  }, [router, router.query]);

  useEffect(() => {
    if (requireSnackBar && errorMsg) {
      setSnackBarState({
        open: true,
        text: errorMsg,
        type: 'warning',
      });
      setTimeout(() => {
        setSnackBarState({
          open: false,
          text: '',
        });
      }, 3500);
    }
  }, [requireSnackBar, errorMsg]);

  return (
    <SHomeWrapper>
      <HomeHeader />
      <main>
        <TopBanner />
        {isLogined &&
          myProcessingChallenges &&
          myProcessingChallenges.length > 0 && (
            <SSection>
              <STitleLink href="/mychallenge">
                <h2>👨‍💻 진행 중인 챌린지</h2>
                <Image
                  src="/icons/icon-left-arrow.svg"
                  alt="마이 챌린지로 가기"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(180deg)' }}
                  priority
                />
              </STitleLink>
              <ScrollXBox>
                <SListScrollX>
                  {myProcessingChallenges.map((challenge) => (
                    <ChallengeCardWide
                      key={challenge.challengeGroupId}
                      {...challenge}
                    />
                  ))}
                </SListScrollX>
              </ScrollXBox>
            </SSection>
          )}
        <RecruitingChallenge recruitingChallenges={recruitingChallenges} />
        {snackBarState.open && (
          <SnackBar text={snackBarState.text} type={snackBarState.type} />
        )}
      </main>
      <FloatingBtn type={isLogined ? 'challengeRequest' : 'register'} />
      <Footer />
    </SHomeWrapper>
  );
}

async function getServerSidePropsFunction(
  context: GetServerSidePropsContext,
): Promise<{
  props: {
    isLogined: boolean;
    myProcessingChallenges: IMyProcessingChallenge[] | null;
    recruitingChallenges: IRecruitingChallenge[] | null;
  };
}> {
  const cookieToken = getCookie('accessToken', context);
  const isLogined = !!cookieToken;
  const serverInstance = createServerInstance(context);
  const fetchMyProcessingChallenges = async () => {
    try {
      const response = await getMyProcessingChallengeApi(serverInstance);
      console.log('myProcessingChallenge API GET 성공');
      return response.data;
    } catch (error) {
      console.error('myProcessingChallenge API GET 실패', error);
      return null;
    }
  };
  const fetchRecruitingChallenges = async () => {
    const response = await getRecruitingChallengeApi(serverInstance);
    console.log('recruitingChallenge API GET 성공');
    return response.data;
  };
  const myProcessingChallenges = await fetchMyProcessingChallenges();
  const recruitingChallenges = await fetchRecruitingChallenges();
  return {
    props: {
      myProcessingChallenges,
      recruitingChallenges,
      isLogined,
    },
  };
}

export const getServerSideProps = serverErrorCatch(getServerSidePropsFunction);

const SHomeWrapper = styled(SLayoutWrapper)`
  position: relative;
  margin-bottom: 3rem;
`;

const SSection = styled.section`
  &::after {
    content: '';
    display: inline-block;
    width: 100%;
    height: 6px;
    margin: 1rem 0;
    background-color: ${({ theme }) => theme.color.gray_ec};
  }
`;

const STitleLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 2.5rem);
  height: 60px;
  margin: 0 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  h2 {
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  }
`;

const SListScrollX = styled.ul`
  margin: 0 1.25rem;
`;
