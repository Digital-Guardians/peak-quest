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

export function searchUser(userName: string) {
  return get(ref(database, "report")) //
    .then((res) => {
      const data = res.val();
      return Object.values(data).filter((user) => user.name.includes(userName));
    });
}
