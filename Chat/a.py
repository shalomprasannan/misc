import poshpy
import json
import requests
s=""

def json_printer(data):
    s = json.dumps(data, indent=4, sort_keys=True)
    print(s)
    return
completed_cmd = poshpy.execute_command("get-service|convertto-json")
if completed_cmd.return_code == 0:
    data=completed_cmd.standard_out.decode('utf8').replace("'", '"')
    data = json.loads(data)
    e = json.dumps(data, indent=4, sort_keys=True)
    print(e)
else:
    print(completed_cmd.standard_error)



todo = {"field":"hostname", "pattern":"moc%", "output":data}
api_url = "http://localhost:3001/api/sql"
response = requests.post(api_url,json=todo)
print_data=response.json()
json_printer(print_data)