import requests
import os
from datetime import datetime
from bs4 import BeautifulSoup

# retrieve biome temp and humidity data
# assumes row names and that data is in the FIRST TABLE
def getTempHumd(soup):
    temp, humd = "NAN", "NAN"
    # traverse table
    for tr in soup.find_all('table')[0].children:
        for td in tr:
            val = td.text.strip()
            # if row name matches, take succeeding value
            if val == "Temperature °C":
                temp = td.next_sibling.text.strip()
            elif val == "Relative Humidity %":
                humd = td.next_sibling.text.strip()
    return [temp, humd]

# write to file if valid data, adding updated date+time
def updateTxt(data, txt):
    if data[0] != "NAN" and data[1] != "NAN":
        save_path = 'static/scraper'
        completeName = os.path.join(save_path, txt)

        # ex. 25/06/2021 07:58:56
        now = datetime.now().strftime("%m/%d/%Y %H:%M") + " EST"
        data.append(now)

        with open(completeName,"w") as txtFile:
            txtFile.write('\n'.join(data))

############################################################

def updateData():
    # scrape and save dry biome live data
    dryURL = "http://10.131.0.32/view.html" # make sure IP is up to date
    dryPage = requests.get(dryURL)

    drySoup = BeautifulSoup(dryPage.content, "html.parser")
    dryData = getTempHumd(drySoup)

    updateTxt(dryData, "dryData.txt")

    # scrape and save wet biome live data
    wetURL = "http://10.131.0.33/view.html" # make sure IP is up to date
    wetPage = requests.get(wetURL)

    wetSoup = BeautifulSoup(wetPage.content, "html.parser")
    wetData = getTempHumd(wetSoup)

    updateTxt(wetData, "wetData.txt")