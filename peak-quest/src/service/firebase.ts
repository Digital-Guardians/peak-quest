import { userData } from "./../types/type";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { changeKorean } from "../helper/changeAreaName";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
// const analytics = getAnalytics(app);

//유저관련
export async function userLogin() {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;

    const dataSnapshot = await get(ref(database, "userTest"));
    const data = dataSnapshot.val();

    const foundObject = Object.keys(data).find((uid) => uid === user.uid);

    if (foundObject) {
      console.log("이미 가입한 유저입니다.");
      // API 동작 멈추기
    } else {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      const badges = {
        gold: { hasBadge: "N" },
        silver: { hasBadge: "N" },
        bronze: { hasBadge: "N" },
        allClear: { hasBadge: "N" },
        start: { hasBadge: "N" },
        firstWish: { hasBadge: "N" },
        firstRecommand: { hasBadge: "N" },
        firstShare: { hasBadge: "N" },
        bestInformation: { hasBadge: "N" },
        bestShare: { hasBadge: "N" },
        bestRecommand: { hasBadge: "N" },
        peakQuestMaster: { hasBadge: "N" },
      };

      const newUserData = {
        uid: user.uid,
        img_url: user.photoURL,
        email: user.email,
        name: user.displayName,
        nick_name: user.displayName,
        registration_date: formattedDate,
        ban: {
          ban_content: "",
          ban_end_date: "",
          ban_state_date: "",
          ban_type: "",
        },
        delete: { delete_content: "", delete_State: "N", delete_at: "" },
        badges,
        role: "user",
        state: "user",
        post: 0,
      };
      console.log("추가합니다");

      await set(ref(database, "userTest/" + user.uid), newUserData);
    }
  } catch (error) {
    console.error("로그인 또는 데이터베이스 작업에 실패했습니다.", error);
  }
}

export function userLogOut() {
  console.log("logOut");
  signOut(auth);
}

export function onUserStateChanged(callback: any) {
  onAuthStateChanged(auth, (user: any) => {
    const updatedUser = user ? user : null;
    // console.log(updatedUser);
    callback(updatedUser);
  });
}

//mypage 뱃지 리스트
export async function getBagdes(uid: string) {
  const res = await get(ref(database, "userTest"));
  const data = res.val();
  const newData = Object.entries(data[uid].badges).map(([key, value]) => ({
    [key]: value,
  }));
  return newData;
}

//어드민 관련
export function adminLogin() {
  signInWithPopup(auth, provider) //
    .catch(console.error);
}
export function adminLogOut() {
  signOut(auth);
}

