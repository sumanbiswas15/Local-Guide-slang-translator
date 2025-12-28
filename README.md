# 🗺️ The Local Guide - Bengali Slang Translator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Jest](https://img.shields.io/badge/Jest-323330?style=flat&logo=Jest&logoColor=white)](https://jestjs.io/)

> **Kiro - The Local Dada** is your AI-powered guide to West Bengal's rich slang culture, dialects, and regional nuances. Built with cultural intelligence and safety-first approach.

## 🌟 Features

- **🎯 Comprehensive Lexicon**: 40+ Bengali slang terms from Kolkata, Bardhaman, Tarakeswar, and Hooghly
- **🛡️ Safety-First Approach**: 4-tier safety classification system with clear warnings
- **🗺️ Regional Intelligence**: Adapts tone and context based on geographical regions
- **🌐 Multiple Interfaces**: Web UI, Interactive CLI, and Programmatic API
- **🧪 Property-Based Testing**: 16 correctness properties with 120+ automated tests
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

## 🖥️ Web Interface

### Main Interface
![Translation Results](Screenshot%202025-12-28%20170927.png)

### Translation Results
![Web Interface](Screenshot%202025-12-28%20170845.png)

### Safety Warnings
![Safety Warnings](Screenshot%202025-12-28%20171105.png)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bengali-slang-translator.git
cd bengali-slang-translator

# Install dependencies
npm install

# Build the project
npm run build
```

### Usage Options

#### 1. 🌐 Web Interface (Recommended)
```bash
# Open index.html in your browser
# Or use Live Server extension in VS Code
```

#### 2. 💻 Interactive CLI
```bash
npm run interactive
```

#### 3. 🎬 Demo Mode
```bash
npm run demo
```

#### 4. 📚 Programmatic API
```bash
npm start
```

## 🎮 How to Use

### Web Interface Features

- **Direct Translation**: Type any Bengali slang term
- **Quick Actions**: Click pre-loaded terms (lyadh, fatafati, mayya, etc.)
- **Region Selection**: Choose from Kolkata, Bardhaman, Tarakeswar, or Hooghly
- **Search by Meaning**: Find terms by English meaning
- **Random Discovery**: Explore new terms randomly
- **Safe Terms List**: View learning-friendly vocabulary

### Sample Interactions

**Safe Term Example:**
```
Input: lyadh
Output: 
**ল্যাদ**
Dada, "Lyadh" means Proactive Laziness. A lifestyle choice; enjoying doing nothing.
Cultural Context: Core concept of Kolkata urban culture
Safety Level: Safe / Friendly
```

**Dangerous Term Example:**
```
Input: gar
Output:
**গাড়**
⚠️ Dada/Didi, be careful! This is a heavy slang. Do not use this in public.
"Gar" means Asshole. Referring to the anatomy or an annoying person.
Safety Level: Do not use
```

## 🏗️ Architecture

### Core Components

```
src/
├── BengaliSlangTranslator.ts    # Main translator class
├── data/
│   └── lexicon.ts              # Complete slang database
├── services/
│   ├── LexiconService.ts       # Lexicon management
│   ├── TranslationEngine.ts    # Core translation logic
│   ├── RegionalAdapter.ts      # Regional personality adaptation
│   └── SafetyValidator.ts      # Safety classification
├── types/
│   └── index.ts               # TypeScript definitions
└── __tests__/                 # Comprehensive test suite
```

### Safety Classification System

| Level | Description | Usage |
|-------|-------------|-------|
| **Safe / Friendly** | Appropriate for all contexts | ✅ Use freely |
| **Friendly Roast** | Mild teasing, context-dependent | ⚠️ Use with friends |
| **Offensive / Annoying** | Can cause discomfort | ❌ Avoid in public |
| **Do not use** | Highly offensive, causes social harm | 🚫 Academic only |

## 🧪 Testing

The project includes comprehensive testing with property-based testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- **120+ automated tests**
- **16 correctness properties** validated
- **Property-based testing** with fast-check
- **Integration tests** for all components
- **Edge case handling** for safety scenarios

## 🗺️ Regional Intelligence

### Kolkata (The "Lyadh" Zone)
- **Personality**: Witty and relaxed
- **Culture**: Emphasizes "lyadh" and "adda" culture
- **Tone**: Light and conversational

### Bardhaman (Rarh Banga)
- **Personality**: Earthy but respectful
- **Culture**: References Mihidana and Sitabhog
- **Tone**: Direct and authentic

### Tarakeswar & Hooghly (Temple Towns)
- **Personality**: Extra-cautious and respectful
- **Culture**: Sacred temple town atmosphere
- **Tone**: Reverent and careful

## 🛠️ Development

### Scripts

```bash
npm run build        # Compile TypeScript
npm run dev          # Development mode with ts-node
npm run interactive  # Launch interactive CLI
npm run demo         # Run demonstration
npm test            # Run test suite
npm run test:watch  # Watch mode testing
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Reference

### BengaliSlangTranslator Class

```typescript
import { BengaliSlangTranslator } from './dist/index.js';

const translator = new BengaliSlangTranslator();

// Basic translation
const result = translator.translate('lyadh');
console.log(result.formattedResponse);

// Regional translation
const result = translator.translate('mayya', 'bardhaman');

// Search by meaning
const results = translator.searchByMeaning('lazy');

// Get random term
const random = translator.getRandomTerm();

// Get safe terms only
const safeTerms = translator.getSafeTerms();
```

## 🔒 Safety & Ethics

This project is built with a **safety-first approach**:

- **Academic Purpose**: Offensive terms included for educational understanding only
- **Clear Warnings**: Dangerous terms come with explicit warnings
- **Social Responsibility**: Promotes cultural awareness while preventing misuse
- **Regional Sensitivity**: Respects local customs and temple town values

## 📊 Project Stats

- **40+ Bengali slang terms** across 4 regions
- **4-tier safety classification** system
- **16 correctness properties** validated
- **120+ automated tests** with 100% critical path coverage
- **Multi-interface support** (Web, CLI, API)
- **Responsive design** for all devices

## 🤝 Acknowledgments

- **West Bengal Cultural Heritage** for the rich linguistic tradition
- **Bengali Language Community** for preserving regional dialects
- **Property-Based Testing Community** for correctness validation techniques
- **Open Source Contributors** who make projects like this possible

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Documentation**: [Full API Documentation](docs/)
- **Issues**: [Report Issues](https://github.com/your-username/bengali-slang-translator/issues)
- **Discussions**: [Community Discussions](https://github.com/your-username/bengali-slang-translator/discussions)

---

**Made with ❤️ by Kiro - The Local Dada**

*"Dada, ekhane 'Dada' bolun, nahole lok e bhabbe apni tourist!"* 😄
