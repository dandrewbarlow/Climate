import csv
import json


csvfile = open('temperature.csv', 'r')
jsonfile = open('temperature.json', 'w')

fieldnames = ("Year", "Annual Anomaly", "Annual Unc.", "Five-year Anomaly", "Five-year Unc.")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')