export function onAdminStateChanged(callback: any) {
  onAuthStateChanged(auth, async (user: any) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user: any) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

//이미지 등록
export async function addBannerImage(bannerData: any, imgUrl: any) {
  return get(ref(database, "bannerItem")).then((res) => {
    const data = res.val();
    if (!data) {
      set(ref(database, "bannerItem"), "");
    }

    const id = Object.keys(data).length + 1;

    const newData = {
      ...bannerData,
      id: `banner-${id}`,
      url: imgUrl,
    };

    set(ref(database, `bannerItem/${bannerData.title}`), newData);
    return newData;
  });
}

export async function getBannerList() {
  const res = await get(ref(database, "banner"));
  return res.val();
}

export async function getBannerItemList() {
  const res = await get(ref(database, "bannerItem"));
  return res.val();
}

//게시글 작성
export async function addCourse(formData: any, img: any, user: any, uuid: any) {
  const res = await get(ref(database, "course"));
  const data = res.val();
  if (!data) {
    set(ref(database, "course"), "");
  }

  // const id = Object.keys(data).length + 1;
  const id = await get(ref(database, "post"));
  const newPost = id.val() + 1;

  const item = { ...formData };

  const newData = {
    ...item,
    previewImgUrl: img,
    id: newPost,
    uid: user.uid,
    views: 0,
    likes: 0,
    recommendations: 0,
    writer: user.displayName,
    area: item.selectedOption?.label,
  };

  set(ref(database, `course/${uuid}`), newData);
  set(ref(database, "post"), newPost);

  const userData = await get(ref(database, `userTest/${user.uid}`)).then(
    (res) => res.val()
  );
  //유저의 게시글 수
  const post = userData.post;
  const newUserData = {
    ...userData,
    post: post + 1,
  };
  set(ref(database, `userTest/${user.uid}`), newUserData);
  return newData;
}

// 최초 게시글 작성시 획득하는 뱃지
export async function getStartBadge(user: any) {
  const userData = await get(ref(database, `userTest/${user.uid}`)).then(
    (res) => res.val()
  );
  if (userData.post !== 1) {
    return false;
  } else if (userData.badges.start.hasBadge === "N") {
    console.log("뱃지획득");

    const badges = userData.badges;
    const newBadges = {
      ...badges,
      start: {
        hasBadge: "Y",
      },
    };

    const newUserData = {
      ...userData,
      badges: newBadges,
    };
    set(ref(database, `userTest/${user.uid}`), newUserData);
    return true;
  }
}

// 유저별 post 개수 확인하기 위한 Api

//코스 디테일
export async function getCourseDetail(id: any) {
  const res = await get(ref(database, "course"));
  const data = res.val();

  const detail = Object.entries(data).map(([key, value]) => {
    return { key, value };
  });

  const filterData: any = detail.filter((item: any) => item.value.id === id);
  // const detail = Object.values(data).filter((course: any) => course.id === id);

  const item: any = filterData[0].value;
  const view = item.views;

  const newData = {
    ...item,
    title: item.myCourseTitle,
    area: item.selectedOption?.label,
    thumbnail: item.previewImgUrl,
    recommendations: item.recommendations,
    position: {
      lat: item.lists[0].position.lat,
      lng: item.lists[0].position.lng,
    },
  };

  const updateData = {
    ...item,
    views: view + 1,
  };

  // const viewItem = dataFilter[0];

  const key = filterData[0].key;

  set(ref(database, `course/${key}`), updateData);
  return newData;
}

//좋아요
export async function courseLikes(id: any) {
  const res = await get(ref(database, "course"));
  const data = res.val();

  const detail = Object.entries(data).map(([key, value]) => {
    return { key, value };
  });

  const filterData: any = detail.filter((item: any) => item.value.id === id);

  const item: any = filterData[0].value;
  const likes = item.likes;

  const updateData = {
    ...item,
    likes: likes + 1,
  };

  const key = filterData[0].key;

  set(ref(database, `course/${key}`), updateData);
}

// 내 코스 보기(마이페이지용)

export async function getMyCourse(user: any) {
  const res = await get(ref(database, "course"));
  const data = res.val();
  // const myCourse = Object.values(data).filter(
  //   (course: any) => course.uid === "XyTgG5IsxfXMMrl1u3FdIIivoe22"
  // );
  const myCourse = Object.values(data).filter(
    (course: any) => course.uid === user.uid
  );

  const newArray: any = [];

  myCourse.map((item: any) => {
    const newData = {
      id: item.id,
      title: item.myCourseTitle,
      writer: user.displayName,
      thumbnail: item.previewImgUrl,
      views: item.views,
      recommendations: item.recommendations,
      area: item.selectedOption?.label,
      position: {
        lat: item.lists[0].position.lat,
        lng: item.lists[0].position.lng,
      },
    };
    newArray.push(newData);
  });

  return newArray;
}

//지역별 코스 가져오기
export async function getAreaCourseList(area: any) {
  const res = await get(ref(database, "course"));
  const data = res.val();

  const myCourse = Object.values(data).filter(
    (course: any) => course.area === changeKorean(area)
  );

  const items: any = myCourse.map((item: any) => {
    const newData = {
      ...item,
      id: item.id,
      title: item.myCourseTitle,
      thumbnail: item.previewImgUrl,
      views: item.views,
      recommendations: item.recommendations,
      area: item.selectedOption?.label,
      option: item.checkedItems,
    };
    return newData;
  });

  // console.log(items);

  return items;
}

// 전체코스 불러오기
export async function getCourseList() {
  const res = await get(ref(database, "course"));
  const data = res.val();

  const myCourse = Object.values(data);

  const items: any = myCourse
    .filter((item: any) => item.lists && item.lists[0]?.position)
    .map((item: any) => {
      const newData = {
        ...item,
        id: item.id,
        title: item.myCourseTitle,
        thumbnail: item.previewImgUrl,
        views: item.views,
        recommendations: item.recommendations,
        area: item.selectedOption?.label,
        option: item.checkedItems,
        position: {
          lat: item.lists[0].position.lat,
          lng: item.lists[0].position.lng,
        },
      };
      return newData;
    });

  return items;
}

// export function getBannerList() {
//   return get(ref(database, "banner")).then((res) => res.val());
// }

// export function getBannerItemList() {
//   return get(ref(database, "bannerItem")).then((res) => res.val());
// }

export function addBanner(bannerList: any) {
  get(ref(database, "bannerItem")).then((res) => {
    const data = res.val();
    if (!data) {
      set(ref(database, "bannerItem"), "");
    } else {
      set(ref(database, "banner"), { ...bannerList });
    }
  });
}

export function deleteBanner(id: string) {
  return get(ref(database, "bannerItem")).then((res) => {
    const data = Object.values(res.val());
    const newData = data.filter((user: any) => user.id !== id);
    set(ref(database, "bannerItem"), newData);
    return newData;
  });
}

export function itemDelete(url: string) {
  return get(ref(database, "banner")).then((res) => {
    const data = Object.values(res.val());
    const newData = data.filter((item: any) => item.url !== url);
    set(ref(database, "banner"), newData);
    return newData;
  });
}

//report
export function getReportStateAll() {
  return get(ref(database, "report")).then((res) => {
    const data = res.val();
    return Object.values(data);
  });
}

export function getReportStateTrue() {
  return get(ref(database, "report")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter((user: any) => user.state === true);
    });
}
export function getReportStateFalse() {
  return get(ref(database, "report")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter((user: any) => user.state === false);
    });
}

