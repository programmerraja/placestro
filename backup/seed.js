import json

f=open("./college1.json","r")

n=open("./college.json","w")
# print(f.read())
j=f.read()
n.write(json.dumps(json.loads(j),indent=4))