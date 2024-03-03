Installation Instructions:

Ensure you have Node.js installed on your system. You can download it from Node.js website.
Clone or download the project repository from GitHub.

Usage Instructions:
Navigate to the project directory in your terminal.
Install dependencies by running npm install or yarn install.
Run the application by executing the command npm start or yarn start.
You can also provide input commands directly by editing the inputCommands array in the index.ts file.
View the output summary in the terminal.

Overview of Design Decisions:

Data Types:
We define two TypeScript types: CreditCard and Transaction to represent credit card details and transaction information, respectively.

Credit Card Validation:
Credit card numbers are validated using the Luhn 10 algorithm in the isValidCreditCardNumber function.
The validation logic is encapsulated within this function, allowing easy reuse and maintenance.

Input Processing:
The processInput function parses input commands and updates credit card information accordingly.
It handles commands such as adding new cards, charging amounts, and crediting amounts.

Summary Generation:
The generateSummary function generates a summary of credit card balances.
It sorts the cards alphabetically by name and includes the balance of each card.
If a card number fails validation, it displays an error message instead of the balance.

Example Usage:
An example usage scenario is provided at the end of the index.ts file.
You can modify the inputCommands array to simulate different transactions and see the output summary.

npm init -y
npm install typescript --save-dev
npx tsc --init
run "npx tsc && node index.js" to compile the typescript file into javascript
