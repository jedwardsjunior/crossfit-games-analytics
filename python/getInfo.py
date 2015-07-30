import urllib
import urllib2
from bs4 import BeautifulSoup
import re
import saveInfo


# --- Returns a dictionary with all keys set to an empty list.
# --- The keys are the Workouts and Maxes in each athlete bio.
def getEmptyScoresDictionary():
    scores = {}
    # --- Sample athlete bio (where these keys came from):
    # --- http://games.crossfit.com/athlete/8404
    scores["Fran"] = []
    scores["Helen"] = []
    scores["Grace"] = []
    scores["Filthy 50"] = []
    scores["Fight Gone Bad"] = []
    scores["Sprint 400m"] = []
    scores["Run 5k"] = []
    scores["Clean & Jerk"] = []
    scores["Snatch"] = []
    scores["Deadlift"] = []
    scores["Back Squat"] = []
    scores["Max Pull-ups"] = []
    return scores


# --- Takes a url to a leaderboard and returns all the links to
# --- the athlete bios in order of rank they finished in.
def getAthleteLinks(url):
    # --- Build our Request object ---
    req = urllib2.Request(url)

    # --- Make the request and read the response ---
    page = urllib2.urlopen(req).read()

    # --- Turn the "scores" page into a BeautifulSoup object ---
    parsed_html = BeautifulSoup(page)

    # --- We're only interested in the td objects with class "name",
    # --- so find all of those on the page ---
    names = parsed_html.findAll('td', { "class":"name" })
    links = []
    for name in names:
        # --- The link to the athlete's information is within the embedded
        # --- <a> tag, attribute "href" ---
        links.append(name.a["href"])

    # --- Return the list of links to athlete bios ---
    return links


def getAthletesScores(url, numToCount=-1, numPages=1, year=15):

    # --- Get an empty scores dictionary with the necessary keys
    scores = getEmptyScoresDictionary()

    # --- Sometimes we need to process N athletes over P pages.
    # --- If this is the case, numPages will be equal to P.
    # --- The urls to the pages to retrieve will only vary by
    # --- the "region" value in the url, so we'll use the
    # --- counter "i" to capture that change.

    for i in range(1, numPages+1):
        print "Processing",i
        # --- Get all the links to the athlete bios ---
        url = url % (str(i), str(year))
        links = getAthleteLinks(url)

        # --- In some cases, we only want the top N competitors' info.
        # --- If this is true, then numToCount will be passed in equal
        # --- to N. Otherwise, we'll process all the athletes.
        if (numToCount != -1):
            links = links[0:numToCount]

        for link in links:
            # --- Build our Request object ---
            req = urllib2.Request(link)

            # --- Make the request and read the response ---
            page = urllib2.urlopen(req).read()

            # --- Turn the "scores" page into a BeautifulSoup object ---
            parsed_html = BeautifulSoup(page)

            # --- Find the rows of interest (within the Workouts and Maxes tables) ---
            rows = parsed_html.findAll('tr')
            for row in rows:
                # --- Each row has two cells: a key and a value ---
                for cell in row.findChildren(["td"]):
                    # --- Turn the contents of the cell into a string ---
                    contents = str(cell.contents[0])
                    # --- If the first character is a letter, this is the key ---
                    if re.match("^[A-Z]*$", contents[0]):
                        key = contents
                    else:
                        # --- Is the value "real" (i.e. not missing) ---
                        if not (contents[0] == "0" or
                                contents[0] == "-" or
                                contents == ""):
                            # --- Occasionally I get a weird error for some numbers,
                            # --- for example "09". Because I can't figure it out,
                            # --- I'm just throwing away unclean data right now.
                            try:
                                # --- Convert kg to lb, then keep just the number ---
                                kgIndex = contents.find("kg")
                                lbIndex = contents.find("lb")
                                timeIndex = contents.find(":")
                                if (kgIndex is not -1):
                                    kgs = eval("%0.2f" % eval(contents[0:kgIndex]*2.20462))
                                    print "\n\nKgs =",kgs,"\n\n"
                                    scores[key].append(kgs)

                                # --- Remove the "lb" of lb values ---
                                elif (lbIndex is not -1):
                                    lbs = eval("%0.2f" % eval(contents[0:lbIndex]))
                                    print "Lbs =",lbs
                                    scores[key].append(lbs)

                                # --- Convert time values to total seconds ---
                                elif (timeIndex is not -1):
                                    minsToSeconds = eval(contents[0:timeIndex])*60
                                    numSeconds = minsToSeconds+eval(contents[timeIndex+1:])
                                    scores[key].append(numSeconds)
                                # --- Fight Gone Bad and Max Pull Ups are already
                                # --- formatted correctly
                                else:
                                    scores[key].append(eval(contents))
                            except:
                                continue


    return scores

