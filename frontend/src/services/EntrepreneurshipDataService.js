import http from "../http-common";
class EntrepreneurshipDataService {
  create(data) {
    return http.post("/entrepreneurship", data);
  }

  getAll() {
    return http.get(`/entrepreneurship`);
  }
}
export default new EntrepreneurshipDataService();