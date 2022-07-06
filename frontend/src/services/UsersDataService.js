import http from "../http-common";
class UsersDataService {
  getUserDetails(id) {
    return http.get(`/users/${id}`);
  }

  getUserByUsername(username) {
    return http.get(`/users/username/${username}`)
  }

  searchAllUsersByKeyword(keyword) {
    return http.get(`/users/search/user/${keyword}`)
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
}
export default new UsersDataService();