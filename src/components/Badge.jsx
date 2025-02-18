import React from 'react';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

function Badge({ badgeData, onDeleteBadge }) {
  const { id, firstName, lastName, email, position, department } = badgeData;

  const handleDelete = () => {
    onDeleteBadge(id);
  };

  const handlePrint = () => {
    const badge = document.getElementById(id);
    // Torna visível apenas o crachá selecionado
    badge.classList.add('print-mode');
    window.print();  // Aciona a função de impressão
    badge.classList.remove('print-mode');  // Remove a classe após a impressão
  };

  return (
    <div
      id={id} // Atribui um id único para cada crachá
      className="badge-container card p-3 mb-3 shadow-sm"
    >
      <h2 className="badge-title text-center">{firstName} {lastName}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Cargo:</strong> {position}</p>
      <p><strong>Setor:</strong> {department}</p>

      <div className="qr-code-container mb-3">
        <QRCodeCanvas value={JSON.stringify({ firstName, lastName, email, position, department })} />
      </div>

      <div className="d-flex justify-content-between">
        <button onClick={handleDelete} className="btn btn-danger">Excluir</button>
        <Link to={`/badges/edit/${id}`}>
          <button className="btn btn-warning">Editar</button>
        </Link>
        <button onClick={handlePrint} className="btn btn-primary">Imprimir Crachá</button>
      </div>
    </div>
  );
}

export default Badge;
