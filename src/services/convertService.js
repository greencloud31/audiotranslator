import http from "./httpService";

const convertApiEndpoint = "/convert/";

export function convert(text, language) {
  return http.post(convertApiEndpoint, {
    text,
    language,
  });
}