# --- Calculate the scores for top 10 female and male Games finishers
def getFirstScores(year):
    femaleFirst = "http://games.crossfit.com/scores/leaderboard.php?stage=0&sort=0&division=201&region=%s&regional=4&numberperpage=60&page=0&competition=2&frontpage=0&expanded=0&full=0&year=%s&showtoggles=0&hidedropdowns=0&showathleteac=0&athletename=&fittest=1&fitSelect=undefined&scaled=0"
    femaleFirstScore = getAthletesScores(femaleFirst, 1, 1, year)
    for key in femaleFirstScore.keys():
        eventScore = femaleFirstScore[key]
        if len(eventScore) == 0:
            continue
        femaleFirstScore[key] = "%0.2f" % (eventScore[0])
    saveInfo.setFemaleFirst(femaleFirstScore, year)

    maleFirst = "http://games.crossfit.com/scores/leaderboard.php?stage=0&sort=0&division=1&region=%s&numberperpage=60&userid=0&competition=2&frontpage=0&expanded=0&year=%s&full=0&showtoggles=0&hidedropdowns=1&showathleteac=0&athletename="
    maleFirstScore = getAthletesScores(maleFirst, 1, 1, year)
    for key in maleFirstScore.keys():
        eventScore = maleFirstScore[key]
        if len(eventScore) == 0:
            continue
        maleFirstScore[key] = "%0.2f" % (eventScore[0])
    saveInfo.setMaleFirst(maleFirstScore, year)


# --- Calculate the scores for top 10 female and male Games finishers
def getTopScores(year):
    femaleGames = "http://games.crossfit.com/scores/leaderboard.php?stage=0&sort=0&division=201&region=%s&regional=4&numberperpage=60&page=0&competition=2&frontpage=0&expanded=0&full=0&year=%s&showtoggles=0&hidedropdowns=0&showathleteac=0&athletename=&fittest=1&fitSelect=undefined&scaled=0"
    femaleTopScores = getAthletesScores(femaleGames, 10, 1, year)
    for key in femaleTopScores.keys():
        eventScores = femaleTopScores[key]
        numScores = len(eventScores)
        if numScores == 0:
            continue
        total = 0
        for score in eventScores:
            total += score
        femaleTopScores[key] = "%0.2f" % (total/numScores)
    saveInfo.setFemaleTopDictionary(femaleTopScores, year)

    maleGames = "http://games.crossfit.com/scores/leaderboard.php?stage=0&sort=0&division=1&region=%s&numberperpage=60&userid=0&competition=2&frontpage=0&expanded=0&year=%s&full=0&showtoggles=0&hidedropdowns=1&showathleteac=0&athletename="
    maleTopScores = getAthletesScores(maleGames, 10, 1, year)
    for key in maleTopScores.keys():
        eventScores = maleTopScores[key]
        numScores = len(eventScores)
        if numScores == 0:
            continue
        total = 0
        for score in eventScores:
            total += score
        maleTopScores[key] = "%0.2f" % (total/numScores)
    saveInfo.setMaleTopDictionary(maleTopScores, year)

# --- Calculate the scores for all female and male Games finishers
def getGamesScores(year):
    femaleGames = "http://games.crossfit.com/scores/leaderboard.php?stage=0&sort=0&division=201&region=%s&regional=4&numberperpage=60&page=0&competition=2&frontpage=0&expanded=0&full=0&year=%s&showtoggles=0&hidedropdowns=0&showathleteac=0&athletename=&fittest=1&fitSelect=undefined&scaled=0"
    femaleGamesScores = getAthletesScores(femaleGames, -1, 1, year)
    for key in femaleGamesScores.keys():
        eventScores = femaleGamesScores[key]
        numScores = len(eventScores)
        if numScores == 0:
            continue
        total = 0
        for score in eventScores:
            total += score
        femaleGamesScores[key] = "%0.2f" % (total/numScores)
    saveInfo.setFemaleGamesDictionary(femaleGamesScores, year)

    maleGames = "http://games.crossfit.com/scores/leaderboard.php?stage=0&sort=0&division=1&region=%s&numberperpage=60&userid=0&competition=2&frontpage=0&expanded=0&year=%s&full=0&showtoggles=0&hidedropdowns=1&showathleteac=0&athletename="
    maleGamesScores = getAthletesScores(maleGames, -1, 1, year)
    for key in maleGamesScores.keys():
        eventScores = maleGamesScores[key]
        numScores = len(eventScores)
        if numScores == 0:
            continue
        total = 0
        for score in eventScores:
            total += score
        maleGamesScores[key] = "%0.2f" % (total/numScores)
        saveInfo.setMaleGamesDictionary(maleGamesScores, year)

