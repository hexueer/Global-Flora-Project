# Author: Ivy Ho
# Date: 02/25/2022

from flask import (Flask, render_template, make_response, url_for, request,
                   redirect, flash, session, send_from_directory, jsonify)
from werkzeug.utils import secure_filename
app = Flask(__name__)

import random
import gspread
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
    scope = ['https://spreadsheets.google.com/feeds'] # permissible data to access
    # create gspread authorize using that credentials and scope
    client = gspread.service_account('keys.json', scope)
    # get photo data from sheet into a dictionary
    sheet = client.open_by_key('1KS1DOG_fXZeUkhDcGgx1hgdBFqbqLyvBCR4a090a-lM').sheet1
    photoDict = sheet.get_all_records()
    # edit URL for successful load, must be uc instead of open
    for photo in photoDict:
        photo['ImageFile'] = photo['ImageFile'].replace('open', 'uc')
        photo['Season'] = photo['Season'].lower()
        photo['Month'] = photo['Month'].lower()
        photo['Area'] = photo['Area'].lower()

    # photos should be from most recent to oldest
    photoDict.reverse()

    return render_template('index.html', 
                            photos = photoDict)

# FIX PHOTO ORIENTATION
# EXIF.getData(imageElement, function() {
#                 var orientation = EXIF.getTag(this, "Orientation");

#                 if(orientation == 6)
#                     $(imageElement).css('transform', 'rotate(90deg)')
# }); 

if __name__ == '__main__':
    import sys, os
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
        assert(port>1024)
    else:
        port = os.getuid()
    app.debug = True
    app.run('0.0.0.0',8250)
    # app.run(host='0.0.0.0',port=port,ssl_context='adhoc')
    # app.run(host='0.0.0.0',port=port,ssl_context=('cs_wellesley_edu_cert.cer', 'cs.wellesley.edu.key'))