import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import api from '../../api';
import { AppContext } from '../../AppProvider';
import { IAccount, IAccountRequest, IGroup, ISubroup } from '../../interfaces';

interface IUseAccounts {
  accounts: IAccount[];
  groups: IGroup[];
  accountFormData: IAccountRequest;
  availableSubgroups: ISubroup[];
  addModal: boolean;
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditModal: (account: IAccount) => void;
  handleEditSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteModal: (id: number) => void;
  handleDeleteSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleAccountSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvailableSubgroups: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleAvailableGroups: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function useAccounts(): IUseAccounts {
  const { setLoading, setError, setErrorMessage } = useContext(AppContext);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [subgroups, setSubgroups] = useState<ISubroup[]>([]);
  const [availableSubgroups, setAvailableSubgroups] = useState<ISubroup[]>([]);

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteEntryId, setDeleteEntryId] = useState<number>(0);

  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editEntryId, setEditEntryId] = useState<number>(0);
  const [accountFormData, setAccountFormData] = useState<IAccountRequest>({
    name: '',
    group_id: '',
    subgroup_id: '',
  });

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
      if (response.success) {
        setAccounts(response.data.accounts);
        setGroups(response.data.groups);
        setSubgroups(response.data.subgroups);
        setLoading(false);
      }
    });
  }, [setLoading]);

  const handleAvailableSubgroups = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value) {
      const group: number = parseInt(event.target.value);
      const availables = subgroups.filter(
        (subgroup) => subgroup.group_id === group
      );
      setAvailableSubgroups(availables);
      setAccountFormData((prev) => ({
        ...prev,
        group_id: group,
        subgroup_id: '',
      }));
    } else {
      setAvailableSubgroups([]);
      setAccountFormData((prev) => ({
        ...prev,
        group_id: '',
        subgroup_id: '',
      }));
    }
  };

  const handleAvailableGroups = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value) {
      const subgroup: number = parseInt(event.target.value);

      setAccountFormData((prev) => ({
        ...prev,
        subgroup_id: subgroup,
      }));
    } else {
      setAccountFormData((prev) => ({
        ...prev,
        subgroup_id: '',
      }));
    }
  };

  const handleAccountSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    setLoading(true);

    api.accountStore(accountFormData).then((response) => {
      if (response.success) {
        setAccounts((prev) => [response.data, ...prev]);
        setAddModal(false);
        setAccountFormData({
          name: '',
          group_id: 0,
          subgroup_id: 0,
        });
      } else {
        setError(true);
        setErrorMessage(response.errors);
      }
      setLoading(false);
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAccountFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditModal = (account: IAccount): void => {
    const availables = subgroups.filter(
      (subgroup) => subgroup.group_id === account.group_id
    );
    setAvailableSubgroups(availables);

    setEditEntryId(account.id);
    setAccountFormData({
      name: account.name,
      group_id: account.group_id,
      subgroup_id: account.subgroup_id,
    });
    setEditModal(true);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setLoading(true);

    api.accountUpdate(editEntryId, accountFormData).then((response) => {
      if (response.success) {
        const newAccounts = accounts.map((account) => {
          if (account.id === editEntryId) return response.data;

          return account;
        });
        setAccounts(newAccounts);
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

    api.accountDestroy(deleteEntryId).then((response) => {
      if (response.success) {
        const newAccounts = accounts.filter(
          (account) => account.id !== deleteEntryId
        );
        setAccounts(newAccounts);
        setDeleteModal(false);
      } else {
        setError(true);
        setErrorMessage(
          'Você não pode excluir essa conta! Uma conta só pode ser excluida se não houver lançamentos com ela. Exclua todos os lançamentos que usa essa conta antes.'
        );
      }
      setLoading(false);
    });
  };

  return {
    accounts,
    groups,
    accountFormData,
    availableSubgroups,
    addModal,
    setAddModal,
    editModal,
    setEditModal,
    handleEditModal,
    handleEditSubmit,
    deleteModal,
    setDeleteModal,
    handleDeleteModal,
    handleDeleteSubmit,
    handleAccountSubmit,
    handleInputChange,
    handleAvailableGroups,
    handleAvailableSubgroups,
  };
}
