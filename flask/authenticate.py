import requests
import os
from dotenv import load_dotenv
load_dotenv()

class authenticate:
    def __init__(self, config_file):
        self.client_id = os.getenv('CLIENT_ID')
        print('Got client_id: '+self.client_id)
        self.client_secret = os.getenv('CLIENT_SECRET')
        print('Got client_secret')
        self.token_endpoint = os.getenv('TOKEN')
        print('Got token endpoint')
        print('using config file: ' + str(config_file) + ' with endpoint ' + self.token_endpoint)

    def get_token(self):
        print('inside get token')
        headers = {
        }
        data = {
            'grant_type' : 'client_credentials',
            'client_id' : self.client_id,
            'client_secret' : self.client_secret
        }
        response = requests.request('POST', self.token_endpoint, data=data, headers=headers)
        print(response)
        print(response.text)
        cleaned_response = response.text.replace(':null', ':"null"')
        
        response_dict = eval(cleaned_response)
        token = response_dict['access_token']
        return response, token