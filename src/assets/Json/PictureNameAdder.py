import json
import os
print("type a city name: ")
city = input()

pictureFolderPath = "C:/Users/woute/Documents/Ionic-Elastic/Ionic-Elastic/src/assets/Pictures/"

with open("C:/Users/woute/Documents/Ionic-Elastic/Ionic-Elastic/src/assets/Json/" + city + ".json", "r", encoding='utf8') as json_data:
    data = json.load(json_data)
    json_data.close()


features = data['features']
for feature in features:
    print((feature['properties'])['picture_folder'])


os.walk(pictureFolderPath)
locations = os.listdir(pictureFolderPath + city)
i = 0
print()

# loop through all items
for location in locations:

    # loop through all features
    for i, feature in enumerate(features):

        # if the name of the location matches the name of the folder
        if (feature['properties'])['picture_folder'] == location:

            # delete thumbnails to make sure they dont break the code
            if 'Thumbs.db' in os.listdir(pictureFolderPath + city + "/" + location):
                os.remove(pictureFolderPath + city + "/" + location + "/Thumbs.db")


            # set the property picture_name to all items in the correct folder
            # (((data['features'])[i])['properties'])['picture_name'] the name of the picture in the data
            # os.listdir(pictureFolderPath + city + "/" + location) the name of the pictures in the folder
            (((data['features'])[i])['properties'])['picture_name'] = os.listdir(pictureFolderPath + city + "/" + location)
            print((((data['features'])[i])['properties'])['picture_name'])

        # if the picture folder is ""

        if (feature['properties'])['picture_folder'] == "" or (feature['properties'])['picture_folder'] == '':
            (((data['features'])[i])['properties'])['picture_name'] = [""]

#save the data to the json file
with open("C:/Users/woute/Documents/Ionic-Elastic/Ionic-Elastic/src/assets/Json/" + city + '.json', 'w', encoding='utf8') as f:
    json.dump(data, f, ensure_ascii=False)

print("SUCCES")