import React from 'react';
import PencilSvg from '../../svg/PencilSvg';
import PlusSvg from '../../svg/PlusSvg';
import TrashSvg from '../../svg/TrashSvg';

import { Container } from './styles';
import useAccounts from './useAccounts';

const Accounts: React.FC = () => {
  const {
    accounts,
    accountFormData,
    groups,
    availableSubgroups,
    addModal,
    setAddModal,
    editModal,
    setEditModal,
    handleEditModal,
    handleEditSubmit,
    deleteModal,
    setDeleteModal,
    handleDeleteSubmit,
    handleDeleteModal,
    handleAccountSubmit,
    handleInputChange,
    handleAvailableSubgroups,
    handleAvailableGroups,
  } = useAccounts();

  return (
    <Container className="container">
      <div className="title">
        <h1>Contas</h1>

        <div className="tools">
          <button type="button" onClick={() => setAddModal(true)}>
            <PlusSvg />
          </button>
        </div>
      </div>

      {accounts.map((account) => (
        <ul className="card" key={account.id}>
          <li>
            <strong>Nome:</strong>
            {account.name}
          </li>
          <li>
            <strong>Grupo:</strong>
            {account.group}
          </li>
          <li>
            <strong>Subgrupo:</strong>
            {account.subgroup}
          </li>
          <div className="card-buttons">
            <button type="button" onClick={() => handleEditModal(account)}>
              <PencilSvg />
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={() => handleDeleteModal(account.id)}
            >
              <TrashSvg />
            </button>
          </div>
        </ul>
      ))}

      {addModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Conta</h2>

            <form action="" onSubmit={handleAccountSubmit}>
              <ul>
                <li>
                  <label htmlFor="add-account-name">Nome:</label>
                  <input
                    type="text"
                    id="add-account-name"
                    name="name"
                    value={accountFormData.name}
                    onChange={handleInputChange}
                    required
                  />
                </li>
                <li>
                  <label htmlFor="add-account-group">Grupo:</label>
                  <select
                    value={accountFormData.group_id}
                    onChange={handleAvailableSubgroups}
                    id="add-account-group"
                    name="group_id"
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
                  <label htmlFor="add-account-subgroup">Subgrupo:</label>
                  <select
                    value={accountFormData.subgroup_id}
                    onChange={handleAvailableGroups}
                    id="add-account-subgroup"
                    name="subgroup_id"
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
                    onClick={() => setAddModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    Adicionar
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      )}

      {editModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Conta</h2>

            <form action="" onSubmit={handleEditSubmit}>
              <ul>
                <li>
                  <label htmlFor="edit-account-name">Nome:</label>
                  <input
                    type="text"
                    id="edit-account-name"
                    name="name"
                    value={accountFormData.name}
                    onChange={handleInputChange}
                    required
                  />
                </li>
                <li>
                  <label htmlFor="edit-account-group">Grupo:</label>
                  <select
                    value={accountFormData.group_id}
                    onChange={handleAvailableSubgroups}
                    id="edit-account-group"
                    name="group_id"
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
                  <label htmlFor="edit-account-subgroup">Subgrupo:</label>
                  <select
                    value={accountFormData.subgroup_id}
                    onChange={handleAvailableGroups}
                    id="edit-account-subgroup"
                    name="subgroup_id"
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
                    onClick={() => setEditModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    Editar
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Excluir Conta</h2>

            <form action="" onSubmit={handleDeleteSubmit}>
              <ul>
                <li className="center">Tem certeza que deseja excluir?</li>
                <li>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => setDeleteModal(false)}
                  >
                    Não
                  </button>
                  <button type="submit" className="btn-primary">
                    Sim
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Accounts;
