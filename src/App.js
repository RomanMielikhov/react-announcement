import React, { useState, useEffect } from 'react';
import { AnnouncementList } from './components/AnnouncementList';
import { CreateAnnouncement } from './components/CreateAnnouncement';
import { SearchAnnouncements } from './components/SearchAnnouncements';

function App() {
  const [announcements, setAnnouncement] = useState([
    {
      id: '1',
      title: 'titfegefgefgefgefel',
      description: 'description',
      date: new Date(),
      isSelected: false,
    },
    {
      id: '2',
      title: 'sdfsdf 123 sdfsdf',
      description: 'description',
      date: new Date(),
      isSelected: false,
    },
    {
      id: '3',
      title: '123 dsfsd sdf ',
      description: 'description',
      date: new Date(),
      isSelected: false,
    },
    {
      id: '4',
      title: '123 dsfsd sdf ',
      description: 'description',
      date: new Date(),
      isSelected: false,
    },
  ]);
  const [filterAnnouncements, setFilterAnnouncements] = useState([]);

  useEffect(() => {
    setFilterAnnouncements([...announcements]);
  }, [announcements]);

  const searchHendler = (title) => {
    if (!title) {
      return setFilterAnnouncements([...announcements]);
    }
    return setFilterAnnouncements(
      announcements.filter((announcement) =>
        announcement.title.toLowerCase().includes(title.toLowerCase())
      )
    );
  };

  const addAnnouncements = (announcement) => {
    setAnnouncement([...announcements, announcement]);
  };

  const deleteAnnouncements = (id) => {
    setAnnouncement(
      announcements.filter((announcement) => announcement.id !== id)
    );
  };
  const changeAnnouncements = (id, newAnnouncement) => {
    setAnnouncement(
      announcements.map((item) => {
        if (item.id === id) {
          return Object.assign(item, newAnnouncement);
        }
        return item;
      })
    );
  };

  return (
    <div className="container">
      <SearchAnnouncements onSearch={searchHendler} />
      <CreateAnnouncement
        announcements={announcements}
        addAnnouncements={addAnnouncements}
      />
      <AnnouncementList
        announcements={filterAnnouncements}
        deleteAnnouncements={deleteAnnouncements}
        changeAnnouncements={changeAnnouncements}
      />
    </div>
  );
}

export default App;
