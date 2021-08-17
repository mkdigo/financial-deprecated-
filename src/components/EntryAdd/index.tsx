import React, { useContext, useRef, useState } from 'react';
import { IAccount } from '../../api/AccountApi';
import EntryApi, { IEntry, IEntryRequest } from '../../api/EntryApi';
import { AppContext } from '../../contexts/AppProvider';
import { makeInteger, numberFormat, today } from '../../helpers';
import EntryForm from '../EntryForm';

const resetData: IEntryRequest = {
  date: today(),
  debit_id: 0,
  credit_id: 0,
  value: '',
  note: '',
};

interface IProps {
  handleSetEntries: (entry: IEntry) => void;
  accounts: IAccount[];
}

const EntryAdd: React.FC<IProps> = ({ handleSetEntries, accounts }) => {
  const { setLoading, done, handleError } = useContext(AppContext);
  const inputDateRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const [entryFormData, setEntryFormData] = useState<IEntryRequest>(resetData);

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

  const handleEntrySubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setLoading(true);

    const data = { ...entryFormData };
    data.value = makeInteger(data.value);

    EntryApi.store(data).then((response) => {
      if (response.success && response.data) {
        setEntryFormData((prev) => ({
          ...prev,
          debit_id: 0,
          credit_id: 0,
          value: '',
          note: '',
        }));

        inputDateRef.current?.focus();

        handleSetEntries(response.data);

        done();
      } else {
        handleError(response.message);
      }
      setLoading(false);
    });
  };

  return (
    <>
      <h2>Lançamento</h2>

      <EntryForm
        accounts={accounts}
        handleSubmit={handleEntrySubmit}
        handleInputChange={handleInputChange}
        entryFormData={entryFormData}
        inputDateRef={inputDateRef}
      />
    </>
  );
};

export default EntryAdd;
