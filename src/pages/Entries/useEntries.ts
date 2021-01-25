import React, { useContext, useEffect, useState } from 'react';
import api from '../../api';
import { AppContext } from '../../AppProvider';
import { makeInteger, numberFormat, today } from '../../helpers';
import { IAccount, IEntry, IEntryRequest } from '../../interfaces';

interface IUseEntries {
  addModal: boolean;
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleEntrySubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  accounts: IAccount[];
  handleInputChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  entries: IEntry[];
  addEntryData: IEntryRequest;
  handleDeleteModal: (id: number) => void;
  handleDeleteSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function useEntries(): IUseEntries {
  const { setLoading, setError, setErrorMessage } = useContext(AppContext);

  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [addEntryData, setAddEntryData] = useState<IEntryRequest>({
    date: today(),
    debit_id: '',
    credit_id: '',
    value: '',
    note: '',
  });
  const [deleteEntryId, setDeleteEntryId] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    api.accounts().then((response) => {
      if (response.success) setAccounts(response.data.accounts);
      setLoading(false);
    });
  }, [setLoading]);

  useEffect(() => {
    setLoading(true);
    api.entries().then((response) => {
      if (response.success) setEntries(response.data);
      setLoading(false);
    });
  }, [setLoading]);

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

    setAddEntryData((prev) => ({
      ...prev,
      [event.target.name]: value,
    }));
  };

  const handleEntrySubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setLoading(true);

    const data = addEntryData;

    data.value = makeInteger(data.value);

    api.entriesStore(data).then((response) => {
      if (response.success) {
        const newEntries = entries;
        newEntries.splice(0, 0, response.data);
        setEntries(newEntries);
        setAddModal(false);
        setAddEntryData((prev) => ({
          ...prev,
          debit_id: '',
          credit_id: '',
          value: '',
          note: '',
        }));
      } else {
        setError(true);
        setErrorMessage(response.errors);
      }
      setLoading(false);
    });
  };

  const handleDeleteModal = (id: number): void => {
    setDeleteEntryId(id);
    setDeleteModal(true);
  };

  const handleDeleteSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    setLoading(true);

    api.entriesDestroy(deleteEntryId).then((response) => {
      if (response.success) {
        const newEntries = entries.filter(
          (entry) => entry.id !== deleteEntryId
        );
        setEntries(newEntries);
        setDeleteModal(false);
      } else {
        setError(true);
        setErrorMessage(response.errors);
      }
      setLoading(false);
    });
  };

  return {
    addModal,
    setAddModal,
    deleteModal,
    setDeleteModal,
    handleEntrySubmit,
    accounts,
    handleInputChange,
    entries,
    addEntryData,
    handleDeleteModal,
    handleDeleteSubmit,
  };
}
