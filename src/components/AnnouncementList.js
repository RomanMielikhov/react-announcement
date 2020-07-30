import React from 'react';
import { AnnouncementListItem } from './AnnouncementListItem';

export const AnnouncementList = (props) => {
  return (
    <div className="row mt-4">
      <div className="col">
        <ul className="list-group">
          {props.announcements.map((announcement) => {
            return (
              <AnnouncementListItem
                arrayOfannouncements={props.announcements}
                announcement={announcement}
                key={announcement.id}
                saveAnnouncements={props.saveAnnouncements}
                deleteAnnouncements={props.deleteAnnouncements}
                changeAnnouncements={props.changeAnnouncements}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
