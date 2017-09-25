exports.registerByUsername = (dbInstance, username, password, displayname, cb) => {
  dbInstance.users.findOne({ username }).then((user) => {
    // user not found by usersname
    if (!user) {
      dbInstance.users.insert({ displayname, username, password }).then((newUser) => {
        if (newUser) {
          cb(null, newUser);
        } else {
          cb(new Error('Something wrong with inserting with registerByUsername function'));
        }
      });
    } else {
      cb(null, null);
    }
  });
};

exports.findById = (dbInstace, id, cb) => {
  dbInstace.users.findOne({ id }).then((user) => {
    if (user) cb(null, user);
    else cb(new Error(`User ${id} does not exist.`));
  });
};

exports.findByUsername = (dbInstance, username, cb) => {
  dbInstance.users.findOne({ username }).then((user) => {
    if (user) cb(null, user);
    else {
      cb(null, null);
    }
  });
};
