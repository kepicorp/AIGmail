import requests
import json

class get_payments_api: 
    def __init__(self,token,method,internationalPaymentId,payload,additional_headers={},params = None): 
        self.token = token 
        self.endpoint_type = method
        self.base_url = 'https://api.preprod.fusionfabric.cloud/payment/payment-initiation/v1/credit-transfer/international/'+internationalPaymentId+'/status'
        self.additional_headers = additional_headers
        self.params = params
    
    def connect_endpoint(self, payload):
        self.url = self.base_url 
        headers = {
            'Authorization': 'Bearer ' + self.token,
            'Content-Type' : 'application/json'
            }
        for key in self.additional_headers.keys():
            headers[key] = self.additional_headers[key]
        stringified_payload = json.dumps(payload)
        response = requests.request(self.endpoint_type, self.url, params=self.params, data=stringified_payload,headers=headers)
        return response