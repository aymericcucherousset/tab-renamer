# Tab Renamer

A Chrome extension to rename your browser tabs with custom titles, making it easier to organize and identify your open tabs.

## Features

- Rename any tab with a custom title using a keyboard shortcut (F2 or Alt+R)
- Titles persist for the tab session
- Works on most websites, including those that aggressively change their titles
- Simple and lightweight

## Usage

1. **Install the extension** in your browser (see Development below for local install).
2. **Rename a tab:**
   - Press **F2** or **Alt+R** while on the tab you want to rename.
   - Enter your custom title in the prompt.
   - The tab's title will update immediately.
3. The custom title will remain until the tab is closed or you rename it again.

## Keyboard Shortcuts

- **F2**: Rename the current tab
- **Alt+R**: Rename the current tab (configurable in manifest)

## Development

1. Clone this repository:
   ```sh
   git clone https://github.com/aymericcucherousset/tab-renamer.git
   cd tab-renamer
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Check lint:
   ```sh
   npm run lint
   ```
4. Build the extension:
   ```sh
   npm run build
   ```
5. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## Project Structure

- `src/background.ts` — Background script for handling tab and storage logic
- `src/content.ts` — Content script injected into tabs to override titles
- `public/manifest.json` — Chrome extension manifest
