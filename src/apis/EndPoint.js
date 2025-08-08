export const BASE_URL = "http://localhost:3000";
export default {
  all_articles: BASE_URL + "/article/all",
  CATEGORY_LIST: BASE_URL + "/article/category",
  SIGN_UP: BASE_URL + "/user/signup",
  SIGN_IN: BASE_URL + "/user/login",
  CREATE_PROFILE: BASE_URL + "/user/profile",
  UPLOAD_ARTICLE: BASE_URL + "/article/",
  AUTHOR_ARTICLE: BASE_URL + "/article/author",
  DIALECT_LIST: BASE_URL + "/dialect/all",
  LANGUAGE_LIST: BASE_URL + "/language/all",
  SeeAllArticle: BASE_URL + "/admin/articles",
  SeeAllDialects: BASE_URL + "/admin/dialects",
  ADMIN_SIGN_IN: BASE_URL + "/admin/login",
  STATS: BASE_URL + "/admin/stats",
  ADMIN_ALL_ARTICLES: BASE_URL + "/admin/articles",
  ADMIN_ALL_DIALECTS: BASE_URL + "/admin/dialects",
  ADMIN_ALL_LANGUAGES: BASE_URL + "/admin/languages",
  DELETE_LANGUAGE: BASE_URL + "/admin/languages",
  ADD_LANGUAGE: BASE_URL + "/admin/languages",
  UPDATE_DIALECT_STATUS: BASE_URL + "/admin/update-dialects",
  UPDATE_ARTICLE_STATUS: BASE_URL + "/admin/update-articles",
  LOG_OUT:BASE_URL+"/user/logout"
};
