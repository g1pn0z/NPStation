from .base import BaseTestCase
from django.utils.encoding import force_text


class APIAuthTestCase(BaseTestCase):

    def setUp(self):
        super().setUp()
        self.login_url = "{}login/".format(self.api_base_url)

    def test_get_api_key_by_login_and_password(self):
        response = self.api_client.post(self.login_url, format='json', data={
            'username': self.USER_NAME,
            'password': self.PASSWORD
        })
        self.assertValidJSONResponse(response)

        received_key = self.deserialize(response)['token']
        self.assertEqual(received_key, self.api_key)

    def test_wrong_login_and_password(self):
        response = self.api_client.post(self.login_url, format='json', data={
            'username': self.USER_NAME * 2,
            'password': self.PASSWORD * 2
        })

        self.assertIn(response.status_code, [400, 401, 403])
        self.assertValidJSON(force_text(response.content))
        self.assertTrue('token' not in self.deserialize(response))
        self.assertTrue('error' in self.deserialize(response))
