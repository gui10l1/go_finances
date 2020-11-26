import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import api from '../../services/api';
import Header from '../../components/Header';
import formatValues from '../../utils/formatValue';
import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    api.get('/transactions').then(response => {
      setBalance(response.data.balance);
    });
    api.get('/transactions').then(response => {
      setTransactions(response.data.transactions);
    });
  }, []);

  function convertTimestamp(date: Date): string {
    const dateToString = date.toString();
    const parsedDate = new Date(dateToString);
    return parsedDate.toLocaleDateString('pt-BR');
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              {balance.income !== undefined
                ? formatValues(balance.income)
                : 'Carregando'}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {balance.outcome !== undefined
                ? formatValues(balance.outcome)
                : 'Carregando'}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              {balance.total !== undefined
                ? formatValues(balance.total)
                : 'Carregando'}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 &&
                transactions.map(transaction => {
                  if (transaction.type === 'income') {
                    return (
                      <tr key={transaction.id}>
                        <td className="title">{transaction.title}</td>
                        <td className="income">
                          {formatValues(transaction.value)}
                        </td>
                        <td>{transaction.category.title}</td>
                        <td>{convertTimestamp(transaction.created_at)}</td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={transaction.id}>
                      <td className="title">{transaction.title}</td>
                      <td className="outcome">
                        {`- ${formatValues(transaction.value)}`}
                      </td>
                      <td>{transaction.category.title}</td>
                      <td>{convertTimestamp(transaction.created_at)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
