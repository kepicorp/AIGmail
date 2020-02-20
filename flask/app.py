from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import traceback
from NER import CRF_NER
import authenticate
import payments_api

#API definition
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    if request.method == 'POST': 
        if crf:
            print ('inside predict')
            try:
                print(str(request))
                json_ = request.json
                print(str(json_))
                sentence = json_["email"]
                print(sentence)
                result = c.query(sentence)
                print(result)
                response = jsonify(result)
                response.headers.add('Access-Control-Allow-Origin', '*')
                response.headers.add('Access-Control-Allow-Headers', 'origin')
                print("sending response")
                print(response)
                return response
            except:

                return jsonify({'trace': traceback.format_exc()})
        else:
            print ('There is no trained model found.')
            return jsonify({'error':'no model found'})
    else:
        return jsonify({'error': 'no get request handler'})

@app.route('/payment', methods=['POST'])
def payment():
    print('payment request')
    try:
        print('trying authentication')
        json_ = request.json
        print(str(json_))

        a = authenticate.authenticate('config.csv')
        response,token = a.get_token()
        
        print(token)

        p = payments_api.payments_api(token,'POST')

        payload = p.sample_post
        print(str(payload))
        # payload['debtorAccountId']['name'] = json_['accountB']
        # payload['creditor']['name'] = json_['accountA']
        payload['paymentIdentification']['EndToEndId'] = json_['accountA'] + json_['accountB']
        payload['instructedAmount']['amount'] = json_['amount']

        print('###'+str(payload))

        response = p.connect_endpoint(payload)
        print(response)

        returnResponse = jsonify(response.text)

        return returnResponse    
    except:
        return jsonify({'error': 'there was an error'})

if __name__ == '__main__':
    host='0.0.0.0'
    port = 5001
    model_filepath = 'crf_model_with_currency.pkl'

    c = CRF_NER(model_filepath)
    crf = c.load_model()
    print ('Model loaded')

    app.run(host=host, port=port, debug=False)#, ssl_context='adhoc')
