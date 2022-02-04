import requests
import re
from bs4 import BeautifulSoup

# retrieve biome temp, humidity data, and time updated
# assumes row names and that data is in the FIRST TABLE
def getTempHumdTime(soup):
    # ex. "Biome Conditions as of 02:55 EST"
    updateTime = soup.find(string=re.compile("Biome Conditions"))[-9:]

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
    return [temp, humd, updateTime]

# write to file if valid data
def updateTxt(data, txt):
    if data[0] != "NAN" and data[1] != "NAN":
        with open(txt,"w") as txtFile:
            txtFile.write('\n'.join(data))

############################################################

def updateData():
    # scrape and save dry biome live data
    dryURL = "http://10.131.0.32/view.html" # make sure IP is up to date
    dryPage = requests.get(dryURL)

    drySoup = BeautifulSoup(dryPage.content, "html.parser")
    dryData = getTempHumdTime(drySoup)

    updateTxt(dryData, "dryData.txt")

    # scrape and save wet biome live data
    wetURL = "http://10.131.0.33/view.html" # make sure IP is up to date
    wetPage = requests.get(wetURL)

    wetSoup = BeautifulSoup(wetPage.content, "html.parser")
    wetData = getTempHumdTime(wetSoup)

    updateTxt(wetData, "wetData.txt")