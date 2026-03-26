document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('scanBtn');
    const subBtn = document.getElementById('subBtn');
    const resultsArea = document.getElementById('resultsArea');
    
    // Checkbox references
    const soyCheck = document.getElementById('SoyCheckbox');
    const dairyCheck = document.getElementById('DairyCheckbox');
    const nutsCheck = document.getElementById('NutsCheckbox');
    const kashrutCheck = document.getElementById('KashrutCheckbox');
    const vegCheck = document.getElementById('VegCheckbox');

    const capitalize = (str) => {
        if (!str) return "";
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    // LOAD saved settings (added kashrut and veg)
    chrome.storage.local.get(['soy', 'dairy', 'nuts', 'kashrut', 'veg'], (result) => {
        if (result.soy) soyCheck.checked = result.soy;
        if (result.dairy) dairyCheck.checked = result.dairy;
        if (result.nuts) nutsCheck.checked = result.nuts;
        if (result.kashrut) kashrutCheck.checked = result.kashrut;
        if (result.veg) vegCheck.checked = result.veg;
    });

    // SAVE settings
    const saveSettings = () => {
        chrome.storage.local.set({
            soy: soyCheck.checked,
            dairy: dairyCheck.checked,
            nuts: nutsCheck.checked,
            kashrut: kashrutCheck.checked,
            veg: vegCheck.checked
        });
        resultsArea.innerHTML = "";
    };

    [soyCheck, dairyCheck, nutsCheck, kashrutCheck, vegCheck].forEach(el => el.addEventListener('change', saveSettings));

    // Build the master list (added kashrut and veg logic)
    const getActiveAllergenList = () => {
        let list = [];
        if (soyCheck.checked) list = list.concat(ALLERGEN_DATA.soy);
        if (dairyCheck.checked) list = list.concat(ALLERGEN_DATA.dairy);
        if (nutsCheck.checked) list = list.concat(ALLERGEN_DATA.nuts);
        if (kashrutCheck.checked) list = list.concat(ALLERGEN_DATA.kashrut);
        if (vegCheck.checked) list = list.concat(ALLERGEN_DATA.vegetarian);
        return list;
    };

    const performScan = async (isSubCheck) => {
        const list = getActiveAllergenList();
        if (list.length === 0) {
            resultsArea.innerHTML = "<div style='color: #ffaa00;'>Please enable a category first.</div>";
            return;
        }

        resultsArea.innerHTML = "<div style='color: #888;'>Scanning page...</div>";
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.tabs.sendMessage(tab.id, { action: "checkWords", list: list }, (response) => {
            if (chrome.runtime.lastError) {
                resultsArea.innerHTML = "<div style='color: #ff4d4d;'>Error: Refresh the website.</div>";
                return;
            }

            if (response && response.found) {
                let html = isSubCheck 
                    ? "<b style='color: #00a2ff;'>Substitutions:</b><br>" 
                    : "<b style='color: #ff4d4d;'>Warning - Items Found:</b><br>";

                response.matches.forEach(item => {
                    const displayWord = capitalize(item.word);
                    const displaySub = item.sub; 

                    if (isSubCheck) {
                        html += `<div style='margin-top: 8px; font-size: 13px;'>
                                    <span style='color: #eee;'>- ${displayWord}:</span> 
                                    <span style='color: #00a2ff;'>Try ${displaySub}</span>
                                 </div>`;
                    } else {
                        html += `<div style='color: #eee; font-size: 13px;'>- ${displayWord}</div>`;
                    }
                });
                resultsArea.innerHTML = html;
            } else {
                resultsArea.innerHTML = "<div style='color: #4CAF50;'>No restricted items detected.</div>";
            }
        });
    };

    scanBtn.addEventListener('click', () => performScan(false));
    subBtn.addEventListener('click', () => performScan(true));
});
