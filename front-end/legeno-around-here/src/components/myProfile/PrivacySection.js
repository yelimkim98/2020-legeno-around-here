import styled from 'styled-components';

import { MAIN_COLOR } from '../../constants/Color';
import LinkWithoutStyle from '../../util/LinkWithoutStyle';

export const ProfilePhoto = styled.div`
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 300px;
  background-image: url(${(props) => props.photoUrl});
  border: 1px solid ${MAIN_COLOR};
`;

export const Nickname = styled.div`
  display: inline;
  font-size: 25px;
`;

export const Email = styled.div`
  display: inline;
  font-size: 15px;
`;

export const TopSection = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  margin: 20px auto;
`;

export const TopSectionWithoutPhoto = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PrivacyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  text-align: left;
`;

export const PrivacyEditBox = styled(LinkWithoutStyle)`
  margin: 0;
  margin-right: 7px;
  font-size: 15px;
  display: inline;
`;

export const PrivacySignOutBox = styled.span`
  margin: 0;
  margin-left: 7px;
  font-size: 15px;
  display: inline;
  color: #444444;
  cursor: pointer
`;

export const PrivacyRightEditLinks = styled.div`
  margin: 0px auto;
  font-size: 15px;
  display: block;
`;
