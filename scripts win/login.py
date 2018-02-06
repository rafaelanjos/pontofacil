import requests
import sys

payload = {'username': 'rafael', 'description': sys.argv[1]}
r = requests.post("http://localhost:8000/launch", data=payload)
print(r.text)
