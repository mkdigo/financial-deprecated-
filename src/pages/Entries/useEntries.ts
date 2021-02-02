import React, { useContext, useEffect, useRef, useState } from 'react';
import api from '../../api';
import { AppContext } from '../../AppProvider';
import { makeInteger, numberFormat, today } from '../../helpers';
import { IAccount, IEntry, IEntryRequest } from '../../interfaces';

interface IUseEntries {
  addInputDateRef: React.MutableRefObject<HTMLInputElement | null>;
  addModal: boolean;
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditModal: (entry: IEntry) => void;
  handleEntrySubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleEditEntrySubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  accounts: IAccount[];
  handleInputChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  entries: IEntry[];
  entryFormData: IEntryRequest;
  handleDeleteModal: (id: number) => void;
  handleDeleteSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function useEntries(): IUseEntries {
  const { setLoading, setError, setErrorMessage } = useContext(AppContext);
  const addInputDateRef = useRef<HTMLInputElement>(null);

  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editEntryId, setEditEntryId] = useState<number>(0);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [entryFormData, setEntryFormData] = useState<IEntryRequest>({
    date: today(),
    debit_id: 0,
    credit_id: 0,
    value: '',
    note: '',
  });
  const [deleteEntryId, setDeleteEntryId] = useState<number>(0);

  const handleCloseAllModals = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      setAddModal(false);
      setEditModal(false);
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleCloseAllModals);

    return () => {
      window.removeEventListener('keyup', handleCloseAllModals);
    };
  }, []);

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

    setEntryFormData((prev) => ({
      ...prev,
      [event.target.name]: value,
    }));
  };

  const handleEntrySubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setLoading(true);

    const data = entryFormData;

    data.value = makeInteger(data.value);

    api.entriesStore(data).then((response) => {
      if (response.success) {
        const newEntries = entries;
        newEntries.splice(0, 0, response.data);
        setEntries(newEntries);
        setEntryFormData((prev) => ({
          ...prev,
          debit_id: 0,
          credit_id: 0,
          value: '',
          note: '',
        }));

        addInputDateRef.current?.focus();
      } else {
        setError(true);
        setErrorMessage(response.errors);
      }
      setLoading(false);
    });
  };

  const handleEditModal = (entry: IEntry): void => {
    setEditEntryId(entry.id);
    setEntryFormData({
      date: entry.date,
      debit_id: entry.debit_id,
      credit_id: entry.credit_id,
      value: numberFormat(entry.value),
      note: entry.note ? entry.note : '',
    });
    setEditModal(true);
  };

  const handleEditEntrySubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    setLoading(true);

    const data = entryFormData;

    data.value = makeInteger(data.value);

    api.entriesUpdate(editEntryId, entryFormData).then((response) => {
      if (response.success) {
        const newEntries = entries.map((entry) => {
          if (entry.id === editEntryId) return response.data;
          return entry;
        });

        setEntries(newEntries);
        setEditModal(false);
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
    addInputDateRef,
    addModal,
    setAddModal,
    editModal,
    setEditModal,
    deleteModal,
    setDeleteModal,
    handleEditModal,
    handleEntrySubmit,
    handleEditEntrySubmit,
    accounts,
    handleInputChange,
    entries,
    entryFormData,
    handleDeleteModal,
    handleDeleteSubmit,
  };
}
