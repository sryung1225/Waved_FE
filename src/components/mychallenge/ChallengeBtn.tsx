import Link from 'next/link';
import styled from '@emotion/styled';
import { TMyChallengeInfo, TMyChallengeStatus } from '@/types/myChallenge';
import calculateDDay from '@/utils/calculateDDay';

interface TBtn
  extends Pick<
    TMyChallengeInfo,
    'groupId' | 'isReviewed' | 'isVerified' | 'verificationType' | 'startDate'
  > {
  status: TMyChallengeStatus;
}

export default function ChallengeBtn({
  groupId,
  isReviewed,
  isVerified,
  verificationType,
  startDate,
  status,
}: TBtn) {
  const isAble = (() => {
    return status === 'progress'
      ? !isVerified
      : status === 'completed' && !isReviewed;
  })();

  const preventLink = (e: React.MouseEvent<HTMLElement>) => {
    if (!isAble) {
      e.preventDefault(); // 버튼이 비활성화 상태일 때 링크 이동 중지
    }
  };

  switch (status) {
    case 'progress':
      return (
        <SBtnWrapper>
          <SLink
            href={{
              pathname: `/verification/collection/${groupId}`,
              query: { type: verificationType },
            }}
          >
            <SBtn styleType="light">인증 내역</SBtn>
          </SLink>
          {verificationType === 'GITHUB' ? (
            <SBtn
              as="button"
              styleType="middle"
              onClick={() => console.log('test')}
            >
              인증 하기
            </SBtn>
          ) : (
            <SLink
              href={{
                pathname: `/verification/post/${groupId}`,
                query: { type: verificationType },
              }}
            >
              <SBtn
                styleType={isAble ? 'middle' : 'gray'}
                onClick={preventLink}
              >
                {isAble ? '인증 하기' : '인증 완료'}
              </SBtn>
            </SLink>
          )}
        </SBtnWrapper>
      );
    case 'waiting':
      return (
        <SBtnWrapper>
          <SBtn styleType="gray">
            챌린지 시작하기까지 D-{Math.abs(calculateDDay(startDate))}
          </SBtn>
        </SBtnWrapper>
      );
    case 'completed':
      return (
        <SBtnWrapper>
          <SLink href="#">
            <SBtn styleType="light">인증 내역</SBtn>
          </SLink>
          <SLink
            href={{
              pathname: `/mychallenge/review`,
              query: { groupId },
            }}
            as="mychallenge/review"
          >
            <SBtn
              styleType={isAble ? 'border' : 'bordergray'}
              onClick={preventLink}
            >
              {isAble ? '후기 작성' : '작성 완료'}
            </SBtn>
          </SLink>
        </SBtnWrapper>
      );
    default:
      return null;
  }
}

const SBtnWrapper = styled.div`
  display: flex;
  gap: 9px;
`;

const SLink = styled(Link)`
  width: 100%;
`;

const SBtn = styled.div<{
  styleType: 'light' | 'gray' | 'middle' | 'border' | 'bordergray';
}>`
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 8px;
  border: ${({ styleType, theme }) =>
    ({
      light: 'none',
      middle: 'none',
      gray: 'none',
      border: `1px solid ${theme.color.normal}`,
      bordergray: `1px solid ${theme.color.gray_99}`,
    })[styleType]};
  font-size: ${({ theme }) => theme.fontSize.body3};
  font-weight: ${({ theme }) => theme.fontWeight.body3};
  transition: 0.2s ease-in;
  color: ${({ styleType, theme }) =>
    ({
      light: theme.color.normal,
      middle: theme.color.white,
      gray: theme.color.gray_83,
      border: theme.color.normal,
      bordergray: theme.color.gray_99,
    })[styleType]};
  background-color: ${({ styleType, theme }) =>
    ({
      light: theme.color.light,
      middle: theme.color.normal,
      gray: theme.color.gray_ec,
      border: theme.color.white,
      bordergray: theme.color.white,
    })[styleType]};
  cursor: ${({ styleType }) =>
    styleType === 'gray' || styleType === 'bordergray'
      ? 'not-allowed'
      : 'pointer'};

  &:hover,
  &:focus {
    background-color: ${({ styleType, theme }) =>
      ({
        light: '#BBD3FF',
        middle: theme.color.dark,
        gray: theme.color.gray_ec,
        border: theme.color.light,
        bordergray: theme.color.white,
      })[styleType]};

    color: ${({ styleType, theme }) =>
      ({
        light: theme.color.dark,
        middle: theme.color.white,
        gray: theme.color.gray_83,
        border: theme.color.dark,
        bordergray: theme.color.gray_99,
      })[styleType]};
    border: ${({ styleType, theme }) =>
      ({
        light: 'none',
        middle: 'none',
        gray: 'none',
        border: `1px solid ${theme.color.dark}`,
        bordergray: `1px solid ${theme.color.gray_99}`,
      })[styleType]};
  }
`;
