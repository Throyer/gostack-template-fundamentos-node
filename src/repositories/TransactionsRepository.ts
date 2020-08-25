import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const sum = (a: number, { value: b }: Transaction) => a + b;
    
    const income = this.transactions.filter(({ type }) => type === "income")
      .reduce(sum, 0);

    const outcome = this.transactions.filter(({ type }) => type === "outcome")
      .reduce(sum, 0);

    return {
      income,
      outcome,
      total: (income - outcome)
    }
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