export function searchReportUser(userName: string): any {
  get(ref(database, "report")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter((user: any) =>
        user.name.includes(userName)
      );
    });
}

export function reportChecked(userName: string): any {
  get(ref(database, "report")).then((res) => {
    const data = res.val();
    Object.values(data).forEach((user: any) => {
      if (user.name === userName) {
        user.state = true;
        alert("변경되었습니다.");
      }
    });
    set(ref(database, "report"), data); // 변경된 데이터를 데이터베이스에 적용합니다.
    return data;
  });
}

export function reportDelete(id: number) {
  return get(ref(database, "report")).then((res) => {
    const data = res.val();
    const newData = Object.values(data).filter((user: any) => user.id !== id);

    const message = confirm("해당 신고내용을 삭제하시겠습니까?");
    if (message) {
      set(ref(database, "report"), newData); // 변경된 데이터를 데이터베이스에 적용합니다.
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }

    return newData;
  });
}

//회원관리
//전체 유저 리스트
export function getUserListAll() {
  return get(ref(database, "users")).then((res) => {
    const data = res.val();
    return Object.values(data);
  });
}

//일반 유저 리스트 (탈퇴x)
export function getUserList() {
  return get(ref(database, "users")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter(
        (user: any) => user.state === "user" && user.delete.delete_state === "N"
      );
    });
}

//정지 유저 (ban)
export function getSuspendedUser() {
  return get(ref(database, "users")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter((user: any) => user.state === "ban");
    });
}
//탈퇴 유저
export function getDeleteUser() {
  return get(ref(database, "users")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter(
        (user: any) => user.delete.delete_state === "N"
      );
    });
}

export function searchUser(userName: string) {
  return get(ref(database, "users")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter((user: any) =>
        user.name.includes(userName)
      );
    });
}

//회원 정지
export function userSuspend(
  userName: string,
  banType: string,
  content: string,
  startDate?: string,
  endDate?: string
) {
  return get(ref(database, "users")) //
    .then((res) => {
      const data = res.val();
      const newData = Object.values(data) as userData[];
      newData.forEach((user: any) => {
        if (user.name === userName) {
          user.state = "ban";
          user.ban.ban_type = banType;
          user.ban.ban_content = content;
          if (
            banType === "temporary" &&
            startDate !== undefined &&
            endDate !== undefined
          ) {
            user.ban.ban_start_date = startDate;
            user.ban.ban_end_date = endDate;
          } else if (banType === "permanent") {
            const currentDate = new Date();

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, "0");
            const day = String(currentDate.getDate()).padStart(2, "0");

            const formattedDate = `${year}-${month}-${day}`;
            user.ban.ban_start_date = formattedDate;
            user.ban.ban_end_date = "";
          }
          alert("변경되었습니다.");
        }
      });
      set(ref(database, "users"), newData);
      return newData;
    });
}

//회원 정지 취소
export function userUnsuspend(userName: string) {
  return get(ref(database, "users")) //
    .then((res) => {
      const data = res.val();
      const newData = Object.values(data) as userData[];
      newData.forEach((user: any) => {
        if (user.name === userName) {
          if (user.state !== "ban") {
            alert("정지 상태의 유저가 아닙니다.");
            return;
          } else {
            user.state = "user";
            user.ban.ban_content = "";
            user.ban.ban_start_date = "";
            user.ban.ban_end_date = "";
            user.ban.ban_type = "";
            alert("변경되었습니다.");
          }
        }
      });
      set(ref(database, "users"), newData);
      return newData;
    });
}

//=================

//banner

export async function getMainBanner() {
  const bannerList: any = Object.values(await getBannerList());
  const bannerItemList: any = Object.values(await getBannerItemList());

  const bannerArr: { [key: number]: any } = {};
  const bannerItemArr: { [key: number]: any } = {};

  for (const item of bannerList) {
    bannerArr[item.id] = item;
  }

  for (const item of bannerItemList) {
    bannerItemArr[item.id] = item;
  }

  const newData = [];
  for (const id in bannerArr) {
    if (bannerItemArr[id]) {
      const combined = {
        ...bannerItemArr[id],
      };
      newData.push(combined);
    }
  }

  // console.log(newData);

  return newData;
}
