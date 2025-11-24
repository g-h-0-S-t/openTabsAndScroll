# Multi-Tab Auto Scroll & Close Bookmarklet

A high-performance JavaScript bookmarklet that automates opening multiple tabs/windows of the current URL, scrolls each to the bottom, and closes them sequentially. Optimized for speed with intelligent retry logic and robust error handling.

## Features

- 🚀 **Super Fast**: 3-8x faster than traditional approaches (~0.5-1.5s per tab)
- 🔄 **Smart Retry Logic**: Attempts scroll every 100ms up to 15 times for reliability
- 📊 **Progress Tracking**: Real-time console logs with `[1/10]`, `[2/10]` etc.
- 🎯 **User-Configurable**: Prompts for number of tabs to open (default: 10)
- 🔐 **Incognito Compatible**: When run in incognito mode, all new tabs remain incognito
- 🛡️ **Robust Error Handling**: Continues processing even if individual operations fail
- ⚡ **Early Exit Optimization**: Stops retrying once scroll succeeds

## Use Cases

- Testing page load behavior across multiple instances
- Triggering analytics or tracking events
- Load testing for same-origin applications
- Automated UI testing scenarios
- Simulating multiple user sessions

## Installation

### Method 1: Bookmarklet (Recommended)

1. Create a new bookmark in your browser
2. Name it whatever you want (e.g., "Multi-Tab Scroll")
3. Paste the script.js code into the URL/Location field.
4. Save the bookmark

### Method 2: Console Execution

1. Open Chrome DevTools (F12 or Cmd+Option+I on Mac)
2. Navigate to the Console tab
3. Paste the script.js and press Enter

## Usage

### Basic Usage

1. Navigate to any webpage
2. Click the bookmarklet or run the script in the console
3. Enter the number of tabs you want to open (default: 10)
4. Click "OK"
5. Watch the magic happen! Monitor progress in the console

### Incognito Mode Usage

1. Open an incognito/private window
2. Navigate to your target URL
3. **Important**: Enable pop-ups for the site (click the popup blocker icon in the address bar)
4. Run the bookmarklet
5. All new tabs will be opened in incognito mode

### Console Output Example

Processing 5 tabs at high speed...
[1/5] Opening: tab_1732459200000_0
[1/5] Focused: tab_1732459200000_0
[1/5] Scrolled: tab_1732459200000_0 (attempt 3)
[1/5] Closed: tab_1732459200000_0
[2/5] Opening: tab_1732459201500_1
[2/5] Focused: tab_1732459201500_1
[2/5] Scrolled: tab_1732459201500_1 (attempt 2)
[2/5] Closed: tab_1732459201500_1
...
✓ All 5 tabs processed!

## How It Works

### Execution Flow

1. **Prompt User**: Asks for the number of tabs to open
2. **Validation**: Ensures input is a valid positive number
3. **Sequential Processing**: For each tab:
   - Opens new tab with unique window name
   - Focuses the tab (triggers browser focus for scroll permissions)
   - Waits for DOM to be ready
   - Attempts to scroll to bottom (retries every 100ms, max 15 attempts)
   - Waits 200ms for lazy-loaded content
   - Closes the tab
   - Waits 100ms before opening next tab

### Technical Details

- **Window Naming**: Uses `Date.now()` + index for unique window names
- **Retry Mechanism**: Checks for `document.body` existence before scroll attempts
- **Timing Strategy**:
  - 100ms between scroll attempts
  - 200ms after successful scroll (for content load)
  - 100ms between tab operations
- **Cross-Origin Handling**: Gracefully fails for cross-origin restrictions

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Edge | ✅ Full | Chromium-based |
| Firefox | ⚠️ Partial | May require additional pop-up permissions |
| Safari | ⚠️ Partial | Stricter pop-up blocking |
| Opera | ✅ Full | Chromium-based |

## Requirements

- Modern browser with ES6+ support (async/await)
- Pop-ups must be allowed for the target site
- Same-origin policy applies (scroll works best on same-origin pages)

## Limitations

### Cross-Origin Restrictions

