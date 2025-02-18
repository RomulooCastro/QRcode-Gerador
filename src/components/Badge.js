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
      className="badge-container"
    >
      <h2 className="badge-title">{firstName} {lastName}</h2>
      <p>Email: {email}</p>
      <p>Cargo: {position}</p>
      <p>Setor: {department}</p>

      <div className="qr-code-container">
        <QRCodeCanvas value={JSON.stringify({ firstName, lastName, email, position, department })} />
      </div>

      <button onClick={handleDelete} className="delete-btn">Excluir</button>
      <Link to={`/badges/edit/${id}`}>
        <button className="edit-btn">Editar</button>
      </Link>

      {/* Botão para imprimir */}
      <button onClick={handlePrint} className="print-btn">Imprimir Crachá</button>
    </div>
  );
}

export default Badge;
