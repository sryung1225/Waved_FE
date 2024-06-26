import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Image from 'next/image';
import { AxiosError } from 'axios';
import { IVerificationInfo } from '@/types/verification';
import {
  deleteLikeApi,
  getLikeCountApi,
  postLikeApi,
} from '@/lib/axios/verification/collection/api';
import useSnackBar from '@/hooks/useSnackBar';

interface IVerificationItem extends IVerificationInfo {
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  isMine: boolean;
}

export default function VerificationItem({
  verificationId,
  isMine,
  nickname,
  content,
  liked,
  likesCount,
  link,
  selectedId,
  setSelectedId,
}: IVerificationItem) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likeCountNum, setLikeCountNum] = useState<number>(likesCount);
  const isSelected = selectedId === verificationId;
  const { openSnackBar } = useSnackBar();

  const toggleLike = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (isLiked) {
      deleteLikeApi(verificationId)
        .then(() => {
          setIsLiked(false);
          getLikeCountApi(verificationId)
            .then((data) => {
              setLikeCountNum(data.likedCount);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          const err = error as AxiosError;
          const status = err.response?.status;
          const statusText = err.response?.statusText;
          if (status === 404 && statusText === 'Not Found') {
            openSnackBar('해당 인증 내역에 좋아요를 누르지 않았습니다.');
          }
        });
    } else {
      postLikeApi(verificationId)
        .then(() => {
          setIsLiked(true);
          getLikeCountApi(verificationId)
            .then((data) => {
              setLikeCountNum(data.likedCount);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          const err = error as AxiosError;
          const status = err.response?.status;
          const statusText = err.response?.statusText;
          if (status === 403 && statusText === 'Forbidden') {
            openSnackBar('이미 좋아요를 누른 인증 내역 입니다.');
          }
        });
    }
  };

  const toggleContent = () => {
    if (isSelected) {
      setSelectedId(0);
    } else {
      setSelectedId(verificationId);
    }
  };

  const clickLink = (event: React.MouseEvent<HTMLElement>) =>
    event.stopPropagation();

  useEffect(() => {
    setIsLiked(liked);
    setLikeCountNum(likesCount);
  }, [liked, likesCount]);

  return (
    <SWrapper isSelected={isSelected} onClick={toggleContent}>
      {isMine && <SMineLabel>내 인증</SMineLabel>}
      <SAuthor>{nickname}</SAuthor>
      {link && (
        <SLinkWrapper>
          <Image
            src="/icons/icon-link.svg"
            alt="인증링크 아이콘"
            width={20}
            height={20}
          />
          <SLink href={link} target="_blank" onClick={clickLink}>
            {link}
          </SLink>
        </SLinkWrapper>
      )}
      <SContent isSelected={isSelected}>{content}</SContent>
      <SLikeWrapper>
        <SLikeBtn
          type="button"
          aria-label="좋아요 버튼"
          onClick={toggleLike}
          isLiked={isLiked}
        />
        <SLikeCount>{likeCountNum}</SLikeCount>
      </SLikeWrapper>
    </SWrapper>
  );
}

const SWrapper = styled.li<{ isSelected: boolean }>`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray_ec};
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
  background-color: ${({ theme, isSelected }) =>
    isSelected && theme.color.gray_ec};
  transition: 0.2s ease-in;
`;

const SAuthor = styled.h3`
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  line-height: 1.5625rem;
  margin-bottom: 0.5rem;
`;

const SLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const SLink = styled.a`
  display: block;
  color: ${({ theme }) => theme.color.middle};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ellipsisStyle = css`
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const SContent = styled.p<{ isSelected: boolean }>`
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.gray_52 : theme.color.gray_83};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  margin-bottom: 1rem;
  line-height: 1.7;
  transition: 0.2s ease-in;
  white-space: pre-wrap;
  ${({ isSelected }) => isSelected || ellipsisStyle}
`;

export const SLikeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// prettier-ignore
export const SLikeBtn = styled.button<{ isLiked: boolean }>`
  width: 24px;
  height: 24px;
  background-image: url(${({ isLiked }) => isLiked ? '/icons/icon-heart-black-filled.svg' : '/icons/icon-heart-black.svg'});
  background-position: center;
  background-repeat: no-repeat;
  margin-right: .25rem;
`;

export const SLikeCount = styled.span`
  color: ${({ theme }) => theme.color.gray_52};
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
`;

export const SMineLabel = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.5rem;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.gray_52};
`;
