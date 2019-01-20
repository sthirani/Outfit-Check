// This file is a Lambda backend for an Alexa skill that helps its user choose outfits

// Lists of Permitted Colors
var whitelist = ["beige","gray","pink","red","brown","orange","yellow","olive","green","turquoise","cyan","blue","black","purple","violet"];
var beigelist = ["white","brown","green","black","purple"];
var graylist = ["white","pink","red","orange","cyan","blue","black","purple","violet"];
var pinklist = ["white","gray","brown","olive","turquoise","black"];
var redlist = ["white","gray","yellow","blue","black"];
var brownlist = ["white","beige","pink","orange","olive","green","turquoise","cyan","blue","purple"];
var orangelist = ["white","olive","green","cyan","blue","black","violet"];
var yellowlist = ["white","gray","cyan","blue","black","violet"];
var olivelist = ["white","pink","brown","orange"];
var greenlist = ["white","beige","gray","brown","orange","yellow","black"];
var turquoiselist = ["white","pink","brown","orange","yellow","black","purple","violet"];
var cyanlist = ["white","gray","brown","orange","yellow","black"];
var bluelist = ["white","gray","red","brown","orange","yellow","black"];
var blacklist = ["white","beige","gray","pink","red","orange","yellow","green","turquoise","cyan","blue","black","purple","violet"];
var purplelist = ["white","beige","gray","brown","turquoise","black"];
var violetlist = ["white","gray","orange","yellow","turquoise","black"];
// Dictionary of Colors : Lists
var colordict = {
 "white" : whitelist,
 "beige" : beigelist,
 "gray" : graylist,
 "pink" : pinklist,
 "red" : redlist,
 "brown" : brownlist,
 "orange" : orangelist,
 "yellow" : yellowlist,
 "olive" : olivelist,
 "green" : greenlist,
 "turquoise" : turquoiselist,
 "cyan" : cyanlist,
 "blue" : bluelist,
 "black" : blacklist,
 "purple" : purplelist,
 "violet" : violetlist,
};

// Lists of colors NOT good in each season
var springlist = ['black', 'brown', 'purple', 'olive'];
var summerlist = ['black', 'brown', 'olive'];
var falllist = ['pink', 'violet', 'blue', 'red'];
var winterlist = ['pink', 'yellow', 'orange', 'violet'];

// Dict of Seasons
var seasondict = {
    'spring' : springlist,
    'summer' : summerlist,
    'fall' : falllist,
    'winter' : winterlist
};

// Dict converting obscure colors to normal colors, based on euclidean distance
var closest_dict = {
    'alice blue' : 'white',
    'antique white' : 'beige',
    'aqua' : 'cyan',
    'aqua marine' : 'turquoise',
    'azure' : 'white',
    'beige' : 'beige',
    'bisque' : 'beige',
    'black' : 'black',
    'blanched almond' : 'beige',
    'blue' : 'blue',
    'blue violet' : 'purple',
    'brown' : 'brown',
    'burly wood' : 'pink',
    'cadet blue' : 'gray',
    'chart reuse' : 'olive',
    'chocolate' : 'brown',
    'coral' : 'orange',
    'corn flower blue' : 'turquoise',
    'corn silk' : 'beige',
    'crimson' : 'brown',
    'cyan' : 'cyan',
    'aqua' : 'cyan',
    'dark blue' : 'blue',
    'dark cyan' : 'turquoise',
    'dark golden rod' : 'olive',
    'dark gray' : 'gray',
    'dark green' : 'green',
    'dark khaki' : 'gray',
    'dark magenta' : 'purple',
    'dark olive green' : 'olive',
    'dark orange' : 'orange',
    'dark orchid' : 'purple',
    'dark red' : 'brown',
    'dark salmon' : 'pink',
    'dark sea green' : 'gray',
    'dark slate blue' : 'purple',
    'dark slate gray' : 'green',
    'dark turquoise' : 'turquoise',
    'dark violet' : 'purple',
    'deep pink' : 'purple',
    'deep sky blue' : 'cyan',
    'dodger blue' : 'turquoise',
    'firebrick' : 'brown',
    'floral white' : 'white',
    'forest green' : 'green',
    'fuchsia' : 'violet',
    'gainsboro' : 'beige',
    'ghost white' : 'white',
    'gold' : 'yellow',
    'golden rod' : 'orange',
    'gray' : 'gray',
    'green' : 'green',
    'green yellow' : 'yellow',
    'honeydew' : 'white',
    'hot pink' : 'violet',
    'indian red' : 'brown',
    'indigo' : 'purple',
    'ivory' : 'white',
    'khaki' : 'pink',
    'lavender' : 'white',
    'lavender blush' : 'white',
    'lawn green' : 'olive',
    'lemon chiffon' : 'beige',
    'light blue' : 'beige',
    'light coral' : 'pink',
    'light cyan' : 'white',
    'light golden rod yellow' : 'beige',
    'light gray' : 'pink',
    'light green' : 'turquoise',
    'light pink' : 'pink',
    'light salmon' : 'pink',
    'light sea green' : 'turquoise',
    'light sky blue' : 'turquoise',
    'light slate gray' : 'gray',
    'light steel blue' : 'pink',
    'light yellow' : 'beige',
    'lime' : 'green',
    'lime green' : 'green',
    'linen' : 'beige',
    'magenta' : 'violet',
    'maroon' : 'brown',
    'medium aqua marine' : 'turquoise',
    'medium blue' : 'blue',
    'medium orchid' : 'violet',
    'medium purple' : 'gray',
    'medium sea green' : 'gray',
    'medium slate blue' : 'gray',
    'medium spring green' : 'turquoise',
    'medium turquoise' : 'turquoise',
    'medium violet red' : 'purple',
    'midnight blue' : 'purple',
    'mint cream' : 'white',
    'misty rose' : 'beige',
    'moccasin' : 'pink',
    'navajo white' : 'pink',
    'navy' : 'blue',
    'navy' : 'blue',
    'old lace' : 'beige',
    'olive' : 'olive',
    'olive drab' : 'olive',
    'orange' : 'orange',
    'orange red' : 'red',
    'orchid' : 'violet',
    'pale golden rod' : 'beige',
    'pale green' : 'turquoise',
    'pale turquoise' : 'beige',
    'pale violet red' : 'gray',
    'papaya whip' : 'beige',
    'peach puff' : 'pink',
    'peru' : 'orange',
    'pink' : 'pink',
    'plum' : 'violet',
    'powder blue' : 'beige',
    'purple' : 'purple',
    'red' : 'red',
    'rosy brown' : 'gray',
    'royal blue' : 'gray',
    'saddle brown' : 'brown',
    'salmon' : 'pink',
    'sandy brown' : 'orange',
    'sea green' : 'gray',
    'sea shell' : 'white',
    'sienna' : 'brown',
    'silver' : 'pink',
    'sky blue' : 'turquoise',
    'slate blue' : 'gray',
    'slate gray' : 'gray',
    'snow' : 'white',
    'spring green' : 'turquoise',
    'steel blue' : 'gray',
    'tan' : 'pink',
    'teal' : 'gray',
    'thistle' : 'pink',
    'tomato' : 'orange',
    'turquoise' : 'turquoise',
    'violet' : 'violet',
    'wheat' : 'pink',
    'white' : 'white',
    'white smoke' : 'white',
    'yellow' : 'yellow',
    'yellow green' : 'olive',
    };
