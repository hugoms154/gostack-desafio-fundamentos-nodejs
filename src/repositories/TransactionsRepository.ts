import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
    // fakes.forEach(fake => this.transactions.push(fake));
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const incomes: number[] = [];
    let income = 0;
    const outcomes: number[] = [];
    let outcome = 0;

    this.transactions.forEach(({ type, value }) => {
      return type === 'income' ? incomes.push(value) : outcomes.push(value);
    });

    if (incomes.length > 0) {
      income = incomes.reduce((first, second) => {
        const total: number = first + second;
        return total;
      });
    }
    if (outcomes.length > 0) {
      outcome = outcomes.reduce((first, second) => {
        const total: number = first + second;
        return total;
      });
    }

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
