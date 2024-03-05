import styled from '@emotion/styled';
import YEARS from '@/constants/years';
import { IRegisterState } from '@/pages/register';

enum Gender {
  Male = 'male',
  Female = 'female',
}

export type GenderOrNull = Gender | null;

interface IPravacyInput {
  gender: GenderOrNull;
  updateRegisterData: (newData: Partial<IRegisterState>) => void;
}

export default function PrivacyInput({
  gender: currentGender,
  updateRegisterData,
}: IPravacyInput) {
  return (
    <SPrivacyInputWrapper>
      <SPrivacyText>챌린지 준비 첫 단계를 시작합니다!</SPrivacyText>
      <SBirthYearWrapper>
        <label htmlFor="birthYearInput">출생연도</label>
        <SBirthYearSelect
          name="birthYear"
          id="birthYearInput"
          onChange={(e) => updateRegisterData({ birthYear: e.target.value })}
        >
          <option value="">출생연도</option>
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </SBirthYearSelect>
      </SBirthYearWrapper>
      <SGenderWrapper>
        <SGenderText>성별(선택)</SGenderText>
        <SGenderBtnWrapper>
          <SFemaleBtn
            type="button"
            gender={currentGender}
            onClick={() => updateRegisterData({ gender: Gender.Female })}
          >
            여자
          </SFemaleBtn>
          <SMaleBtn
            type="button"
            gender={currentGender}
            onClick={() => updateRegisterData({ gender: Gender.Male })}
          >
            남자
          </SMaleBtn>
        </SGenderBtnWrapper>
      </SGenderWrapper>
    </SPrivacyInputWrapper>
  );
}

const SPrivacyInputWrapper = styled.div``;

const SPrivacyText = styled.p`
  height: 20px;
  position: relative;
  margin-bottom: 1.8125rem;
  margin-left: 1.25rem;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 95%;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_de};
  }
`;

const SGenderWrapper = styled.div`
  margin-left: 1.25rem;
`;

const SGenderText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_52};
  margin-bottom: 1rem;
`;

const SGenderBtnWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 20px;
  text-align: center;
  gap: 7px;
`;

const SFemaleBtn = styled.button<{ gender: GenderOrNull }>`
  width: 100%;
  height: 48px;
  font-size: ${({ theme }) => theme.fontSize.body4};
  color: ${({ theme, gender }) =>
    gender === Gender.Female ? theme.color.gray_3c : theme.color.gray_99};
  border: 1px solid
    ${({ theme, gender }) =>
      gender === Gender.Female ? theme.color.gray_3c : theme.color.gray_ec};
  border-radius: 8px;
`;
const SMaleBtn = styled.button<{ gender: GenderOrNull }>`
  width: 100%;
  height: 48px;
  font-size: ${({ theme }) => theme.fontSize.body4};
  color: ${({ theme, gender }) =>
    gender === Gender.Male ? theme.color.gray_3c : theme.color.gray_99};
  border: 1px solid
    ${({ theme, gender }) =>
      gender === Gender.Male ? theme.color.gray_3c : theme.color.gray_ec};
  border-radius: 8px;
`;

const SBirthYearWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-left: 1.25rem;
  margin-bottom: 1.5rem;

  & label {
    height: 20px;
    line-height: 1.4;
    color: ${({ theme }) => theme.color.gray_52};
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
    margin-bottom: 1rem;
  }

  & select::-ms-expand {
    display: none;
  }
`;

const SBirthYearSelect = styled.select`
  margin-right: 20px;
  height: 48px;
  background-color: ${({ theme }) => theme.color.gray_f9};
  border-radius: 8px;
  outline: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_52};
  padding-left: 16px;
  padding-right: 12px;

  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-repeat: no-repeat;
  background-image: url('/icons/icon-down-arrow.svg');
  background-position: right 5% bottom 50%;
`;