Scrolling **will not work** on cross-origin pages (e.g., opening Google.com from a different domain) due to browser security policies. The script will:
- Still open the tabs
- Attempt to scroll (will fail silently)
- Close the tabs
- Log failures in console

**Workaround**: Only use on same-origin pages or pages you control.

### Pop-Up Blockers

Most browsers block pop-ups by default. You must:
1. Click the pop-up blocker icon in the address bar
2. Select "Always allow pop-ups from [site]"
3. Reload and try again

### Focus Limitations

Some browsers restrict programmatic focus in background tabs. The script attempts to focus each tab, but results may vary by browser and security settings.

## Troubleshooting

### Tabs Not Opening

**Problem**: No tabs are being created

**Solutions**:
- Check browser pop-up settings
- Look for a pop-up blocker icon in the address bar
- Try temporarily disabling ad blockers

### Scroll Not Working

**Problem**: Tabs open but don't scroll

**Solutions**:
- Verify you're on a same-origin page
- Check console for cross-origin errors
- Try increasing `maxScrollAttempts` in the code

### Tabs Not Closing

**Problem**: Tabs remain open after scrolling

**Solutions**:
- Some sites prevent `window.close()` on script-opened windows
- Check browser security settings
- Manually close remaining tabs

### Script Stops Mid-Execution

**Problem**: Only some tabs are processed

**Solutions**:
- Check console for errors
- Ensure browser isn't rate-limiting window creation
- Try reducing the number of tabs

## Customization

### Adjust Scroll Speed

Change `scrollInterval` value (default: 100ms):

const scrollInterval = 50; // Faster (less reliable)
const scrollInterval = 200; // Slower (more reliable)

### Increase Retry Attempts

Change `maxScrollAttempts` value (default: 15):

const maxScrollAttempts = 30; // More attempts for slower pages

### Change Post-Scroll Delay

Modify the delay after scrolling (default: 200ms):

await new Promise(resolve => setTimeout(resolve, 500)); // Wait longer for content

### Change Default Tab Count

Modify the prompt default value:

const count = parseInt(prompt("How many tabs do you want to open?", "20"), 10); // Default 20 instead of 10

## Security & Privacy

### What This Script Does

- Opens new tabs of the current URL
- Scrolls each tab to the bottom
- Closes each tab automatically
- Logs actions to console

### What This Script Does NOT Do

- Does NOT collect or transmit any data
- Does NOT modify page content
- Does NOT access cookies or local storage
- Does NOT track user behavior
- Does NOT communicate with external servers

### Incognito Mode

When run in incognito mode:
- All opened tabs remain in incognito
- No browsing history is saved
- No cookies persist after closing
- Session is isolated from regular browsing

## FAQ

### Q: Can I use this on any website?

A: You can run it on any website, but scrolling only works reliably on same-origin pages due to browser security restrictions.

### Q: Will this work in incognito mode?

A: Yes! When run in incognito, all new tabs will also be incognito. Make sure to enable pop-ups first.

### Q: Can I cancel mid-execution?

A: Close the original tab or refresh it to stop the script. Already-opened tabs will remain open.

### Q: Does this affect my browsing history?

A: In normal mode: yes, tabs are logged in history. In incognito mode: no history is saved.

### Q: Can I open more than 100 tabs?

A: Technically yes, but browsers may throttle or block excessive tab creation. Recommended limit: 50 tabs.

### Q: Why do I need to focus each tab?

A: Some sites restrict scrolling in unfocused/background tabs. Focusing increases reliability.

## Version History

### v1.0.0 (Current)
- Initial release with smart retry logic
- Progress tracking and detailed logging
- User-configurable tab count
- Optimized timing for 3-8x speed improvement
- Robust error handling

## Contributing

Found a bug or have a feature request? This is a standalone bookmarklet, but feel free to fork and modify for your needs.

## License

MIT License - Free to use, modify, and distribute.

## Author

Created for browser automation and testing workflows.

## Disclaimer

This tool is for legitimate testing and automation purposes only. Use responsibly and ensure you have permission to automate interactions with the target website. The author is not responsible for misuse or any damages resulting from use of this script.

---

**Happy Automating!** 🚀
