import saveInfo
import getInfo

# TBD by Cheryl
skills = ["Quads", "Hamstrings", "Shoulders", "Abs", "Back", "Biceps", "Triceps", "Calves",
          "Power", "Endurance", "Mobility"]

# TBD by Cheryl
skillMap = {
    "Fran" : [skills[9], skills[2], skills[0]],
    "Helen": [skills[0], skills[9], skills[2]],
    "Grace": [skills[9], skills[0], skills[2]],
    "Filthy 50": [skills[9], skills[5]],
    "Fight Gone Bad": [skills[9], skills[8]],
    "Sprint 400m": [skills[9], skills[0], skills[1], skills[8]],
    "Run 5k": [skills[9], skills[0], skills[1], skills[3]],
    "Clean and Jerk": [skills[0], skills[2], skills[8]],
    "Snatch": [skills[2], skills[4], skills[10], skills[0]],
    "Deadlift": [skills[1], skills[4], skills[0]],
    "Back Squat": [skills[0], skills[8], skills[7]],
    "Max Pullups": [skills[2], skills[6], skills[5]]
}

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
        links = getAthleteLinks(url % (str(i), str(year)))

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
                                    # Some people embellish their scores
                                    if (kgs < 600):
                                        scores[key].append(kgs)

                                # --- Remove the "lb" of lb values ---
                                elif (lbIndex is not -1):
                                    lbs = eval("%0.2f" % eval(contents[0:lbIndex]))
                                    print "Lbs =",lbs
                                    # Some people embellish their scores
                                    if (lbs < 600):
                                        scores[key].append(lbs)

                                # --- Convert time values to total seconds ---
                                elif (timeIndex is not -1):
                                    minsToSeconds = eval(contents[0:timeIndex])*60
                                    numSeconds = minsToSeconds+eval(contents[timeIndex+1:])
                                    scores[key].append(numSeconds)
                                # --- Fight Gone Bad and Max Pull Ups are already
                                # --- formatted correctly
                                else:
                                    if (eval(contents) < 600):
                                        scores[key].append(eval(contents))
                            except:
                                continue


    return scores


def main():
    #for year in ["15", "14", "13", "12"]:
    for year in ["15"]:
        allDifferentials = {}
        for cat in ["femaleFirst", "maleFirst", "femaleTop", "maleTop", "femaleGames",
                    "maleGames", "femaleRegionals", "maleRegionals", "femaleOpen", "maleOpen"]:
        #for cat in ["maleRegionals"]:
            averagesDict = {}
            # Retrieve the dictionary of average scores
            if (cat == "femaleFirst"):
                averagesDict = saveInfo.getFemaleFirst(year)
            elif (cat == "maleFirst"):
                averagesDict = saveInfo.getMaleFirst(year)
            elif (cat == "femaleTop"):
                averagesDict = saveInfo.getFemaleTopDictionary(year)
            elif (cat == "maleTop"):
                averagesDict = saveInfo.getMaleTopDictionary(year)
            elif (cat == "femaleGames"):
                averagesDict = saveInfo.getFemaleGamesDictionary(year)
            elif(cat == "maleGames"):
                averagesDict = saveInfo.getMaleGamesDictionary(year)
            elif(cat == "femaleRegionals"):
                averagesDict = saveInfo.getFemaleRegionalDictionary(year)
            elif(cat == "maleRegionals"):
                averagesDict = saveInfo.getMaleRegionalDictionary(year)
            elif(cat == "femaleOpen"):
                averagesDict = saveInfo.getFemaleOpenDictionary(year)
            elif(cat == "maleOpen"):
                averagesDict = saveInfo.getMaleOpenDictionary(year)

            scoresDict = getInfo.returnScores(cat, year)

            #print femaleGames15Scores
            #print femaleGames15Averages

            differentials = {}
            for key in scoresDict.keys():
                scores = scoresDict[key]
                try:
                    average = eval(averagesDict[key])
                except:
                    continue
                # If it's a time, more time is bad
                if(key in ["Fran", "Helen", "Grace", "Filthy 50", "Sprint 400m", "Run 5k"]):
                    for score in scores:
                        differential = abs(score - average)
                        if(key in differentials):
                            differentials[key].append(differential)
                        else:
                            differentials[key] = [differential]

                # If it's a max, more weight/reps is good
                else:
                    for score in scores:
                        differential = abs(average - score)
                        if(key in differentials):
                            differentials[key].append(differential)
                        else:
                            differentials[key] = [differential]
            #print differentials

            averageDifferential = getEmptyScoresDictionary()
            for differential in differentials.keys():
                average = 0
                for diff in differentials[differential]:
                    average = average + diff
                average = average / len(differentials[differential])
                #print differential+":", average
                averageDifferential[differential] = "%0.2f" % average

            print averageDifferential
            allDifferentials[cat] = averageDifferential
        print allDifferentials
        #saveInfo.setDifferentialsDictionary(allDifferentials, year)

main()
