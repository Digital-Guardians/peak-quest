import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import { getDatabase, ref, get, set } from "firebase/database";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

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

export function adminLogin() {
  signInWithPopup(auth, provider) //
    .catch(console.error);
}
export function adminLogOut() {
  signOut(auth);
}

export function onAdminStateChanged(callback: any) {
  onAuthStateChanged(auth, async (user) => {
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
  get(ref(database, "bannerItem")).then((res) => {
    const data = res.val();
    console.log(data);
    if (!data) {
      set(ref(database, "bannerItem"), "");
    }

    const id = Object.keys(data).length + 1;

    console.log(id);

    set(ref(database, `bannerItem/${bannerData.title}`), {
      ...bannerData,
      id: `banner-${id}`,
      url: imgUrl,
    });
  });
}

export function getBannerList() {
  return get(ref(database, "banner")).then((res) => res.val());
}

export function getBannerItemList() {
  return get(ref(database, "bannerItem")).then((res) => res.val());
}

export function addBanner(bannerList: any) {
  get(ref(database, "bannerItem")).then((res) => {
    const data = res.val();
    if (!data) {
      set(ref(database, "bannerItem"), "");
    } else {
      return set(ref(database, "banner"), { ...bannerList });
    }
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
      return Object.values(data).filter((user) => user.state === true);
    });
}
export function getReportStateFalse() {
  return get(ref(database, "report")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter((user) => user.state === false);
    });
}

export function searchReportUser(userName: string) {
  return get(ref(database, "report")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter((user) => user.name.includes(userName));
    });
}

export function reportChecked(userName: string) {
  return get(ref(database, "report")).then((res) => {
    const data = res.val();
    Object.values(data).forEach((user) => {
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
    const newData = Object.values(data).filter((user) => user.id !== id);
    console.log(newData);

    const message = confirm("해당 신고내용을 삭제하시겠습니까?");
    if (message) {
      set(ref(database, "report"), newData); // 변경된 데이터를 데이터베이스에 적용합니다.
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }

    console.log(newData);

    return newData;
  });
}

//회원관리
//전체 유저 리스트
export function getUserListAll() {
  return get(ref(database, "users")).then((res) => {
    const data = res.val();
    console.log(data);
    return Object.values(data);
  });
}

//일반 유저 리스트 (탈퇴x)
export function getUserList() {
  return get(ref(database, "users")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter(
        (user) => user.state === "user" && user.delete.delete_state === "N"
      );
    });
}

//정지 유저 (ban)
export function getSuspendedUser() {
  return get(ref(database, "users")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter((user) => user.state === "ban");
    });
}
//탈퇴 유저
export function getDeleteUser() {
  return get(ref(database, "users")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter((user) => user.delete.delete_state === "Y");
    });
}

export function searchUser(userName: string) {
  return get(ref(database, "users")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter((user) => user.name.includes(userName));
    });
}
