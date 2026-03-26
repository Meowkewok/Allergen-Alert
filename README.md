# Allergen Alert! 🛡️

A lightweight Chrome Extension designed to scan webpages for specific allergens and dietary restrictions, providing safe substitutions in real-time.

## Features
- **Smart Scanning:** Detects hidden ingredients for Soy, Dairy, and Nuts.
- **Dietary Modes:** Includes specialized filters for **Kashrut** and **Vegetarian** restrictions.
- **Smart Subs:** Don't just find allergens—get specific substitution advice (e.g., Soy Sauce → Coconut Aminos).
- **Persistent Settings:** Remembers your enabled allergens even after closing the browser.
- **Privacy First:** Runs locally on your browser without sending data to external servers.

## Installation (Developer Mode)
Since this extension is in development, follow these steps to load it into Chrome:

1. **Download/Clone** this repository to a folder on your computer.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click the **Load unpacked** button.
5. Select the folder containing the extension files.
6. The **Allergen Alert** icon should now appear in your extensions toolbar!

## How to Use
1. Click the extension icon in your Chrome toolbar.
2. Select the allergens or dietary restrictions you wish to monitor.
3. Click **Check for Allergens** to see a list of flagged ingredients on the current page.
4. Click **Check Substitutes** to see recommended alternatives for the flagged items.
5. *Note: Always refresh a webpage after installing or updating the extension for the scanner to work.*

## Project Structure
- `manifest.json`: Extension configuration and permissions.
- `popup.html`: The blue-themed user interface.
- `style.css`: Custom styling for the dark/blue theme.
- `data.js`: The "database" of allergens and their substitutes.
- `popup.js`: Handles UI logic, storage, and communication.
- `content.js`: The script that reads the text on the webpage.

## Technologies Used
- JavaScript (ES6+)
- HTML5 / CSS3
- Chrome Extension API (Manifest V3)

---
*Disclaimer: This tool is for informational purposes. Always double-check labels for life-threatening allergies.*
