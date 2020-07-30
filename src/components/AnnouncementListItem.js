import React, { useState } from 'react';
import Moment from 'react-moment';

export const AnnouncementListItem = (props) => {
  const [isEdit, setEdit] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [similar, setSimilar] = useState([{}]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const selectListItem = () => {
    setSelected(!isSelected);
    const topArr = [];

    for (let i = 0; i < props.arrayOfannouncements.length; i++) {
      if (
        props.arrayOfannouncements[i].title
          .split(' ')
          .some((elemnt) =>
            props.announcement.title.split(' ').includes(elemnt)
          ) &&
        props.arrayOfannouncements[i].description
          .split(' ')
          .some((elemnt) =>
            props.announcement.description.split(' ').includes(elemnt)
          ) &&
        props.arrayOfannouncements[i].id !== props.announcement.id
      ) {
        if (topArr.length < 3) {
          topArr.push(props.arrayOfannouncements[i]);
        }
      }
    }
    setSimilar(topArr);
  };

  const changeAnnouncementHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const editAnnouncements = () => {
    setEdit(true);
  };

  const saveAnnouncements = () => {
    if (form.description === '' || form.title === '') {
      setError('enter all inputs');
      return;
    }
    const newAnnouncement = {
      ...form,
      date: new Date(),
      isSelected: isSelected,
    };
    props.changeAnnouncements(props.announcement.id, newAnnouncement);
    setError('');
    setEdit(false);
    setForm({ title: '', description: '' });
  };

  const cancelAnnouncements = () => {
    setEdit(false);
  };

  const announcementSection = () => {
    if (!isEdit) {
      return (
        <div className="row">
          <div className="col-10">
            <span onClick={selectListItem}>{props.announcement.title}</span>
          </div>
          <div className="col-2">
            <button
              className="btn btn-outline-danger mr-1"
              type="button"
              onClick={() => props.deleteAnnouncements(props.announcement.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
            <button
              className="btn btn-outline-warning"
              type="button"
              onClick={editAnnouncements}
            >
              <i className="fa fa-pencil"></i>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-10">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <input
            type="text"
            className="form-control"
            placeholder="ToDo title"
            name="title"
            value={form.title}
            onChange={changeAnnouncementHandler}
          />
          <input
            type="text"
            className="form-control"
            placeholder="ToDo description"
            name="description"
            value={form.description}
            onChange={changeAnnouncementHandler}
          />
        </div>
        <div className="col-2 ">
          <button
            className="btn btn-outline-danger mr-1"
            type="button"
            onClick={cancelAnnouncements}
          >
            <i className="fa fa-ban"></i>
          </button>
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={saveAnnouncements}
          >
            <i className="fa fa-check-circle"></i>
          </button>
        </div>
      </div>
    );
  };

  const selectedAnnouncementSection = () => {
    if (isSelected) {
      return (
        <div className="container">
          <div className="row mt-2 border border-secondary">
            <div className="col">
              <span>Description: {props.announcement.description}</span>
            </div>
            <div className="col-3">
              Create data:
              <Moment format="YYYY/MM/DD">{props.announcement.date}</Moment>
            </div>
          </div>
          <div className="row mt-2 border border-secondary">
            <div className="col">
              <div className="row">
                <div className="col">Similar announcement:</div>
              </div>
              <div className="row mt-2">
                <div className="col off-set-1">
                  {similar.length > 0
                    ? similar.map((item, index) => (
                        <div className="row mt-2" key={index + item.id}>
                          <div className="col-6">{`id: ${item.id} `}</div>
                          <div className="col-6">{`title: ${item.title}`}</div>
                        </div>
                      ))
                    : 'not found'}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <li className="list-group-item mt-1">
      <div className="row">
        <div className="col-12">
          {announcementSection()}
          {selectedAnnouncementSection()}
        </div>
      </div>
    </li>
  );
};
