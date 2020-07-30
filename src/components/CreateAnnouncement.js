import React, { useState } from 'react';

export const CreateAnnouncement = (props) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });
  const [error, setError] = useState('');

  const createHendler = () => {
    if (form.description === '' || form.title === '') {
      setError('enter all inputs');
      return;
    }
    const announcement = {
      id: Date.now(),
      ...form,
      date: new Date(),
      isSelected: false,
    };
    props.addAnnouncements(announcement);
    setError('');
    setForm({ title: '', description: '' });
  };

  const changeFormHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-5">
          <input
            type="text"
            className="form-control"
            placeholder="Announcement title"
            name="title"
            value={form.title}
            onChange={changeFormHandler}
          />
        </div>
        <div className="col-5">
          <input
            type="text"
            className="form-control"
            placeholder="Announcement description"
            name="description"
            value={form.description}
            onChange={changeFormHandler}
          />
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-outline-primary float-right"
            onClick={createHendler}
          >
            Add announcement
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-10">
          {error && (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
