import { AxiosInstance } from 'axios';
import IChallengeGroup from '@/types/challengeGroup';
import axiosInstance from '../instance';
import { IReviewList } from '@/types/review';

/**
 * 챌린지 그룹 정보 GET
 * @param groupId
 * @param token (optional)
 * @returns response.data
 */
const getChallengeGroupApi = (
  groupId: string,
  serverInstance: AxiosInstance,
) => {
  return serverInstance.get<IChallengeGroup>(
    `/challengeGroups/info/${groupId}`,
  );
};

/**
 * 리뷰 목록 조회 GET
 * @param challengeId
 * @returns response.data
 */
const getReviewsApi = (challengeId: number, serverInstance: AxiosInstance) => {
  return serverInstance.get<IReviewList>(
    `/challenges/${challengeId}/reviews?page=0&limit=5`,
  );
};

/**
 * 챌린지 신청 취소 DEL
 * @param challengeId
 * @returns response.data
 */
const deleteMyChallengeApi = (myChallengeId: number) => {
  return axiosInstance.delete(`/myChallenges/${myChallengeId}/delete`);
};

export { getChallengeGroupApi, getReviewsApi, deleteMyChallengeApi };
