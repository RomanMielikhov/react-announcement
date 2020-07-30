import React, { useState } from 'react';

export const SearchAnnouncements = (props) => {
  const [title, setTitle] = useState('');

  const valueChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  return (
    <div className="input-group mt-3">
      <div className="input-group-prepend">
        <button
          className="btn btn-outline-secondary"
          id="button-addon1"
          onClick={() => props.onSearch(title)}
        >
          Search
        </button>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder=""
        value={title}
        onChange={valueChangeHandler}
      />
    </div>
  );
};
