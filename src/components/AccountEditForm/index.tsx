import React, { useContext, useEffect, useState } from 'react';
import { IAccountBody } from '../../api/AccountApi';
import { IGroup } from '../../api/GroupApi';
import { ISubgroup } from '../../api/SubgroupApi';
import { AppContext } from '../../contexts/AppProvider';

interface IProps {
  groups: IGroup[];
  subgroups: ISubgroup[];
  account: IAccountBody;
  handleEditSubmit: (data: IAccountBody) => void;
}

const AccountEditForm: React.FC<IProps> = ({
  groups,
  subgroups,
  account,
  handleEditSubmit,
}) => {
  const { setModal } = useContext(AppContext);
  const [data, setData] = useState<IAccountBody>({
    id: 0,
    name: '',
    group_id: '',
    subgroup_id: '',
  });

  useEffect(() => {
    setData(account);
    const availables = subgroups.filter(
      (subgroup) => subgroup.group_id === account.group_id
    );
    setAvailableSubgroups(availables);
  }, [account, subgroups]);

  const [availableSubgroups, setAvailableSubgroups] =
    useState<ISubgroup[]>(subgroups);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleAvailableSubgroups = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value) {
      const group: number = parseInt(event.target.value);
      const availables = subgroups.filter(
        (subgroup) => subgroup.group_id === group
      );
      setAvailableSubgroups(availables);
      setData((prev) => ({
        ...prev,
        group_id: group,
        subgroup_id: '',
      }));
    } else {
      setAvailableSubgroups([]);
      setData((prev) => ({
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

      setData((prev) => ({
        ...prev,
        subgroup_id: subgroup,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        subgroup_id: 0,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleEditSubmit(data);
  };

  return (
    <>
      <h2>Editar Conta</h2>

      <form action="" onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={handleInputChange}
              required
            />
          </li>
          <li>
            <label htmlFor="group">Grupo:</label>
            <select
              value={data.group_id}
              onChange={handleAvailableSubgroups}
              id="group"
              required
            >
              <option value=""></option>
              {groups.map((group) => (
                <option value={group.id} key={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="subgroup">Subgrupo:</label>
            <select
              value={data.subgroup_id}
              onChange={handleAvailableGroups}
              id="subgroup"
              required
            >
              <option value=""></option>
              {availableSubgroups.map((subgroup) => (
                <option value={subgroup.id} key={subgroup.id}>
                  {subgroup.name}
                </option>
              ))}
            </select>
          </li>
          <li>
            <button
              type="button"
              className="btn-danger"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Editar
            </button>
          </li>
        </ul>
      </form>
    </>
  );
};

export default AccountEditForm;
