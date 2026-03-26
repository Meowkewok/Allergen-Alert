// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkWords") {
        const pageText = document.body.innerText.toLowerCase();
        const matches = request.list.filter(item => {
            const regex = new RegExp(`\\b${item.word.toLowerCase()}\\b`, 'i');
            return regex.test(pageText);
        });
        sendResponse({ found: matches.length > 0, matches: matches });
    }
    return true; 
});
