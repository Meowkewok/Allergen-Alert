// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkWords") {
        // 1. Cleanup: Remove old highlights to avoid "double-wrapping"
        document.querySelectorAll('.allergen-highlight').forEach(el => {
            el.replaceWith(document.createTextNode(el.textContent));
        });
        document.body.normalize(); // Merges split text nodes back together

        const foundMatches = [];
        const list = request.list;

        // 2. Recursive function to find and wrap text
        function walkAndHighlight(node) {
            // Only process text nodes
            if (node.nodeType === Node.TEXT_NODE) {
                let text = node.nodeValue;
                let matchFound = false;

                // Sort list by length (descending) to match "soy sauce" before "soy"
                const sortedList = [...list].sort((a, b) => b.word.length - a.word.length);

                for (const item of sortedList) {
                    const escaped = item.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`\\b(${escaped})\\b`, 'gi');
                    
                    if (regex.test(text)) {
                        const span = document.createElement('span');
                        span.className = 'allergen-highlight';
                        // Style directly for visibility
                        span.style.backgroundColor = '#ff4d4d';
                        span.style.color = 'white';
                        span.style.fontWeight = 'bold';
                        span.style.padding = '0 2px';
                        span.style.borderRadius = '3px';
                        span.textContent = text.match(regex)[0]; 

                        // Split the text node and insert the span
                        const match = regex.exec(text);
                        const partBefore = text.slice(0, match.index);
                        const partAfter = text.slice(match.index + match[0].length);

                        const beforeNode = document.createTextNode(partBefore);
                        const afterNode = document.createTextNode(partAfter);

                        node.replaceWith(beforeNode, span, afterNode);
                        
                        if (!foundMatches.some(m => m.word.toLowerCase() === item.word.toLowerCase())) {
                            foundMatches.push(item);
                        }
                        
                        // Continue walking from the remaining text
                        walkAndHighlight(afterNode);
                        matchFound = true;
                        break; 
                    }
                }
            } else if (node.nodeType === Node.ELEMENT_NODE && 
                       !['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'].includes(node.tagName)) {
                // Dig into children, but ignore code/input areas
                Array.from(node.childNodes).forEach(walkAndHighlight);
            }
        }

        walkAndHighlight(document.body);

        sendResponse({ 
            found: foundMatches.length > 0, 
            matches: foundMatches 
        });
    }
    return true; 
});
