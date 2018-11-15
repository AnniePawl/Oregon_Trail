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
