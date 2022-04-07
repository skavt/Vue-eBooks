import httpService from "../../../core/services/httpService";
import {
  CHECK_RESET_PASSWORD_TOKEN_URL,
  LOGIN_URL,
  REGISTER_URL, RESET_PASSWORD_URL,
  SEND_RESET_PASSWORD_URL
} from "../../../core/urlConstants";
import authService from "../../../core/services/authService";

export default {
  namespaced: true,
  actions: {
    async login({commit, dispatch}, data) {
      const response = await httpService.post(LOGIN_URL, data)

      if (response.success) {
        authService.setToken(response.body.access_token)
      }

      return response
    },
    async register({commit}, data) {
      return await httpService.post(REGISTER_URL, data)
    },
    async resetPasswordRequest({commit}, data) {
      return await httpService.post(SEND_RESET_PASSWORD_URL, data)
    },
    async checkToken({commit}, token) {
      return await httpService.get(CHECK_RESET_PASSWORD_TOKEN_URL.replace('{token}', token))
    },
    async resetPassword({commit}, data) {
      return await httpService.post(RESET_PASSWORD_URL, data)
    }
  }
};