var springsuggestions = ['peach and cream', 'lavender and white', 'yellow and white'];
var summersuggestions= ['red and blue', 'red and white', 'blue and white'];
var fallsuggestions = ['mustard and brown', 'purple and brown', 'green and brown', 'orange and black'];
var wintersuggestions = ['red and brown', 'cream and gray', 'green and gray'];

//Best colors for each season
var suggestion_dict = {
   'spring' : springsuggestions,
   'summer' : summersuggestions,
   'fall' : fallsuggestions,
   'winter' : wintersuggestions,
};

//Function that “randomly” suggests an outfit for a season
function suggest(season) {
  var suggestion = suggestion_dict[season][Math.floor(Math.random() * suggestion_dict[season].length)];
  console.log(suggestion);
  return(suggestion);
}

// Function that takes in two colors and return and prints good or bad
function colormatch(color1, color2, season) {
    if (!(color1 in closest_dict) || !(color2 in closest_dict)){
        //console.log("Sorry, I don't know about those colors");
        return(0); // want to break the function
    }
    color1 = closest_dict[color1];
    color1 = closest_dict[color1];
 if (colordict[color1].indexOf(color2) > -1) {
   //  console.log("Good Color Combo!");
    return(1); // should this be something else?
 }
 else {
   //  console.log("Bad Color Combo!");
    return(0); // should this be something else?
 }
}

var colorf,colorb;
exports.handler = (event, context, callback) => {
   
   
   switch (event.request.type) {
   
   case "LaunchRequest":
       context.succeed(generateResponse(buildSpeechletResponse("Yeah sure! What colors you have on your mind?", false)))
       break;
   case "IntentRequest":
      
       switch (event.request.intent.name) {
          case "AMAZON.HelpIntent":
              console.log("test help");
              context.succeed(generateResponse(buildSpeechletResponse("Refer to our website", false)))
              break; 
          case "outfit":
              context.succeed(generateResponse(buildSpeechletResponse("Well, what color are your top and bottoms?", false)))
              break;
            case "black":
               context.succeed(generateResponse(buildSpeechletResponse("I love your style!", false)))
               break;
            case "colors":
            //   console.log(event);
              colorf = event.request.intent.slots.colorf.value;
              colorb = event.request.intent.slots.colorb.value;
            //   console.log(colorsplit);
               context.succeed(generateResponse(buildSpeechletResponse("What season is it?", false)))
               break;
            case "seasons":
                //context.succeed(generateResponse(buildSpeechletResponse("Those colors do not go well in this", false)))
                //break;
                // console.log("test");
                // console.log(colorsplit);
                let s=event.request.intent.slots.season.value;
                
                    if(colormatch(colorf,colorb,s)){
                        if (seasondict[s].indexOf(colorf) > -1 || seasondict[s].indexOf(colorb) > -1){
                        context.succeed(generateResponse(buildSpeechletResponse("Those colors do not go well in this "+s+" season. But "+suggest(s)+" might look better on you!", true)))
            //  console.log('Those colors dont work well in <season>');
                        }
                else{
                  // console.log('Good Color Combo!');
                  context.succeed(generateResponse(buildSpeechletResponse("I love your style", true)))
                  }
                    
             }
              else{
              //console.log(colormatch(colorsplit[0]),colorsplit[1]);
                  context.succeed(generateResponse(buildSpeechletResponse("Sorry you do not look good!", true)));
              }
              break;
       }
   break;
   }
}
buildSpeechletResponse = (outputText, shouldEndSession) => {
   return {
       outputSpeech: {
           type: "PlainText",
           text: outputText
           },
       shouldEndSession: shouldEndSession
   }
}
generateResponse = (speechletResponse) => {
   return {
       version: "1.0",
       response: speechletResponse
   }
}

