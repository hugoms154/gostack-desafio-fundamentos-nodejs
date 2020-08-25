import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    let balanceEnoughToOutcome = 0;
    if (type === 'outcome') {
      balanceEnoughToOutcome =
        this.transactionsRepository.getBalance().total - value;
    }
    if (!title) {
      throw Error('Title field cannot be empty!');
    }
    if (value <= 0 || !value) {
      throw Error('Value field must be higher than 0');
    }
    if (!type) {
      throw Error("Type field must be type 'income' or 'outcome'");
    }
    if (balanceEnoughToOutcome < 0) {
      throw Error('You dont have enough money to this outcome');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
