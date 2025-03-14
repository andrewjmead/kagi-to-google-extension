function redirectToGoogle() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const activeTab = tabs[0];
        const url = new URL(activeTab.url)
        const query = url.searchParams.get("q")
        const isKagi = url.host === "kagi.com" && url.pathname === "/search"

        if (!isKagi) {
            return
        }

        const googleSearchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query)

        chrome.tabs.update(activeTab.id, {url: googleSearchUrl})
    })
}

chrome.commands.onCommand.addListener((command) => {
    if (command === "redirect_to_google") {
        redirectToGoogle()
    }
})