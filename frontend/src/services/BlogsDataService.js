import http from "../http-common";
class BlogsDataService {
  getAllBlogsByUserId(id) {
    return http.get(`/blogs/userid/${id}`);
  }

  getAllBlogsByUsername(username) {
    return http.get(`/blogs/username/${username}`);
  }

  getAllFeedBlogsByUserId(id) {
    return http.get(`/blogs/following/${id}`);
  }

  create(data) {
    return http.post("/blogs", data);
  }
}
export default new BlogsDataService();