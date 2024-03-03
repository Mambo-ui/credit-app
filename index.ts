// Define a type for a credit card
type CreditCard = {
    name: string;
    number: string;
    limit: number;
    balance: number;
    isValid: () => boolean;
};

// Define a type for a transaction
type Transaction = {
    type: 'Add' | 'Charge' | 'Credit';
    name: string;
    amount?: number;
    cardNumber?: string;
}

// Function to validate credit card number using Luhn 10 algorithm
function isValidCreditCardNumber(cardNumber: string): boolean {
    const num = cardNumber.replace(/\D/g, ''); // Remove non-digit characters
    let sum = 0;
    let doubleUp = false;
    
    // Starting from the right, iterate through each digit
    for (let i = num.length - 1; i >= 0; i--) {
        let digit = parseInt(num.charAt(i));

        // Double every second digit
        if (doubleUp) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        // Add the digit to the sum
        sum += digit;

        // Toggle the flag to double the next digit
        doubleUp = !doubleUp;
    }

    // The card is valid if the sum is a multiple of 10
    return sum % 10 === 0;
}

// Define a function to process input commands and update credit card information
function processInput(commands: string[]): CreditCard[] {
    const cards: CreditCard[] = [];

    for (const command of commands) {
        const [action, ...args] = command.split(' ');
        const transactionType = action as 'Add' | 'Charge' | 'Credit';
        const transaction: Transaction = { type: transactionType, name: args[0] };

        switch (transactionType) {
            case 'Add':
                const [name, number, limitStr] = args;
                const limit = parseInt(limitStr.slice(1));
                const newCard: CreditCard = { 
                    name, 
                    number, 
                    limit, 
                    balance: 0, 
                    isValid: () => isValidCreditCardNumber(number)
                };
                
                cards.push(newCard);
                
                break;
            case 'Charge':
                const [chargeName, chargeAmountStr] = args;
                const chargeAmount = parseInt(chargeAmountStr.slice(1));
                const chargeCard = cards.find(card => card.name === chargeName);
                if (chargeCard) {
                    chargeCard.balance += chargeAmount;
                }
                break;
            case 'Credit':
                const [creditName, creditAmountStr] = args;
                const creditAmount = parseInt(creditAmountStr.slice(1));
                const creditCard = cards.find(card => card.name === creditName);
                if (creditCard) {
                    creditCard.balance -= creditAmount;
                }
                break;
        }
    }

    return cards;
}

// Define a function to generate a summary of credit card balances
function generateSummary(cards: CreditCard[]): string {
    // Sort the cards alphabetically by name
    cards.sort((a, b) => a.name.localeCompare(b.name));

    // Initialize an array to store the summary strings for each card
    const summaryStrings: string[] = [];

    // Iterate over each card and generate the summary string
    for (const card of cards) {
        // Check if the card number is valid
        const balanceString = card.isValid() ? `$${card.balance}` : 'error';

        // Add the summary string to the array
        summaryStrings.push(`${card.name}: ${balanceString}`);
    }

    // Join the summary strings with newline characters and return
    return summaryStrings.join('\n');
}


// Example usage
const inputCommands = [
    'Add Tom 4111111111111111 $1000',
    'Add Lisa 5454545454545454 $3000',
    'Add Quincy 1234567890123456 $2000',
    'Charge Tom $500',
    'Charge Tom $800',
    'Charge Lisa $7',
    'Charge John 100',
    'Credit Lisa $100',
    'Credit Quincy $200',
];

const creditCards = processInput(inputCommands);
const summary = generateSummary(creditCards);
console.log(summary);
