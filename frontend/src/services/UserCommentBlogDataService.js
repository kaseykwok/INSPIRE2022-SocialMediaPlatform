import http from "../http-common";
class UserCommentBlogDataService {
    comment(data) {
        return http.post("/userCommentBlog", data);
    }

    getAllCommentsByBlogId(blogId) {
        return http.get(`/userCommentBlog/getComments/${blogId}`);
    }

    getCommentCount(blogId) {
        return http.get(`/userCommentBlog/getCommentCount/${blogId}`);
    }

    deleteComment(id) {
        return http.delete(`/userCommentBlog/${id}`);
    }
}
export default new UserCommentBlogDataService();