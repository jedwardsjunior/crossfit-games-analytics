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

USERNAME = 'cfstrength'
PASSWORD = 'malibu1993'
MONGODB_URI = 'mongodb://%s:%s@ds047652.mongolab.com:47652/crossfit-games-scores' %(USERNAME, PASSWORD)


# Retrieves the dictionary of female Games athletes
def getFemaleGamesDictionary():
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    try:
        dictionary = db['women-games'].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setFemaleGamesDictionary(dictionary):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    db.drop_collection('women-games')
    indicatorDictionary = db['women-games']
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getMaleGamesDictionary():
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    try:
        dictionary = db['men-games'].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setMaleGamesDictionary(dictionary):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    db.drop_collection('men-games')
    indicatorDictionary = db['men-games']
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getFemaleRegionalDictionary():
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    try:
        dictionary = db['women-regionals'].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setFemaleRegionalDictionary(dictionary):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    db.drop_collection('women-regionals')
    indicatorDictionary = db['women-regionals']
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getMaleRegionalDictionary():
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    try:
        dictionary = db['men-regionals'].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setMaleRegionalDictionary(dictionary):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    db.drop_collection('men-regionals')
    indicatorDictionary = db['men-regionals']
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getFemaleOpenDictionary():
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    try:
        dictionary = db['women-open'].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setFemaleOpenDictionary(dictionary):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    db.drop_collection('women-open')
    indicatorDictionary = db['women-open']
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getMaleOpenDictionary():
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    try:
        dictionary = db['men-open'].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setMaleOpenDictionary(dictionary):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    db.drop_collection('men-open')
    indicatorDictionary = db['men-open']
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getFemaleTopDictionary():
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    try:
        dictionary = db['women-top'].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of female Games athletes
def setFemaleTopDictionary(dictionary):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    db.drop_collection('women-top')
    indicatorDictionary = db['women-top']
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of top female Games athletes
def getMaleTopDictionary():
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    try:
        dictionary = db['men-top'].find()[0]
    except:
        dictionary = {}
    client.close()
    return dictionary

# Resets the dictionary of top female Games athletes
def setMaleTopDictionary(dictionary):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    db.drop_collection('men-top')
    indicatorDictionary = db['men-top']
    indicatorDictionary.insert_one(dictionary)
    client.close()

# Retrieves the dictionary of female Games athletes
def getFemaleFirst():
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    try:
        scores = db['women-first'].find()[0]
    except:
        scores = {}
    client.close()
    return scores

# Resets the dictionary of female Games athletes
def setFemaleFirst(scores):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    db.drop_collection('women-first')
    indicatorDictionary = db['women-first']
    indicatorDictionary.insert_one(scores)
    client.close()

# Retrieves the dictionary of female Games athletes
def getMaleFirst():
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    try:
        scores = db['men-first'].find()[0]
    except:
        scores = {}
    client.close()
    return scores

# Resets the dictionary of female Games athletes
def setMaleFirst(scores):
    client = pymongo.MongoClient(MONGODB_URI)
    db = client.get_default_database()
    db.drop_collection('men-first')
    indicatorDictionary = db['men-first']
    indicatorDictionary.insert_one(scores)
    client.close()
