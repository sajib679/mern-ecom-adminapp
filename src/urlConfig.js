export const api = "https://ecom-mern-rest-api.herokuapp.com/api";
export const imageUrl = (params) => {
  return `${api}/upload/${params}`;
};

// export const api = "http://localhost:2000/api";
// export const imageUrl = (params) => {
//   return `${api}/upload/${params}`;
// };
