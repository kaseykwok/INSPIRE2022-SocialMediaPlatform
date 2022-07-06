import http from "../http-common";
class UserFollowDataService {
    follow(data) {
        return http.post("/userFollow", data);
    }

    getFollowStatus(userId, followUserId) {
        return http.get(`/userFollow/${userId}/${followUserId}`);
    }

    unfollow(userId, followUserId) {
        return http.delete(`/userFollow/${userId}/${followUserId}`);
    }
}
export default new UserFollowDataService();