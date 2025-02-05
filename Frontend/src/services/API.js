import axios from 'axios';

const baseUrl = 'http://localhost:3000';

// Existing API calls
const register = async (credentials) => {
  const response = await axios.post(baseUrl + "/auth/register", credentials);
  return response;
};

const login = async (credentials) => {
  const response = await axios.post(baseUrl + "/auth/login", credentials);
  return response;
};

const getUsers = async () => {
  const response = await axios.get(baseUrl + "/auth/users");
  return response;
};

const getGroupMessages = async (groupName) => {
  const response = await axios.get(baseUrl + `/chat/group/${groupName}`);
  return response;
};

const getDMessages = async (sender, receiver) => {
  const response = await axios.get(baseUrl + `/chat/dm/${sender}/${receiver}`);
  return response;
};

export { register, login, getUsers, getGroupMessages, getDMessages };