# --- Calculate the scores for top 15 female and male regional finishers
# --- from all regions
def getRegionalScores(year):
    femaleRegionals = "http://games.crossfit.com/scores/leaderboard.php?stage=0&sort=0&division=201&region=%s&regional=0&numberperpage=60&page=0&competition=1&frontpage=0&expanded=0&full=0&year=%s&showtoggles=0&hidedropdowns=1&showathleteac=0&athletename=&fittest=1&fitSelect=1&scaled=0"
    femaleRegionalScores = getAthletesScores(femaleRegionals, 15, 17, year)
    for key in femaleRegionalScores.keys():
        eventScores = femaleRegionalScores[key]
        numScores = len(eventScores)
        if numScores == 0:
            continue
        total = 0
        for score in eventScores:
            total += score
        femaleRegionalScores[key] = "%0.2f" % (total/numScores)
    saveInfo.setFemaleRegionalDictionary(femaleRegionalScores, year)

    maleRegionals = "http://games.crossfit.com/scores/leaderboard.php?stage=0&sort=0&division=101&region=%s&regional=0&numberperpage=60&page=0&competition=1&frontpage=0&expanded=0&full=0&year=%s&showtoggles=0&hidedropdowns=1&showathleteac=0&athletename=&fittest=1&fitSelect=1&scaled=0"
    maleRegionalScores = getAthletesScores(maleRegionals, 15, 17, year)
    for key in maleRegionalScores.keys():
        eventScores = maleRegionalScores[key]
        numScores = len(eventScores)
        if numScores == 0:
            continue
        total = 0
        for score in eventScores:
            total += score
        maleRegionalScores[key] = "%0.2f" % (total/numScores)
    saveInfo.setMaleRegionalDictionary(maleRegionalScores, year)


# --- Calculate the scores for top 600 female and male Open finishers
# --- worldwide
def getOpenScores(year):
    # --- Note: instead of numPages representing the region, it represents the
    # --- actual pagination (so the '%s' is in a new spot)
    femaleOpen = "http://games.crossfit.com/scores/leaderboard.php?stage=5&sort=0&division=2&region=0&regional=0&numberperpage=100&page=%s&competition=0&frontpage=0&expanded=0&full=0&year=%s&showtoggles=0&hidedropdowns=1&showathleteac=0&athletename=&fittest=1&fitSelect=0&scaled=0"
    femaleOpenScores = getAthletesScores(femaleOpen, 100, 6, year)
    for key in femaleOpenScores.keys():
        eventScores = femaleOpenScores[key]
        numScores = len(eventScores)
        if numScores == 0:
            continue
        total = 0
        for score in eventScores:
            total += score
        femaleOpenScores[key] = "%0.2f" % (total/numScores)
    saveInfo.setFemaleOpenDictionary(femaleOpenScores, year)

    maleOpen = "http://games.crossfit.com/scores/leaderboard.php?stage=5&sort=0&division=1&region=0&regional=0&numberperpage=100&page=%s&competition=0&frontpage=0&expanded=0&full=0&year=%s&showtoggles=0&hidedropdowns=1&showathleteac=0&athletename=&fittest=1&fitSelect=0&scaled=0"
    maleOpenScores = getAthletesScores(maleOpen, 100, 6, year)
    for key in maleOpenScores.keys():
        eventScores = maleOpenScores[key]
        numScores = len(eventScores)
        if numScores == 0:
            continue
        total = 0
        for score in eventScores:
            total += score
        maleOpenScores[key] = "%0.2f" % (total/numScores)
    saveInfo.setMaleOpenDictionary(maleOpenScores, year)

def main():
    cont = raw_input("Test? (Y/N)")
    year = raw_input("Year? (YY format): ")
    if cont=='Y':
        print "Top Females:\n"
        print saveInfo.getFemaleTopDictionary(year)
        print "\n\nTop Males:\n"
        print saveInfo.getMaleTopDictionary(year)
        print "\n\nGames Females:\n"
        print saveInfo.getFemaleGamesDictionary(year)
        print "\n\nGames Males:\n"
        print saveInfo.getMaleGamesDictionary(year)
        print "\n\nRegional Females:\n"
        print saveInfo.getFemaleRegionalDictionary(year)
        print "\n\nRegional Males:\n"
        print saveInfo.getMaleRegionalDictionary(year)
        print "\n\nOpen Females:\n"
        print saveInfo.getFemaleOpenDictionary(year)
        print "\n\nOpen Males:\n"
        print saveInfo.getMaleOpenDictionary(year)
        print "\n\nFirst Place Female:\n"
        print saveInfo.getFemaleFirst(year)
        print "\n\First Place Male:\n"
        print saveInfo.getMaleFirst(year)
    else:
        #getTopScores(year)
        #getGamesScores(year)
        getRegionalScores(year)
        getOpenScores(year)
        getFirstScores(year)


main()
