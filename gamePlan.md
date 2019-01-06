## Game Plan
- Create MVP in console (will upgrade later)
- HTML, CSS, JS files
- Command expedition in which you have a number of:
    - people
    - food
    - money
    - oxen
    - firepower
- Display on Screen

Random Events
Trigger random events in updateGame
- Caravan stat change
- Shop
- Attacks

## JS Files
### Game.js
- Contains necessary constants
- Contains **Game Object** that takes care of starting, pausing and resuming
### Caravan.js
- Contains **Caravan Object** (OregonH.Caravan) w/ init method
- Caravan object keeps caravan properties and takes care of things like weight and distance calculations and food consumption.
### UI.js
-Contains **UI Object** which takes are of showing things to user
### Event.js
- Represents logic behind random event generation

# Challenges
- Challenge 1: Updated to Template Strings
Read through your code and examine each String. If there is some concatenation involved with the String change it into a template string.

- Challenge 2: Update var to const or let. Read through each file and examine each variable declaration. Ask yourself if this variable should be a const, let, or var

- Challenge 4: Modifying Events.
    - Read the list of events in Events.js
    - Add a new event to the list.
    - Copying an existing event and changing the property values - is probably the easiest thing to do.
    - Play the game until you see your new event appear.
    - Make a new event for each of the three types of events: - STAT-CHANGE, SHOP, ATTACK
    - For SHOP events modify the products Array.

## Stretch Challenge:
- Work with the style sheet. Use the inspector and find some things that need adjustment. Make adjustments in the inspector. Use the inspector to find the location of these styles in the styles sheet and then make the changes.
- The game has many messages that appear. These tell the story. All of the events are in 'Events.js' in OregonH.Event.eventTypes. This array holds objects describing events that can occur. Look at the events closely. Copy an event and change some properties. Test the game and see your event.
- The game displays two special events where the player has to answer a question in a dialog box. These are Attacks, and Shops. The dialog box could use some work on the style. These boxes are div#shop and div#attack.
- div#attack a couple buttons. You can style style these and the text in div#attack-description
- div#shop is more complicated. There is a button you can style. The products you can buy are generated dynamically so you can't see them in the source code. To get an idea of what you can work with play the game until the shop appears, then inspect the shop div. Inside div#prods you'll see a list of div.product. Style this class. It's probably easiest to play with styles in the inspector so you can see how it appears in the browser.
- The layout is very rudimentary. There are 5 boxes these are all inside div#journey. They are:
    - div#stats-area
    - div#update-area
    - div#shop
    - div#attack
    - div#progress-area
- div#shop and div#attack only appear when needed by the game. Use Grid or Flex Box to arrange these elements. Currently all of these use Float. You'll want to remove float from their style rules.
- div#stats-area displays the Caravan stats. Styles would help make this more interesting and easier to read. This element is made of a collection of div.stat. Each of these divs contains some text that acts as a label and a span.stat-value. Currently the label and value look the same. Giving the label and value different font styles would create information hierarchy.
- If you changed the layout and made it look good on the desktop, add some styles to make it work on mobile. Mobile games are popular!
- Add a background image.
