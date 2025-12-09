//Componente para exibição tabular de dados (ex: relatórios)
import React from 'react';

const Table = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <p className="no-data-message">Nenhum dado encontrado para exibição.</p>;
  }

  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.render 
                    ? column.render(row) 
                    : row[column.field]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;//Componente para exibição tabular de dados (ex: relatórios)
