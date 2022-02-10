from flask import (Flask, render_template, make_response, url_for, request,
                   redirect, flash, session, send_from_directory, jsonify)
from werkzeug.utils import secure_filename
app = Flask(__name__)

import pymysql
conn = pymysql.connect(read_default_file='~/.my.cnf', database='globalflora_db')

import random
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
    scraper.updateData()
    return render_template('gallery.html')

@app.route('/upload/', methods=["POST"])
def upload():
    pass

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
