import styled from '@emotion/styled';
import Layout from '@/components/common/Layout';
import DepositItem from '@/components/profile/DepositItem';

export default function MyDeposit() {
  const depositData = {
    challengeName: '기술면접 챌린지',
    challengeResult: '성공',
    challengeDate: '2023년 02월 27일',
    deposit: 5000,
  };
  return (
    <Layout
      noFooter
      headerText="예치금 내역"
      title="예치금 내역"
      description="챌린지 참여 시 결제한  내역과 환급받은 내역을 확인할 수 있는 페이지입니다."
    >
      <SMyDepositWrapper>
        <h2 className="a11yHidden">예치금 내역</h2>
        <DepositItem depositData={depositData} />
        <DepositItem depositData={depositData} />
      </SMyDepositWrapper>
    </Layout>
  );
}

const SMyDepositWrapper = styled.div``;
