import axios from 'axios';
import { setAccessTokenCookie } from '../../util/TokenUtils';

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_NO_CONTENT = 204;

const DIRECTION_ASC = 'asc';

const DEFAULT_SIZE = 10;
const DEFAULT_SORTED_BY = 'id';
const DEFAULT_DIRECTION = 'desc';
const DEFAULT_URL = 'https://back.capzzang.co.kr';

export const loginUser = (email, password, handleReset) => {
  axios
    .post(DEFAULT_URL + '/login', {
      email,
      password,
    })
    .then(async (response) => {
      const tokenResponse = await response.data;
      setAccessTokenCookie(tokenResponse.accessToken);
      alert('로그인되었습니다.');
      document.location.href = '/home';
    })
    .catch((error) => {
      alert('로그인에 실패하였습니다.');
      handleReset();
    });
};

export const savePostImages = async (formData, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    return await axios.post(DEFAULT_URL + '/posts/images', formData, config).then((response) => {
      if (response.status === HTTP_STATUS_CREATED) {
        console.log('이미지 전송에 성공했습니다!');
        return response;
      }
    });
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
    console.log(error);
  }
};

export const createPost = async (postData, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.post(DEFAULT_URL + '/posts', postData, config);
    if (response.status === HTTP_STATUS_CREATED) {
      alert('전송에 성공했습니다!');
      document.location.href = response.headers.location;
    }
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
    console.log(error);
  }
};

export const updatePost = async (postId, postUpdateData, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.put(DEFAULT_URL + `/posts/${postId}`, postUpdateData, config);
    if (response.status === HTTP_STATUS_OK) {
      alert('수정에 성공했습니다!');
      document.location.href = `/posts/${postId}`;
    }
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
    console.log(error);
  }
};

export const createUser = (email, nickname, password, authNumber, handleReset) => {
  axios
    .post(DEFAULT_URL + '/join', {
      email,
      nickname,
      password,
      authNumber,
    })
    .then((response) => {
      alert('회원가입을 축하드립니다.');
      document.location.href = '/login';
    })
    .catch((error) => {
      alert('회원가입에 실패하였습니다.');
      console.log(error);
      handleReset();
    });
};

export const checkJoined = (email) => {
  axios
    .get(DEFAULT_URL + `/check-joined?email=${email}`)
    .then((response) => {
      alert('사용 가능한 이메일입니다.');
    })
    .catch((error) => {
      const errorResponse = error.response.data;
      alert(errorResponse.errorMessage);
      console.log(error);
    });
};

export const sendAuthMail = (email, setIsEmailDisabled, setMailAuthToggle, setIsMailSent) => {
  axios
    .post(DEFAULT_URL + '/mail-auth/send', {
      email,
    })
    .then((response) => {
      alert('인증 메일을 전송했습니다.');
      setIsEmailDisabled(true);
      setMailAuthToggle('인증 번호 확인');
      setIsMailSent(true);
    })
    .catch((error) => {
      alert('인증 메일 발송 실패하였습니다.');
      console.log(error);
    });
};

export const checkAuthNumber = (email, authNumber, setIsAuthNumberDisabled) => {
  axios
    .post(DEFAULT_URL + '/mail-auth/check', {
      email,
      authNumber,
    })
    .then((response) => {
      alert('인증되었습니다.');
      setIsAuthNumberDisabled(true);
    })
    .catch((error) => {
      alert('인증번호를 확인해주세요.');
      console.log(error);
    });
};
export const saveProfilePhoto = async (formData, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.post(DEFAULT_URL + '/users/images', formData, config);
    if (response.status === HTTP_STATUS_CREATED) {
      alert('전송에 성공했습니다!');
      return response.data;
    }
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
    console.log(error);
  }
};

export const updateUser = async (nickname, imageId, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    await axios.put(
      DEFAULT_URL + '/users/me',
      {
        nickname,
        imageId,
      },
      config,
    );
    alert('내 정보가 성공적으로 바뀌었습니다!');
    document.location.href = '/users/me';
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
    alert(error.response ? error.response.status : error.request);
    console.log(error);
  }
};

export const createComment = async (postId, writing, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.post(DEFAULT_URL + `/posts/${postId}/comments`, { writing }, config);
    if (response.status === HTTP_STATUS_CREATED) {
      alert('댓글이 성공적으로 전송되었습니다!');
      return true;
    }
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
    alert('댓글이 작성되지 않았습니다! 다시 작성해주세요!');
    console.log(error);
  }
  return false;
};

export const createPendingSector = async (sector, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.post(DEFAULT_URL + `/sectors`, sector, config);
    if (response.status === HTTP_STATUS_CREATED) {
      alert('신청이 완료됐습니다! 신청한 부문은 프로필에서 확인하실 수 있습니다!');
      return response.data;
    }
  } catch (error) {
    alert('부문 신청 중 오류가 발생했습니다! 다시 신청해주세요!');
    console.log(error);
  }
};

export const pressPostZzang = async (postId, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.post(DEFAULT_URL + `/posts/${postId}/zzangs`, {}, config);
    if (response.status === HTTP_STATUS_NO_CONTENT) {
      return true;
    }
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
    alert('짱이 눌러지지 않았습니다! 다시 작성해주세요!');
    console.log(error);
  }
  return false;
};

