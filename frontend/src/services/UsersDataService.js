import http from "../http-common";
class UsersDataService {
  getUserDetails(id) {
    return http.get(`/users/${id}`);
  }

  async getUserByUsername(username) {
    return await http.get(`/users/username/${username}`)
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
}
export default new UsersDataService();