import api from '@lib/http';
import { useUserStore } from '@features/user';
import { useAuthStore } from '@features/auth/store';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function githubConnect(code, state, captchaToken) {
  /**
   * Establishes a connection between the user's account and GitHub OAuth.
   *
   * @param {string} code - The authorization code received from GitHub.
   * @param {string} state - The CSRF protection state string.
   * @param {string} captchaToken - The CAPTCHA verification token.
   * @returns {Promise<any>} A promise that resolves to the result of the API response handler.
   */
  export async function githubConnect(code, state, captchaToken) {
    const { updateUser } = useUserStore.getState();
    const result = await apiResponsesHandler(
      () => api.post('/auth/oauth/github/connect', { code, state }, {}),
      {
        onSuccess: (data) => {
          if (data.accessToken) {
            updateUser({ githubOAuthEnabled: data.githubOAuthEnabled });
          }
        },
      },
    );
    return result;
  }
