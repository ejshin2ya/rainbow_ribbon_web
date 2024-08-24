import { atom } from "recoil";

//로그인 응답값 데이터
export const authState = atom({
  key: "authState",
  default: {
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
  },
});
