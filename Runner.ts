import { execSync } from 'child_process';

// Get the tags argument from the command line
const tags = process.argv.slice(2).join(' ');

if (!tags) {
  console.error('No tags provided');
  process.exit(1);
}

// Construct the command to run Cucumber with the provided tags
const command = `npx playwright test -g ${tags}`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error running tests:', error);
  process.exit(1);
}