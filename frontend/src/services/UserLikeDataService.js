import http from "../http-common";
class UserLikeDataService {
    like(data) {
        return http.post("/userLike", data);
    }

    getLikeStatus(userId, blogId) {
        return http.get(`/userLike/${userId}/${blogId}`);
    }

    getLikeCount(blogId) {
        return http.get(`/userLike/get/likeCount/${blogId}`);
    }

    unlike(userId, blogId) {
        return http.delete(`/userLike/${userId}/${blogId}`);
    }
}
export default new UserLikeDataService();