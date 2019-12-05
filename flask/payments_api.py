import requests
import json

class payments_api: 
    def __init__(self,token,method,additional_headers={},params = None): 
        self.token = token 
        self.endpoint_type = method
        self.base_url = 'https://api.preprod.fusionfabric.cloud/payment/payment-initiation/v1/credit-transfer/international/initiate'
        self.additional_headers = additional_headers
        self.params = params
        self.sample_post = {
            "initiatingParty": "DHILDHILXXX",
            "paymentInformationId": "MMSTADV52788051",
            "paymentMethod": "TRF",
            "requestedExecutionDate": "2018-08-28",
            "paymentIdentification": {
                "instructionIdentification": "MMSTADV52788051",
                "endToEndIdentification": "MMSTADV52788051"
            },
            "instructionPriority": "CRED",
            "chargeBearer": "FollowingServiceLevel",
            "instructedAmount": {
                "amount": 100.11,
                "currency": "ILS"
            },
            "PreCalculatedCharges": {
                "amount": 100,
                "currency": "USD",
                "suppressAdditionalCharges": True
            },
            "debitorAgent": {
                "identification": "EATCIL2WXXX"
            },
            "debtorAccountId": {
                "identificationType": "PrimaryAccountNumber",
                "identification": "8888888888",
                "name": "Name",
                "currency": "USD"
            },
            "creditor": {
                "name": "Name",
                "postalAddress": {
                "addressLine": [
                    "68 Rue de Charenton"
                ],
                "street": "Street Name",
                "buildingNumber": 14,
                "postalCode": 70018,
                "city": "City",
                "country": "SG"
                }
            },
            "creditorAgent": {
                "identification": "WPACIL2WXXX"
            },
            "creditorAccountId": {
                "identificationType": "PrimaryAccountNumber",
                "identification": "999999999"
            },
            "relatedRemittanceInformation": {
                "remittanceIdentification": "RmtId1234",
                "remittanceLocationMethod": "URID",
                "remittanceLocationElectronicAddress": "Location"
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

