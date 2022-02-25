# Originally authored by Hevo Data at https://hevodata.com/learn/google-sheets-as-a-database/
# Edited by Ivy Ho

#import library
import gspread
#Service client credential from oauth2client
from oauth2client.service_account import ServiceAccountCredentials
# Print nicely
import pprint
#Create scope
scope = ['https://spreadsheets.google.com/feeds']
#create some credential using that scope and content of keys.json
creds = ServiceAccountCredentials.from_json_keyfile_name('keys.json',scope)
#create gspread authorize using that credential
client = gspread.authorize(creds)
#Now will can access our google sheets we call client.open on StartupName
sheet = client.open_by_key('1KS1DOG_fXZeUkhDcGgx1hgdBFqbqLyvBCR4a090a-lM').sheet1
pp = pprint.PrettyPrinter()
#Access all of the record inside that
result = sheet.get_all_records()
pp.pprint(result)