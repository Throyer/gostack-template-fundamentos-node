import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionForm {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionForm): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (type === "outcome" && value > total) {
      throw new Error("Não é possivel registrar transação. \n Saldo insuficiente.")
    }
    return this.transactionsRepository.create({ title, value, type })
  }
}

export default CreateTransactionService;