export const findMyInfo = (accessToken) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  return axios
    .get(DEFAULT_URL + '/users/me', config)
    .then(async (response) => {
      const userResponse = await response.data;
      console.log(userResponse);
      return userResponse;
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      alert(`회원정보를 가져올 수 없습니다.${error}`);
    });
};

export const findCurrentPostsFromPage = async (mainAreaId, page, sectorId, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(
      DEFAULT_URL +
        `/posts?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DEFAULT_DIRECTION}&` +
        `areaId=${mainAreaId}&` +
        `sectorIds=${sectorId}`,
      config,
    )
    .then((response) => response.data.content)
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      console.log(`## 최근 글을 가져올 수 없습니다.`);
    });
};

export const findMyPostsFromPage = async (mainAreaId, page, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(
      DEFAULT_URL +
        `/posts/me?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DEFAULT_DIRECTION}&` +
        `areaId=${mainAreaId}&` +
        `sectorIds=`,
      config,
    )
    .then((response) => response.data.content)
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      console.log(`## 내 글을 가져올 수 없습니다.`);
    });
};

export const findRankedPostsFromPage = async (mainAreaId, criteria, page, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(
      DEFAULT_URL +
        `/ranking?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DEFAULT_DIRECTION}&` +
        `criteria=${criteria}&` +
        `areaId=${mainAreaId}&` +
        `sectorIds=`,
      config,
    )
    .then((response) => response.data.content)
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      console.log(`## 랭킹을 가져올 수 없습니다.`);
    });
};

export const findAreasFromPage = async (page, accessToken, keyword) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(
      DEFAULT_URL +
        `/areas?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DIRECTION_ASC}&` +
        `keyword=${keyword}`,
      config,
    )
    .then((response) => {
      return response.data.content;
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      throw error.response;
    });
};

export const findAllSimpleSectors = async (accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  const response = await axios.get(DEFAULT_URL + `/sectors/simple`, config).catch((error) => {
    redirectLoginWhenUnauthorized(error);
    alert(`부문정보를 가져올 수 없습니다.${error}`);
  });
  return response.data;
};

export const findSectorsFromPage = async (page, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  const response = await axios
    .get(
      DEFAULT_URL +
        `/sectors?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DEFAULT_DIRECTION}`,
      config,
    )
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      alert(`부문정보를 가져올 수 없습니다.${error}`);
    });
  console.log(response.data.content);
  return response.data.content;
};

export const findAllMySector = async (accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(DEFAULT_URL + '/sectors/me', config)
    .then((response) => {
      if (response.status === HTTP_STATUS_OK) {
        return response.data.content;
      }
    })
    .catch((error) => {
      alert(`유저의 부문을 가져올 수 없습니다.${error}`);
    });
};

export const findPost = async (accessToken, postId) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(DEFAULT_URL + '/posts/' + postId, config)
    .then((response) => {
      if (response.status === HTTP_STATUS_OK) {
        return response.data;
      }
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      alert(`자랑글을 가져올 수 없습니다.${error}`);
      document.location.href = '/home';
    });
};

export const findCommentsByPostId = async (accessToken, postId) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(DEFAULT_URL + `/posts/${postId}/comments`, config)
    .then((response) => {
      if (response.status === HTTP_STATUS_OK) {
        console.log('findCommentsByPostId : ' + response.data);
        return response.data;
      }
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      alert(`해당 글의 댓글을 가져올 수 없습니다.${error}`);
    });
};

export const findOthersProfileById = async ({ accessToken, userId }) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  return axios
    .get(DEFAULT_URL + '/users/' + userId, config)
    .then(async (response) => {
      const userResponse = await response.data;
      console.log(userResponse);
      return userResponse;
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      alert(`회원정보를 가져올 수 없습니다.${error}`);
    });
};

const redirectLoginWhenUnauthorized = (error) => {
  if (error.response && error.response.status === 403) {
    document.location.href = '/login';
  }
};

export const getMyNotice = (accessToken, setNotices) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  axios
    .get(DEFAULT_URL + `/notifications/me`, config)
    .then((response) => {
      console.log(response.data);
      setNotices(response.data);
    })
    .catch((error) => {
      alert('알림을 불러오지 못했습니다.');
      console.log(error);
    });
};

export const getUnreadNoticeCount = (accessToken, setUnreadNotice) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  axios
    .get(DEFAULT_URL + `/notifications/me`, config)
    .then((response) => {
      const unreadCount = response.data.filter((x) => x.isRead === false).length;
      setUnreadNotice(unreadCount);
    })
    .catch((error) => {
      alert('알림을 불러오지 못했습니다.');
      console.log(error);
    });
};

export const readNotice = (accessToken, id) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  axios
    .put(DEFAULT_URL + `/notifications/${id}/read`, null, config)
    .then((response) => {})
    .catch((error) => {
      alert('알림을 읽음 처리하지 못했습니다.');
      console.log(error);
    });
};

export const findSector = async (accessToken, sectorId) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(DEFAULT_URL + '/sectors/' + sectorId, config)
    .then((response) => {
      if (response.status === HTTP_STATUS_OK) {
        return response.data;
      }
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      alert(`부문 상세정보를 가져올 수 없습니다.${error}`);
      document.location.href = '/home';
    });
};
