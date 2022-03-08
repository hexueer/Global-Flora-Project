# Author: Ivy Ho
# Date: 02/25/2022

from flask import (Flask, render_template, make_response, url_for, request,
                   redirect, flash, session, send_from_directory, jsonify)
from werkzeug.utils import secure_filename
app = Flask(__name__)

import random
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import static.scraper.scrape as scraper

app.secret_key = 'your secret here'
# replace with a random key
app.secret_key = ''.join([ random.choice(('ABCDEFGHIJKLMNOPQRSTUVXYZ' +
                                          'abcdefghijklmnopqrstuvxyz' +
                                          '0123456789'))
                           for i in range(20) ])

app.config['TRAP_BAD_REQUEST_ERRORS'] = True

@app.route('/')
def index():
    '''Displays main page including biome data, photo gallery, and map'''
    # retrieve biome data
    scraper.updateData()

    # get gallery data
    scope = ['https://spreadsheets.google.com/feeds'] # create scope
    # create some credential using that scope and content of keys.json
    creds = ServiceAccountCredentials.from_json_keyfile_name('keys.json',scope)
    # create gspread authorize using that credential
    client = gspread.authorize(creds)
    # get photo data from sheet into a dictionary
    sheet = client.open_by_key('1KS1DOG_fXZeUkhDcGgx1hgdBFqbqLyvBCR4a090a-lM').sheet1
    photoDict = sheet.get_all_records()
    # edit URL for successful load, must be uc instead of open
    for photo in photoDict:
        photo['File'] = photo['File'].replace('open', 'uc')

    # photos should be from most recent to oldest
    photoDict.reverse()

    return render_template('gallery.html', 
                            photos = photoDict)

# @app.route('/filter/', methods=['POST'])
# def filter():
#     '''Sorts '''
#     if request.method == 'POST': 
#         num = request.form.get('num') 
#     else: 
#         num = request.args.get('num') 
#     try: 
#         return jsonify( {'error': False, 'in': x, 'out': y} ) 
#     except Exception as err: 
#         return jsonify( {'error': True, 'err': str(err) } ) 


# @app.route('/')
# def index():
#     # retrieve biome data
#     scraper.updateData()

#     # get gallery data
#     scope = ['https://spreadsheets.google.com/feeds'] # create scope
#     # create some credential using that scope and content of keys.json
#     creds = ServiceAccountCredentials.from_json_keyfile_name('keys.json',scope)
#     # create gspread authorize using that credential
#     client = gspread.authorize(creds)
#     # get photo data from sheet into a dictionary
#     sheet = client.open_by_key('1KS1DOG_fXZeUkhDcGgx1hgdBFqbqLyvBCR4a090a-lM').sheet1
#     photoDict = sheet.get_all_records()
#     # edit URL for successful load, must be uc instead of open
#     for photo in photoDict:
#         photo['File'] = photo['File'].replace('open', 'uc')

#     return render_template('gallery.html', 
#                             photos = photoDict)

# @app.before_first_request
# def init_db():
#     dbi.cache_cnf()
#     db_to_use = 'globalflora_db' 
#     dbi.use(db_to_use)

if __name__ == '__main__':
    import sys, os
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
        assert(port>1024)
    else:
        port = os.getuid()
    app.debug = True
    app.run('0.0.0.0',port)
