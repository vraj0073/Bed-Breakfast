from flask import jsonify
import json
from typing import Dict
from google.cloud import aiplatform
from google.protobuf import json_format
from google.protobuf.struct_pb2 import Value
from flask import redirect
def hello_world(request):
    if request.method == 'OPTIONS':
        headers = {
            # 'Access-Control-Allow-Origin': 'https://mydomain.com',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600'
            # 'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    '''
    headers = {
        'Access-Control-Allow-Origin': 'https://mydomain.com',
        'Access-Control-Allow-Credentials': 'true'
    }

    return ('Hello World!', 200, headers)
    '''
    request_json = request.get_json(silent=True)
    print(request_json)
    project="810553200902"
    location="us-central1"
    endpoint_name= "2427959168641007616"
    instances=[
    {"id": request_json["id"], 
    "Age": request_json['Age'],
    "number": request_json["number"]}
    ]
    aiplatform.init(project=project, location=location)
    endpoint = aiplatform.Endpoint(endpoint_name)
    response = endpoint.predict(instances=instances)
    for prediction_ in response.predictions:
        print(int(prediction_["value"]))
        tour_package=int(prediction_["value"]) 
    data = {
        'name': tour_package
    }

    response = jsonify({
        'data': data
    })

    response.headers.set('Access-Control-Allow-Origin', '*')
    return response