### One time use script that creates dictionary converting obscure colors to normal colors
import pandas as pd

allcolors = pd.read_csv("allcolors.csv")

obscure_color_dict = {}

colorlist = ["white","beige","gray","pink","red","brown","orange","yellow","olive","green","turquoise","cyan","blue","black","purple","violet"]

# iterate through colors
for index2, row2 in allcolors.iterrows():
    r1 = row2["R"]
    g1 = row2["G"]
    b1 = row2["B"]
    obscure_color = row2["Color"]
    
    # magic crap
    distance = 100000000
    match = "empty"
    
    # iterate through potential closest colors
    for index, row in allcolors.iterrows():
        
        # check if possible color is in valid list
        color = row["Color"]
        if color in colorlist:
            r2 = row["R"]
            g2 = row["G"]
            b2 = row["B"]

            # euclidian distance from reference color, doesnt need sqrt because distance order stays the same
            dist = (r2-r1)**2+(g2-g1)**2+(b2-b1)**2

            # if it's the closest possible color so far, then store as closest color
            if dist < distance:
                distance = dist
                match = color
    
    # make the dict
    obscure_color_dict.update({obscure_color:match})

# Paste this dict into our our Lambda function
print(obscure_color_dict)

