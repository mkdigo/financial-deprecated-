import React, { useContext, useEffect, useState } from 'react';
import AccountApi, { IAccount } from '../../api/AccountApi';
import EntryApi, { IEntryRequest } from '../../api/EntryApi';
import { AppContext } from '../../contexts/AppProvider';
import { makeInteger, numberFormat, today } from '../../helpers';
import PlusSvg from '../../svg/PlusSvg';

import { Container, Form } from './styles';

const Expenses: React.FC = () => {
  const [entryToggle, setEntryToggle] = useState<boolean>(false);
  const [debitAccounts, setDebitAccounts] = useState<IAccount[]>([]);
  const [creditAccounts, setCreditAccounts] = useState<IAccount[]>([]);
  const [entryFormData, setEntryFormData] = useState<IEntryRequest>({
    inclusion: today(),
    debit_id: 0,
    credit_id: 0,
    value: '',
    note: '',
  });

  const { setLoading, handleError, done } = useContext(AppContext);

  useEffect(() => {
    AccountApi.get().then((response) => {
      if (response.success && response.data) {
        const debits = response.data.filter(
          (account) => account.subgroup_id === 8
        );
        setDebitAccounts(debits);
        const credits = response.data.filter(
          (account) => account.subgroup_id === 1
        );
        setCreditAccounts(credits);
      }
    });
  }, []);

  const resetFormData = (): void => {
    setEntryFormData({
      inclusion: entryFormData.inclusion,
      debit_id: 0,
      credit_id: 0,
      value: '',
      note: '',
    });
  };

  const handleEntrySubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(entryFormData);
    setLoading(true);
    resetFormData();

    EntryApi.store(entryFormData).then((response) => {
      if (response.success) {
        // setAccounts((prev) => [response.data, ...prev]);
        resetFormData();
        done();
      } else {
        handleError(response.message);
      }
      setLoading(false);
    });
  };

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    let value: string = event.target.value;

    if (event.target.dataset.maskNumber) {
      value = makeInteger(event.target.value);
      if (value !== '') {
        value = numberFormat(parseInt(value));
      }
    }

    setEntryFormData((prev) => ({
      ...prev,
      [event.target.name]: value,
    }));
  };

  return (
    <Container className="container">
      <div className="title">
        <h1>Despesas</h1>

        <div className="tools">
          <button type="button" onClick={() => setEntryToggle(!entryToggle)}>
            <PlusSvg />
          </button>
        </div>
      </div>

      <Form
        style={{ height: entryToggle ? 470 : 0 }}
        onSubmit={handleEntrySubmit}
      >
        <h2>Lançamento</h2>

        <li>
          <label htmlFor="date">Data</label>
          <input
            type="date"
            name="inclusion"
            id="inclusion"
            value={entryFormData.inclusion}
            onChange={handleInputChange}
            required
          />
        </li>
        <li>
          <label htmlFor="debit_id">Conta</label>
          <select
            name="debit_id"
            id="debit_id"
            value={entryFormData.debit_id}
            onChange={handleInputChange}
            required
          >
            <option value=""></option>
            {debitAccounts.map((account) => (
              <option value={account.id} key={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </li>
        <li>
          <label htmlFor="credit_id">Forma de pagamento</label>
          <select
            name="credit_id"
            id="credit_id"
            value={entryFormData.credit_id}
            onChange={handleInputChange}
            required
          >
            <option value=""></option>
            {creditAccounts.map((account) => (
              <option value={account.id} key={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </li>
        <li>
          <label htmlFor="value">Valor</label>
          <input
            type="text"
            name="value"
            data-mask-number
            value={entryFormData.value}
            onChange={handleInputChange}
            required
          />
        </li>
        <li>
          <label htmlFor="note">Notas</label>
          <textarea
            name="note"
            id="note"
            value={entryFormData.note}
            onChange={handleInputChange}
          />
        </li>
        <li>
          <button type="submit" className="btn-primary">
            Adicionar
          </button>
        </li>
      </Form>

      {/* <section className="data">
        {entries.map((entry) => (
          <ul className="card" key={entry.id}>
            <li>
              <strong>Data:</strong>
              {entry.date}
            </li>
            <li>
              <strong>Débito:</strong>
              {entry.debit_name}
            </li>
            <li>
              <strong>Crédito:</strong>
              {entry.credit_name}
            </li>
            <li>
              <strong>Valor:</strong>
              {numberFormat(entry.value)}
            </li>
            <li>
              <strong>Notas:</strong>
              <span style={{ whiteSpace: 'pre' }}>{entry.note}</span>
            </li>
            <div className="card-buttons">
              <button type="button" onClick={() => handleEditModal(entry)}>
                <PencilSvg />
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={() => handleDeleteModal(entry.id)}
              >
                <TrashSvg />
              </button>
            </div>
          </ul>
        ))}
      </section> */}
    </Container>
  );
};

export default Expenses;
