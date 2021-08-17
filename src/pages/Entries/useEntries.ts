import React, { FormEvent, useContext, useEffect, useState } from 'react';
import AccountApi, { IAccount } from '../../api/AccountApi';
import EntryApi, { IEntry } from '../../api/EntryApi';
import { AppContext, TModal } from '../../contexts/AppProvider';

interface IUseEntries {
  search: string;
  accounts: IAccount[];
  handleSetCurrentModal: (modalName: TModal) => void;
  entries: IEntry[];
  handleSetEntries: (entry: IEntry, edit?: boolean) => void;
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (event: FormEvent) => void;
  editEntry: IEntry | undefined;
  handleEditModal: (entry: IEntry) => void;
  handleDeleteModal: (id: number) => void;
  handleDeleteSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function useEntries(): IUseEntries {
  const { setLoading, done, setModal, handleError, setCurrentModal } =
    useContext(AppContext);

  const [search, setSearch] = useState<string>('');
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [entries, setEntries] = useState<IEntry[]>([]);

  const [editEntry, setEditEntry] = useState<IEntry>();
  const [deleteEntryId, setDeleteEntryId] = useState<number>(0);

  // Load Accounts
  useEffect(() => {
    setLoading(true);
    AccountApi.get().then((response) => {
      if (response.success && response.data)
        setAccounts(response.data.accounts);
      setLoading(false);
    });
  }, [setLoading]);

  // Load Entries
  useEffect(() => {
    setLoading(true);
    EntryApi.get().then((response) => {
      if (response.success && response.data) setEntries(response.data);
      setLoading(false);
    });
  }, [setLoading]);

  const handleSetCurrentModal = (modalName: TModal): void => {
    setModal(true);
    setCurrentModal(modalName);
  };

  const handleSetEntries = (entry: IEntry, edit: boolean = false): void => {
    if (edit) {
      const newEntries = entries.map((newEntry) => {
        if (newEntry.id === entry.id) {
          return entry;
        } else return newEntry;
      });
      setEntries(newEntries);
    } else {
      const newEntries = entries;
      newEntries.unshift(entry);
      setEntries(newEntries);
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setLoading(true);
    EntryApi.get(search).then((response) => {
      if (response.success && response.data) setEntries(response.data);
      setLoading(false);
    });
  };

  const handleEditModal = (entry: IEntry): void => {
    setCurrentModal('edit');
    setModal(true);
    setEditEntry(entry);
  };

  const handleDeleteModal = (id: number): void => {
    setDeleteEntryId(id);
    setCurrentModal('delete');
    setModal(true);
  };

  const handleDeleteSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    setLoading(true);

    EntryApi.destroy(deleteEntryId).then((response) => {
      if (response.success) {
        const newEntries = entries.filter(
          (entry) => entry.id !== deleteEntryId
        );
        setEntries(newEntries);
        setModal(false);
        done();
      } else {
        handleError(response.message);
      }
      setLoading(false);
    });
  };

  return {
    search,
    accounts,
    handleSetCurrentModal,
    entries,
    handleSetEntries,
    handleSearchInputChange,
    handleSearchSubmit,
    editEntry,
    handleEditModal,
    handleDeleteModal,
    handleDeleteSubmit,
  };
}
