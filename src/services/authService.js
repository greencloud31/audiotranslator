import http from "./httpService";

const apiEndpoint = "/auth/jwt/create/";
const tokenKey = "greencloud_token";

async function login(email, password) {
  const { data } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, data.access);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export default {
  login,
  logout,
  loginWithJwt,
  getJwt,
};
