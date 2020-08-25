import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const repository = new TransactionsRepository();
const service = new CreateTransactionService(repository);

transactionRouter.get('/', (request, response) => {
  try {
    return response.json({
      transactions: repository.all(),
      balance: repository.getBalance()
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const transaction = service.execute({ title, value, type });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
