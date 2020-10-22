import requests
import json

class payments_api: 
    def __init__(self,token,method,additional_headers={},params = None): 
        self.token = token 
        self.endpoint_type = method
        self.base_url = 'https://api.fusionfabric.cloud/payment/payment-initiation/realtime-payments/v2/us-real-time-payment/tch-rtps/initiate'
        self.additional_headers = additional_headers
        self.params = params
        self.sample_post = {
  "sourceId": "Payment source system name",
  "initiatingParty": "LOCALOFFICEUS1",
  "paymentInformationId": "1545922187435",
  "requestedExecutionDate": "2018-12-06",
  "instructedAmount": {
    "amount": 100,
    "currency": "USD"
  },
  "paymentIdentification": {
    "endToEndId": "TESTINGPIERRE"
  },
  "debtor": {
    "name": "Dbtr Name"
  },
  "debtorAgent": {
    "identification": "020010001"
  },
  "debtorAccountId": {
    "identification": "745521145"
  },
  "creditor": {
    "name": "Cdtr Name"
  },
  "creditorAgent": {
    "identification": "131000000"
  },
  "creditorAccountId": {
    "identification": "1111111111"
  },
  "remittanceInformationUnstructured": "RmtInf1234"
}
    
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

