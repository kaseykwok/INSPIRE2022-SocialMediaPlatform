import http from "../http-common";
class BlogsDataService {
  getAllBlogsByUserId(id) {
    return http.get(`/blogs/user/${id}`);
  }

  create(data) {
    return http.post("/blogs", data);
  }
}
export default new BlogsDataService();