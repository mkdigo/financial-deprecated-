import React from 'react';
import { numberFormat } from '../../helpers';
import PencilSvg from '../../svg/PencilSvg';
import PlusSvg from '../../svg/PlusSvg';
import TrashSvg from '../../svg/TrashSvg';

import { Container } from './styles';
import useEntries from './useEntries';

const Entries: React.FC = () => {
  const {
    addModal,
    setAddModal,
    deleteModal,
    setDeleteModal,
    handleEntrySubmit,
    accounts,
    entries,
    addEntryData,
    handleInputChange,
    handleDeleteModal,
    handleDeleteSubmit,
  } = useEntries();

  return (
    <Container className="container">
      <div className="title">
        <h1>Lançamentos</h1>

        <div className="tools">
          <button type="button" onClick={() => setAddModal(true)}>
            <PlusSvg />
          </button>
        </div>
      </div>

      <section className="filters">Filters</section>

      <section className="data">
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
              <button type="button">
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
      </section>

      {addModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Lançamento</h2>

            <form action="" onSubmit={handleEntrySubmit}>
              <ul>
                <li>
                  <label htmlFor="add-entry-date">Data:</label>
                  <input
                    type="date"
                    id="add-entry-date"
                    onChange={handleInputChange}
                    value={addEntryData.date}
                    name="date"
                    required
                  />
                </li>
                <li>
                  <label htmlFor="add-entry-debit_id">Débito:</label>
                  <select
                    value={addEntryData.debit_id}
                    onChange={handleInputChange}
                    id="add-entry-debit_id"
                    name="debit_id"
                    required
                  >
                    <option value=""></option>
                    {accounts.map((account) => (
                      <option value={account.id} key={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  <label htmlFor="add-entry-credit">Crédito:</label>
                  <select
                    value={addEntryData.credit_id}
                    onChange={handleInputChange}
                    id="add-entry-credit_id"
                    name="credit_id"
                    required
                  >
                    <option value=""></option>
                    {accounts.map((account) => (
                      <option value={account.id} key={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  <label htmlFor="add-entry-value">Valor:</label>
                  <input
                    type="text"
                    id="add-entry-value"
                    name="value"
                    onChange={handleInputChange}
                    value={addEntryData.value}
                    data-mask-number
                    required
                  />
                </li>
                <li>
                  <label htmlFor="add-entry-note">Notas:</label>
                  <textarea
                    id="add-entry-note"
                    name="note"
                    value={addEntryData.note}
                    onChange={handleInputChange}
                  />
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

      {deleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Excluir Lançamento</h2>

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

export default Entries;
