"""
* indicatiorDictionary.py
*
* Coder:    Julia Edwards
* Version:  1
* Date:     July 2015
*
* save-info.py accesses the database for CrossFit games athlete info
* and saves, updates, and retrieves data
*
"""
import json
import sys
import pymongo
import time

USERNAME = 'cfstrength'
PASSWORD = 'malibu1993'
MONGODB_URI = 'mongodb://%s:%s@ds047652.mongolab.com:47652/crossfit-games-scores' %(USERNAME, PASSWORD)

def backupUserDB():
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "users"
    dictionary = {}
    try:
        rightNow = time.strftime("%c")
        print rightNow
        users = db[collection].find()
        userList = []
        for user in users:
            userList.append(user)
        print userList
        dictionary[rightNow] = userList
        print dictionary
        backupUsers = db['backup-users']
        print backupUsers
        backupUsers.insert_one(dictionary)
    except:
        print "Error retriving dictionary"
    client.close()

# Retrieves the dictionary of female Games athletes
def getFemaleGamesDictionary(year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "women-games-%s" % year
    try:
        dictionary = db[collection].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setFemaleGamesDictionary(dictionary, year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "women-games-%s" % year
    db.drop_collection(collection)
    indicatorDictionary = db[collection]
    indicatorDictionary.insert_one(dictionary)
    client.close()

### --- TODO 7/30: STOPPED WORK HERE. NEED TO KEEP UPDATING ALL OTHER FUNCTIONS
### ---  TO BE COMPATIBLE WITH YEAR INPUT #----

# Retrieves the dictionary of female Games athletes
def getMaleGamesDictionary(year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "men-games-%s" % year
    try:
        dictionary = db[collection].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setMaleGamesDictionary(dictionary, year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "men-games-%s" % year
    db.drop_collection(collection)
    indicatorDictionary = db[collection]
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getFemaleRegionalDictionary(year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "women-regionals-%s" % year
    try:
        dictionary = db[collection].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setFemaleRegionalDictionary(dictionary, year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "women-regionals-%s" % year
    db.drop_collection(collection)
    indicatorDictionary = db[collection]
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getMaleRegionalDictionary(year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "men-regionals-%s" % year
    try:
        dictionary = db[collection].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setMaleRegionalDictionary(dictionary, year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "men-regionals-%s" % year
    db.drop_collection(collection)
    indicatorDictionary = db[collection]
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getFemaleOpenDictionary(year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "women-open-%s" % year
    try:
        dictionary = db[collection].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setFemaleOpenDictionary(dictionary, year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "women-open-%s" % year
    db.drop_collection(collection)
    indicatorDictionary = db[collection]
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getMaleOpenDictionary(year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "men-open-%s" % year
    try:
        dictionary = db[collection].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setMaleOpenDictionary(dictionary, year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "men-open-%s" % year
    db.drop_collection(collection)
    indicatorDictionary = db[collection]
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getFemaleTopDictionary(year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "women-top-%s" % year
    try:
        dictionary = db[collection].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setFemaleTopDictionary(dictionary, year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "women-top-%s" % year
    db.drop_collection(collection)
    indicatorDictionary = db[collection]
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of top female Games athletes
def getMaleTopDictionary(year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "men-top-%s" % year
    try:
        dictionary = db[collection].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of top female Games athletes
def setMaleTopDictionary(dictionary, year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "men-top-%s" % year
    db.drop_collection(collection)
    indicatorDictionary = db[collection]
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getFemaleFirst(year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "women-first-%s" % year
    try:
        scores = db[collection].find()[0]
    except:
        scores = {}
    client.close()
    return scores

# Resets the dictionary of female Games athletes
def setFemaleFirst(scores, year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "women-first-%s" % year
    db.drop_collection(collection)
    indicatorDictionary = db[collection]
    indicatorDictionary.insert_one(scores)
    client.close()

# Retrieves the dictionary of female Games athletes
def getMaleFirst(year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "men-first-%s" % year
    try:
        scores = db[collection].find()[0]
    except:
        scores = {}
    client.close()
    return scores

# Resets the dictionary of female Games athletes
def setMaleFirst(scores, year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "men-first-%s" % year
    db.drop_collection(collection)
    indicatorDictionary = db[collection]
    indicatorDictionary.insert_one(scores)
    client.close()

# Resets the dictionary of female Games athletes
def setDifferentialsDictionary(dictionary, year):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    collection = "differentials-%s" % year
    db.drop_collection(collection)
    indicatorDictionary = db[collection]
    indicatorDictionary.insert_one(dictionary)
    client.close()

#def main():
#    backupUserDB()

#main()
