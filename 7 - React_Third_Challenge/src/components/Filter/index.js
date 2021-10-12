import "./style.css";
import select from "../../assets/select.svg";
import barra from "../../assets/barra.svg";
import closeFilters from "../../assets/closeFilters.svg";

import { useState, useEffect } from "react";
function Filter({ transactionsData, setTransactionsData, loadTransactions }) {
  const [buttonsDay, setButtonsDay] = useState([
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
    "domingo",
  ]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [minValue, setMinValue] = useState([]);
  const [maxValue, setMaxValue] = useState([]);
  const [daysSelected, setDaySelected] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  function checkingCategories() {
    const newCategories = [...transactionsData];
    const filterCategories = newCategories.filter((item, index, array) => {
      return (
        array
          .map((mapItem) => mapItem["category"])
          .indexOf(item["category"]) === index
      );
    });
    setFilteredCategories(filterCategories);
  }

  function applyFilters() {
    const newTransaction = [...transactionsData];
    let minValueInput = Number(minValue) * 100;
    let maxValueInput = Number(maxValue) * 100;

    const filterTable = newTransaction.filter(function (obj) {
      if (maxValueInput === 0) {
        maxValueInput = 1000000000000000;
      }
      for (let item of daysSelected) {
        if (obj.week_day === item) {
          return true;
        }
      }
      for (let item of categoriesSelected) {
        if (obj.category === item) {
          return true;
        }
      }
      return (
        obj.value >= minValueInput &&
        obj.value <= maxValueInput &&
        obj.week_day.includes(daysSelected) &&
        obj.category.includes(categoriesSelected)
      );
    });

    setTransactionsData(filterTable);
  }

  function clickedDay(day) {
    const newDaysWeek = [...daysSelected];
    newDaysWeek.push(day);
    setDaySelected(newDaysWeek);
  }

  function clickedCategory(categorie) {
    const newCategories = [...categoriesSelected];
    newCategories.push(categorie);
    setCategoriesSelected(newCategories);
  }

  function clearFilters() {
    setMinValue([]);
    setMaxValue([]);
    setDaySelected([]);
    setCategoriesSelected([]);
    loadTransactions();
  }

  useEffect(() => {
    checkingCategories();
  }, []);

  return (
    <div className="container-filters">
      <div className="container-dias">
        <div className="title">
          <h1>Dia da semana</h1>
        </div>
        {buttonsDay.map((day) => (
          <button
            onClick={(e) => clickedDay(day)}
            className={`container-chip ${
              daysSelected.includes(day) ? "selected" : ""
            }`}
            key={day}
          >
            {day[0].toUpperCase() + day.substr(1)}
            <img
              className="icon-categoria"
              src={daysSelected.includes(day) ? closeFilters : select}
              alt="select"
            />
          </button>
        ))}
      </div>
      <img className="barra-lateral" src={barra} alt="barra" />
      <div className="container-categorias">
        <div className="title">
          <h1>Categoria</h1>
        </div>
        {filteredCategories.map((categoryFiltered) => (
          <button
            onClick={() => clickedCategory(categoryFiltered.category)}
            className={`container-categoria ${
              categoriesSelected.includes(categoryFiltered.category)
                ? "selected"
                : ""
            }`}
            key={categoryFiltered.category}
          >
            {categoryFiltered.category}
            <img
              className="icon-categoria"
              src={
                categoriesSelected.includes(categoryFiltered.category)
                  ? closeFilters
                  : select
              }
              alt="select"
            />
          </button>
        ))}
      </div>
      <img className="barra-lateral" src={barra} alt="barra" />
      <div className="container-valores">
        <div className="title">
          <h1>Valor</h1>
        </div>
        <label htmlFor="min-value">Min</label>
        <input
          onChange={(e) => setMinValue(e.target.value)}
          value={minValue}
          type="number"
          min="0"
          name="min-value"
          id="min-value"
        />
        <label htmlFor="max-value">Max</label>
        <input
          onChange={(e) => setMaxValue(e.target.value)}
          value={maxValue}
          type="number"
          name="max-value"
          id="max-value"
        />
      </div>
      <div className="container-botoes-filtros">
        <button onClick={() => clearFilters()} className="btn-clear-filters">
          Limpar Filtros
        </button>
        <button onClick={() => applyFilters()} className="btn-apply-filters">
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}

export default Filter;
