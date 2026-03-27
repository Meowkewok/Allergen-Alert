# Allergen Alert! 🛡️

A powerful, lightweight Chrome Extension designed to scan webpages for specific allergens and dietary restrictions, providing safe substitutions and visual warnings in real-time.

## 🚀 New & Updated Features

- **Visual Highlighting:** Flagged ingredients are now **highlighted directly on the webpage** in bright red, making them impossible to miss in long ingredient lists.
- **Expanded Gluten & Wheat Detection:** Scans for over 40+ sources of gluten, including hidden additives like Malt, Brewer's Yeast, and Seitan.
- **Granular Nut Filtering:** Separate toggles for **Peanuts** vs. **Tree Nuts** (Almonds, Cashews, Walnuts, etc.) to cater to specific sensitivities.
- **Deep Ingredient Database:** Detects hidden soy and dairy derivatives like Lecithin, Casein, and Whey.
- **Dietary & Lifestyle Modes:** Includes specialized filters for **Kashrut** (Kosher) and **Vegetarian** restrictions.
- **Smart Substitutions:** Provides specific, culinary-accurate alternatives (e.g., Soy Sauce → Coconut Aminos; Bacon → Turkey or Coconut Bacon).
- **Persistent Settings:** Uses `chrome.storage` to remember your selected allergens across different browsing sessions.
- **Privacy-Centric:** All scanning happens locally on your machine. No data is sent to external servers.

## 🛠️ Installation (Developer Mode)

Since this extension is in active development, follow these steps to load it into Chrome:

1. **Download or Clone** this repository to a folder on your computer.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click the **Load unpacked** button.
5. Select the folder containing the extension files.
6. The **Allergen Alert** icon will appear in your extensions toolbar! (Click the puzzle piece icon to pin it for easy access).

## 📖 How to Use

1. **Select Your Filters:** Click the extension icon and check the boxes for the allergens you need to avoid.
2. **Scan the Page:** Click **Check for Allergens**. The extension will scan the text and **highlight** every restricted word it finds on the website.
3. **Get Solutions:** Click **Check Substitutes** in the popup to see a categorized list of what was found and what you can use instead.
4. **Important Note:** Always **refresh** a webpage after first installing or updating the extension to ensure the scanner can "see" the page content.

## 📂 Project Structure

- `manifest.json`: Configuration, permissions (storage/activeTab), and script injection rules.
- `popup.html`: The user interface featuring a clean, dark-themed layout.
- `data.js`: The comprehensive "database" containing 100+ allergen terms and their corresponding substitutes.
- `popup.js`: Manages the UI logic, saves user preferences, and coordinates with the content script.
- `content.js`: The "engine" that walks the DOM tree, performs regex matching, and injects visual highlights without breaking the website's layout.
- `style.css`: Custom CSS for the popup interface and allergen warning styles.

## 💻 Technologies Used

- **JavaScript (ES6+):** Utilizing `async/await`, DOM Traversal, and Regex.
- **Chrome Extension API (Manifest V3):** The latest standard for browser security and performance.
- **HTML5 / CSS3:** Responsive, accessible UI design.

---

### ⚠️ Disclaimer
*This tool is for informational purposes only. While our database is extensive, it cannot account for every possible manufacturing variation. Always double-check physical labels for life-threatening allergies.*
