import React, { useEffect, useState } from "react";

function Edicoes() {
  const [edicoes, setEdicoes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/edicoes")
      .then((res) => res.json())
      .then((data) => setEdicoes(data))
      .catch((err) => console.error("Erro ao carregar edições:", err));
  }, []);

  return (
    <section className="edicoes">
      <h2>Edições Recentes</h2>
      {edicoes.length > 0 ? (
        <ul>
          {edicoes.map((ed, index) => (
            <li key={index}>
              <a href={ed.link} target="_blank" rel="noopener noreferrer">
                {ed.titulo}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma edição disponível no momento.</p>
      )}
    </section>
  );
}

export default Edicoes;
