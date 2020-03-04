import requests
import pandas as pd

class authenticate:
    def __init__(self, config_file):
        self.df = pd.read_csv(config_file)
        self.client_id = self.df['application_id'].values[0]
        self.client_secret = self.df['access_key'].values[0]
        self.token_endpoint = self.df['token_endpoint'].values[0]
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