export const BASE_URL = "http://api.tm-code.online";
export const AUTH_ENDPOINTS = {
  LOGIN: "/api/login/",
  REGISTER: "/api/register/",
  REFRESH: "/api/token/refresh/",
};
export const QUIZ_ENDPOINTS = {
    GET_ALL: "/api/quizzes/",
    VERIFY_RESPONSE: "/api/verifierreponse/",
}
export const Category_ENDPOINTS = {
    GET_ALL: "/api/categories-count/",
}
export const LEADERBOARD_ENDPOINTS = {
    GET_ALL: "/api/leaderboard/",
}
export const INFORMATIONS_ENDPOINTS = {
  GET_ALL: "/api/informations/"
}

export const ORDERS_ENDPOINTS = {
  GET_ALL: "/orders/",
  GET_ONE: (id) => `/users/${id}`,
};

export const PRODUCT_ENDPOINTS = {
  GET_ALL: "/products/",
  GET_ONE: (id) => `/products/${id}`,
};

