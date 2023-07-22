import { isAfter } from "date-fns";

export const IsLoggedIn = () => {
  const Profile =
    typeof window !== "undefined"
      ? localStorage?.getItem("yookatale-app")
        ? JSON.parse(localStorage?.getItem("yookatale-app"))
        : null
      : {};

  // check if token exists
  if (Profile) return;

  if (typeof window !== "undefined") {
    window.location.assign("/");
  }
};

export const IsAccountValid = () => {
  const Profile =
    typeof window !== "undefined"
      ? localStorage?.getItem("yookatale-app")
        ? JSON.parse(localStorage?.getItem("yookatale-app"))
        : null
      : {};

  // check if token exists and is valid
  if (Profile) {
    if (!isAfter(new Date(Profile?.expires), new Date())) {
      if (typeof window !== "undefined") {
        localStorage.setItem("yookatale-app", "");
      }
    }
  }
};
