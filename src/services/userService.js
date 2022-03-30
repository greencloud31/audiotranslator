import http from "./httpService";

const authApiEndpoint = "/auth/users/";
const updateApiEndpoint = "/auth/update/";

export function register(user) {
  return http.post(authApiEndpoint, {
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    password: user.password,
  });
}

export function updateUser(id, first_name, last_name, password) {
  return http.put(updateApiEndpoint, {
    id,
    first_name,
    last_name,
    password,
  });
}
