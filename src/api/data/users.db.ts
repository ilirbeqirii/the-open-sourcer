import { EditUserFormFields } from "../../components/forms/models";
import { AuthModel } from "../models/login";
import { RegisterModel } from "../models/register";
import { User, UserEntity, UserInfo } from "../models/user";

let users: Record<string, UserEntity> = {};

const usersKey = "__githuber_users__";
const persist = () =>
  window.localStorage.setItem(usersKey, JSON.stringify(users));

const load = () => {
  const persistedUsers = window.localStorage.getItem(usersKey);
  if (persistedUsers) {
    return Object.assign(users, JSON.parse(persistedUsers));
  }

  return Object.assign(users, new Map());
};

// init
try {
  load();
} catch (error) {
  persist();
}

async function authenticate(authInfo: AuthModel): Promise<User> {
  validateUserData(authInfo);
  const id = hash(authInfo.username);
  const user: UserEntity | undefined = users[id]
    ? users[id]
    : ({} as UserEntity);

  if (user?.passwordHash == hash(authInfo.password)) {
    return { id: user.id, username: user.username, token: btoa(user.id) };
  }

  const error = new Error("Invalid username or password");
  throw error;
}

async function create(registerInfo: RegisterModel): Promise<User> {
  validateUserData(registerInfo);
  const id = hash(registerInfo.username);
  const passwordHash = hash(registerInfo.password);

  if (users[id]) {
    const error = new Error(
      `Cannot create a new user with the username "${registerInfo.username}"`
    );

    throw error;
  }

  users[id] = { id, username: registerInfo.username, passwordHash };
  persist();
  return getUser(id);
}

async function getUser(id: string) {
  validateUser(id);

  const actualUser = users[id];
  return { id, username: actualUser?.username } as User;
}

async function getProfile(id: string): Promise<UserInfo> {
  validateUser(id);

  const { passwordHash, ...actualUser } = users[id];
  return actualUser;
}

async function updateProfile(
  id: string,
  info: EditUserFormFields
): Promise<UserInfo> {
  validateUser(id);

  users[id] = { ...users[id], ...info };

  persist();

  const { passwordHash, ...actualUser } = users[id];
  return actualUser;
}

async function reset() {
  users = {};
  persist();
}

// util functions
function validateUserData(loginInfo: AuthModel) {
  if (!loginInfo.username) {
    throw new Error("Username is required");
  }

  if (!loginInfo.password) {
    throw new Error("Password is required");
  }
}

function hash(str: string) {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
}

function validateUser(id: string) {
  load();
  if (!users[id]) {
    const error = new Error(`No user with the id "${id}"`);
    throw error;
  }
}

export { authenticate, create, getUser, reset, getProfile, updateProfile };
