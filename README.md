# JSON Diff Viewer 🔍

A beautiful, fast, and intuitive web application for comparing JSON objects and visualizing differences. Perfect for debugging API changes, comparing configurations, or analyzing data transformations.

![JSON Diff Viewer](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)

## ✨ Features

- **Visual Diff Highlighting** - Clearly see what's added, removed, or modified
- **Side-by-Side Comparison** - Compare two JSON objects simultaneously
- **File Upload Support** - Upload JSON files directly from your computer
- **Sample Library** - Pre-loaded examples showing different use cases
- **Real-time Validation** - Instant feedback on JSON syntax errors
- **Format & Beautify** - Auto-format JSON with proper indentation
- **Swap Functionality** - Quickly swap left and right JSON inputs
- **100% Client-Side** - No data sent to servers, completely private
- **Zero Database** - Pure static site, blazing fast
- **Beautiful UI** - Modern, responsive design with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ViswanathanStartup/JsonDiffViewer.git
cd JsonDiffViewer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

The easiest way to deploy this app is using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ViswanathanStartup/JsonDiffViewer)

Or manually:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

## 💡 Use Cases

- **API Debugging** - Compare API responses before/after changes
- **Configuration Management** - Diff config files across environments
- **Data Migration** - Verify data transformations
- **Code Reviews** - Compare JSON data structures
- **Testing** - Validate expected vs actual JSON outputs

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready
- **No Backend**: Pure static generation

## 📝 How to Use

### Option 1: Paste JSON
1. **Paste JSON** - Enter or paste your JSON objects into the two text areas
2. **Format** - Click "Format" to beautify your JSON
3. **Compare** - Click "Compare JSONs" to see the differences

### Option 2: Upload Files
1. **Upload** - Click the "📤 Upload" button above each text area
2. **Select File** - Choose a JSON file from your computer (.json files only)
3. **Compare** - Click "Compare JSONs" to see the differences

### Option 3: Try Samples
1. **Load Sample** - Click "📂 Load Sample" and choose from pre-loaded examples:
   - **User Profile Update** - Personal info changes
   - **Config: Dev → Prod** - Environment configurations
   - **API Response: v1 → v2** - API versioning changes
   - **Array Modifications** - Array element changes
2. **Compare** - Click "Compare JSONs" to see the differences

### Additional Features
- **Swap** - Use the "⇄ Swap" button to reverse the comparison direction
- **Reset All** - Clear everything and start fresh
- **Analyze** - Review added (green), removed (red), and modified (yellow) values

## 🎨 Key Features Explained

### Diff Types

- 🟢 **Added** - Fields present in JSON 2 but not in JSON 1
- 🔴 **Removed** - Fields present in JSON 1 but not in JSON 2
- 🟡 **Modified** - Fields with different values between JSON 1 and JSON 2

### Smart Comparison

- Handles nested objects and arrays
- Deep comparison of complex structures
- Path-based diff tracking (e.g., `user.address.city`)
- Type-aware comparison

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using Next.js and Tailwind CSS
- Designed for developers, by developers

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This tool runs entirely in your browser. No JSON data is ever sent to any server or stored anywhere. Your data remains completely private and secure.
A little tool to check the api responses
