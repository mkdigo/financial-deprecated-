import React, { useContext, useRef, useState, useEffect } from 'react';
import { IAccount } from '../../api/AccountApi';
import EntryApi, { IEntry, IEntryRequest } from '../../api/EntryApi';
import { AppContext } from '../../contexts/AppProvider';
import { makeInteger, numberFormat } from '../../helpers';
import EntryForm from '../EntryForm';

interface IProps {
  handleSetEntries: (entry: IEntry, edit?: boolean) => void;
  accounts: IAccount[];
  entry: IEntry;
}

const EntryEdit: React.FC<IProps> = ({ handleSetEntries, accounts, entry }) => {
  const { setLoading, done, handleError, setModal } = useContext(AppContext);
  const inputDateRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const [entryFormData, setEntryFormData] = useState<IEntryRequest>({
    id: entry.id,
    debit_id: entry.debit_id,
    credit_id: entry.credit_id,
    inclusion: entry.inclusion,
    note: entry.note,
    value: numberFormat(entry.value),
  });

  useEffect(() => {
    setEntryFormData({
      id: entry.id,
      debit_id: entry.debit_id,
      credit_id: entry.credit_id,
      inclusion: entry.inclusion,
      note: entry.note,
      value: numberFormat(entry.value),
    });
  }, [entry]);

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
    const data = { ...entryFormData };
    if (data.id) {
      setLoading(true);

      data.value = makeInteger(data.value);

      EntryApi.update(data.id, data).then((response) => {
        if (response.success && response.data) {
          inputDateRef.current?.focus();

          setModal(false);
          handleSetEntries(response.data, true);

          done();
        } else {
          handleError(response.message);
        }
        setLoading(false);
      });
    }
  };

  return (
    <>
      <h2>Editar Lançamento</h2>

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

export default EntryEdit;
