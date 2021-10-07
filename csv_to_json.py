import csv
import json


csvfile = open('co2_simple.csv', 'r')
jsonfile = open('co2.json', 'w')

fieldnames = ("Decimal Date", "Monthly Average")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')