const ireportdb = [
  {
    users: [
      {
        id: 1,
        firstname: 'Leticia',
        lastname: 'Esiagu',
        othername: 'Chimezie',
        email: 'esiaguleticia@gmail.com',
        phoneNumber: '08023512632',
        username: 'letty',
        registered: '2018-11-24T17:08:52.953Z',
        isAdmin: false,
      },

      {
        id: 2,
        firstname: 'Lynda',
        lastname: 'Solomon',
        othername: 'Shola',
        email: 'shola@gmail.com',
        phoneNumber: '08033415631',
        username: 'admin',
        registered: '2018-11-26T17:09:52.953Z',
        isAdmin: true,
      },
    ],
    incidents: [
      {
        id: 1,
        createdOn: '2018-11-26T17:09:52.953Z',
        createdBy: 2, // represents the user who created this record
        type: 'red-flag', // [red-flag, intervention]
        location: '6.56 3.37', // Lat Long coordinates
        status: 'resolved', // [draft, under investigation, resolved, rejected]
        comment: 'hello',
      },
      {
        id: 2,
        createdOn: '2018-11-26T17:09:52.953Z',
        createdBy: 2, // represents the user who created this record
        type: 'red-flag', // [red-flag, intervention]
        location: '6.87 3.48', // Lat Long coordinates
        status: 'under investigation', // [draft, under investigation, resolved, rejected]
        comment: 'hello',
      },
      {
        id: 3,
        createdOn: '2018-11-26T17:09:52.953Z',
        createdBy: 3, // represents the user who created this record
        type: 'incident', // [red-flag, intervention]
        location: '6.766 3.17', // Lat Long coordinates
        status: 'rejected', // [draft, under investigation, resolved, rejected]
        comment: 'hello',
      },
      {
        id: 4,
        createdOn: '2018-11-26T17:09:52.953Z',
        createdBy: 4, // represents the user who created this record
        type: 'red-flag', // [red-flag, intervention]
        location: '6.516 3.987', // Lat Long coordinates
        status: 'rejected', // [draft, under investigation, resolved, rejected]
        comment: 'hello',
      },
    ],
  },

];


export default ireportdb;
