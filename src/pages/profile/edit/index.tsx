import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Layout from '@/components/common/Layout';
import NicknameInput from '@/components/register/NicknameInput';
import IRegisterState from '@/types/register';
import JobTitleInput from '@/components/register/JobTitleInput';
import PrivacyInput from '@/components/register/PrivacyInput';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import { editMemberApi, getEditProfileApi } from '@/lib/axios/profile/api';

export default function ProfileEdit() {
  const router = useRouter();
  const [editProfile, setEditProfile] = useState<IRegisterState>({
    birthYear: '',
    gender: null,
    nickname: '',
    jobTitle: '',
  });

  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getEditProfileApi();
        setEditProfile(response.data);
      } catch (error) {
        console.error('프로필 정보를 불러오는데 실패했습니다.', error);
      }
    };
    fetchProfile().catch((error) => console.error(error));
  }, []);

  const editProfileInfo = async () => {
    try {
      await editMemberApi(editProfile);
      router
        .push({
          pathname: '/profile',
          query: {
            profileEdit: true,
          },
        })
        .catch((error) => {
          console.error('프로필 수정 후 페이지 이동 실패', error);
        });
    } catch (error) {
      console.error('프로필 수정 실패', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editProfileInfo().catch((error) => console.error(error));
  };

  const updateProfileData = (newProfile: Partial<IRegisterState>) => {
    setEditProfile({ ...editProfile, ...newProfile });
  };

  return (
    <Layout
      noFooter
      withBottomFixedBtn
      headerText="프로필 수정"
      title="프로필 수정"
      description="회원의 닉네임, 직군, 출생연도, 성별 등 개인 정보를 수정할 수 있는 페이지입니다."
    >
      <SProfileEditWrapper>
        <h2 className="a11yHidden">프로필 수정</h2>
        <form onSubmit={handleSubmit}>
          <h3>닉네임을 입력해주세요.</h3>
          <NicknameInput
            value={editProfile.nickname}
            updateData={updateProfileData}
            setIsNicknameValid={setIsNicknameValid}
            isNicknameValid={isNicknameValid}
          />
          <h3>해당하는 직군을 선택해주세요.</h3>
          <JobTitleInput
            value={editProfile.jobTitle}
            jobTitle={editProfile.jobTitle}
            updateData={updateProfileData}
          />
          <h3>회원님의 정보를 입력해주세요.</h3>
          <PrivacyInput
            birthYear={editProfile.birthYear}
            gender={editProfile.gender}
            updateData={updateProfileData}
          />
          <BottomFixedBtn
            btns={[
              {
                text: '수정하기',
                styleType: !isNicknameValid ? 'disabled' : 'primary',
                size: 'large',
                type: 'submit',
              },
            ]}
          />
        </form>
      </SProfileEditWrapper>
    </Layout>
  );
}

const SProfileEditWrapper = styled.div`
  & h3 {
    margin: 0 1.25rem 0.5rem 1.25rem;
    line-height: 1.4;
    height: 28px;
    font-size: ${({ theme }) => theme.fontSize.headline2};
    font-weight: ${({ theme }) => theme.fontWeight.headline2};
  }

  & h3:first-of-type {
    margin-top: 1.5rem;
  }

  & h3:nth-of-type(2) {
    margin-top: 1rem;
  }

  & h3:last-of-type {
    margin-top: 2.5rem;
  }
`;
