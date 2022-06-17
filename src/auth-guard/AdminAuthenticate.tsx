/* eslint-disable */

export default function isAuthenticatedAdmin() {
  const hasToken: boolean = localStorage.getItem("token") != null;
  const userType: string | null = localStorage.getItem("user_type");
  const isAuthenticated: boolean = hasToken && userType === "ADMIN";
  console.log("admin is authenticated : ", isAuthenticated);
  return isAuthenticated;
}
