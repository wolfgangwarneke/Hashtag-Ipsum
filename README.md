# Hashtag Ipsum

#### the Ultimate Ipsum Suite, June 21st 2016

#### By Patrick Lipscomb, George Olson, Sky Rousse, Wolfgang Warneke

## Description
This program is an Ipsum text generator that has several pre-built themes. There is functionality to create your own theme and save it, along with a theme color and picture. This information will be stored as a cookie in your browser so you can revisit it later.

## Specifications
### Primary Specifications
| Behavior        | Input           | Outcome  |
| ------------- |:-------------:| -----:|
| user selects from list of ipsum themes | selection made from menu| visual and instructional content will be updated to reflect theme chosen |
| user generate one random word from selected theme | click "Word or Phrase" button | a random word or phrase is displayed |  
| user selects one or more paragraphs for output| click the "Generate" button | number of paragraphs that were chosen are output with themed ipsum |
| user resubmits without refreshing the page | click the "Generate" button  | initial output is cleared and output updates with new random Ipsum |
| paragraphs include text quantity variance | user selects number of paragraphs for output and hits "Generate" button | outputted Ipsum has character length variance |
| paragraphs include punctuation and capitalization | user selects number of paragraphs for output and hits "Generate" button  | outputted Ipsum adds capitalization after periods and random commas |
| paragraphs include small connector words [and, or, what, the] | user selects number of paragraphs for output and hits "Generate" button  | outputted Ipsum includes various connector words with condition that they don't appear before periods |

### User Generator Specifications
| Behavior        | Input           | Outcome  |
| ------------- |:-------------:| -----:|
| user inputs initial text [word or phrase]| click the "Add" button  | inputted text is displayed in a staging area |
| user inputs additional text [word or phrase]| click the "Add" button  | inputted text is displayed in a staging area by previous inputs|
| user names & saves custom theme [using inputted text] | click "Create Theme" button | newly created theme shows as a new option in saved themes |  
| user themes are stored locally if cookies are enabled | inputted themes | theme content is inputted into cookie using JSON |
| user can edit previously stored themes| user selects theme and makes edits | theme content is updated as reflected in the staging area |

## Setup/Installation Requirements

* Clone from github here: https://github.com/wolfgangwarneke/Hashtag-Ipsum
* Or visit gh-pages: http://wolfgangwarneke.github.io/Hashtag-Ipsum

## Known Bugs
No known bugs.

## Support and contact details
You can reach us via email: skyrousse@gmail.com | Patrick74lipscomb@gmail.com | georgeolson92@gmail.com | wolfgang.warneke@gmail.com

## Technologies Used
JQuery, CSS, HTML, Javascript

### License
MIT

Copyright (c) 2016 **_(Patrick Lipscomb, Sky Rousse, George Olson, Wolfgang Warneke)_**
