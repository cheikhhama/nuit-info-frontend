export const BASE_URL = "http://localhost:8000";
export const AUTH_ENDPOINTS = {
  LOGIN: "/api/login/",
  REGISTER: "/api/register/",
  REFRESH: "/api/token/refresh/",
};
export const QUIZ_ENDPOINTS = {
    GET_ALL: "/api/quizzes/",
    GET_ONE: (id) => `/api/quiz/${id}`,
}
export const Category_ENDPOINTS = {
    GET_ALL: "/api/categories-count/",
}

export const ORDERS_ENDPOINTS = {
  GET_ALL: "/orders/",
  GET_ONE: (id) => `/users/${id}`,
};

export const PRODUCT_ENDPOINTS = {
  GET_ALL: "/products/",
  GET_ONE: (id) => `/products/${id}`,
};

