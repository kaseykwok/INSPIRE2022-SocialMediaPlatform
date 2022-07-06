import http from "../http-common";
class EntrepreneurshipDataService {
  create(data) {
    return http.post("/entrepreneurship", data);
  }

  getAll() {
    return http.get(`/entrepreneurship`);
  }

  getEntrepreneurById(id){
    return http.get(`/entrepreneurship/get/${id}`)
  }

  searchEntrepreneurshipsByKeyword(keyword) {
    return http.get(`/entrepreneurship/search/${keyword}`);
  }
}
export default new EntrepreneurshipDataService();