import { getAccessTokenFromCookie } from '../../../util/TokenUtils'
import React, { useEffect, useState } from 'react'
import { findMyInfo, findPost } from '../../api/API'
import Loading from '../../Loading'
import PostDetailTopBar from '../post/PostDetailTopBar'
import { Container } from '@material-ui/core'
import PostDetail from '../post/PostDetail'
import BottomBlank from '../../BottomBlank'
import Bottom from '../../Bottom'

const SectorDetailPage = ({ match }) => {
  const sectorId = match.params.sectorId;
  const accessToken = getAccessTokenFromCookie();
  const [sector, secSector] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myInfo, setMyInfo] = useState(null);

  useEffect(() => {
    const loadMyInfo = async () => {
      setLoading(true);
      const foundMyInfo = await findMyInfo(accessToken);
      setMyInfo(foundMyInfo);
      setLoading(false);
    };

    const loadSector = async () => {
      setLoading(true);
      const sector = await findPost(accessToken, sectorId); //Todo: 여기를 바꿔야함
      console.log(sector);
      secSector(sector);
      setLoading(false);
    };
    loadMyInfo();
    loadSector();
  }, [accessToken, sectorId]);

  if (loading) return <Loading />;
  return (
    <>
      <PostDetailTopBar />
      <Container>
        {sector && <PostDetail post={sector} myInfo={myInfo} />}
        <BottomBlank />
      </Container>
      <Bottom />
    </>
  );
};

export default SectorDetailPage;
