import React, { Fragment } from 'react';
import TeamMember from './TeamMember';

const Team = () => {
  const members = [
    {
      name: 'Member1',
      username: 'member1',
      photo: 'https://steemitimages.com/u/jpphotography/avatar/small',
      content: 'Member 1 description',
    },
    {
      name: 'Member2',
      username: 'member2',
      photo: 'https://steemitimages.com/u/jpphotography/avatar/small',
      content: 'Member 2 description',
    },
    {
      name: 'Member3',
      username: 'member3',
      photo: 'https://steemitimages.com/u/jpphotography/avatar/small',
      content: 'Member 3 description',
    },
    {
      name: 'Member4',
      username: 'member4',
      photo: 'https://steemitimages.com/u/jpphotography/avatar/small',
      content: 'Member 4 description',
    },
    {
      name: 'Member5',
      username: 'member5',
      photo: 'https://steemitimages.com/u/jpphotography/avatar/small',
      content: 'Member 5 description',
    },
    {
      name: 'Member6',
      username: 'member6',
      photo: 'https://steemitimages.com/u/jpphotography/avatar/small',
      content: 'Member 6 description',
    },
  ];
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          {members.map(member => {
            return (
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <TeamMember
                  name={member.name}
                  username={member.username}
                  photo={member.photo}
                  content={member.content}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Team;
