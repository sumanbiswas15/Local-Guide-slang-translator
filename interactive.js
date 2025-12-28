// Interactive CLI for Bengali Slang Translator
const readline = require('readline');
const { BengaliSlangTranslator } = require('./dist/index.js');

const translator = new BengaliSlangTranslator();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🗺️ The Local Guide: Bengali Slang Translator');
console.log('Kiro - The Local Dada is ready to help!');
console.log('Type "help" for commands, "exit" to quit\n');

function askForInput() {
  rl.question('Enter a Bengali slang term or command: ', (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('\nDhonnobad! Come back anytime to learn more Bengali slang!');
      rl.close();
      return;
    }

    if (input.trim() === '') {
      console.log('Dada, please enter something!\n');
      askForInput();
      return;
    }

    if (input.toLowerCase() === 'help') {
      showHelp();
      askForInput();
      return;
    }

    try {
      // Handle different command types
      if (input.startsWith('translate ')) {
        const parts = input.split(' ');
        const term = parts[1];
        const region = parts[2] || 'kolkata';
        const result = translator.translate(term, region);
        console.log('\n' + '─'.repeat(60));
        console.log(result.formattedResponse);
        console.log('─'.repeat(60) + '\n');
      } else if (input.startsWith('search ')) {
        const meaning = input.substring(7);
        const results = translator.searchByMeaning(meaning);
        console.log('\n' + '─'.repeat(60));
        if (results.length > 0) {
          console.log(`Found ${results.length} term(s) matching "${meaning}":\n`);
          results.forEach((result, index) => {
            console.log(`${index + 1}. ${result.formattedResponse}\n`);
          });
        } else {
          console.log(`No terms found matching "${meaning}"`);
        }
        console.log('─'.repeat(60) + '\n');
      } else if (input.toLowerCase() === 'random') {
        const result = translator.getRandomTerm();
        console.log('\n' + '─'.repeat(60));
        console.log(result.formattedResponse);
        console.log('─'.repeat(60) + '\n');
      } else if (input.toLowerCase() === 'safe-terms') {
        const safeTerms = translator.getSafeTerms();
        console.log('\n' + '─'.repeat(60));
        console.log('Safe terms for learning:\n');
        safeTerms.forEach((result, index) => {
          console.log(`${index + 1}. ${result.term} - ${result.meaning}`);
        });
        console.log('─'.repeat(60) + '\n');
      } else {
        // Direct translation
        const result = translator.translate(input);
        console.log('\n' + '─'.repeat(60));
        console.log(result.formattedResponse);
        console.log('─'.repeat(60) + '\n');
      }
    } catch (error) {
      console.log('\n❌ Error:', error.message, '\n');
    }

    askForInput();
  });
}

function showHelp() {
  console.log('\n' + '='.repeat(60));
  console.log('🗺️ The Local Guide: Bengali Slang Translator - Help');
  console.log('='.repeat(60));
  console.log('Available commands:');
  console.log('• translate <term> [region] - Translate with optional region');
  console.log('  Example: translate lyadh kolkata');
  console.log('• search <meaning> - Search for terms by English meaning');
  console.log('  Example: search lazy');
  console.log('• random - Get a random term with explanation');
  console.log('• safe-terms - List safe terms for learning');
  console.log('• help - Show this help message');
  console.log('• exit - Exit the translator');
  console.log('\nYou can also just type a slang term directly:');
  console.log('  Example: lyadh, fatafati, kelane');
  console.log('\nRegions supported: kolkata, bardhaman, tarakeswar, hooghly');
  console.log('='.repeat(60) + '\n');
}

// Show available commands
console.log('Available commands:');
console.log('• translate <term> [region] - Translate with optional region');
console.log('• search <meaning> - Search for terms by English meaning');
console.log('• random - Get a random term with explanation');
console.log('• safe-terms - List safe terms for learning');
console.log('• help - Show detailed help message');
console.log('• exit - Exit the translator\n');

console.log('Quick start: Just type a slang term (e.g., "lyadh", "fatafati")\n');

askForInput();