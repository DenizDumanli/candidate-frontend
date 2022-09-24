import axios from "axios";

const USERS_GET_CANDIDATES_URL = "http://localhost:8080/api/candidate";

export const getCandidates = () => {
  return axios.get(USERS_GET_CANDIDATES_URL);
};

export const getCandidateById = (id) => {
  return axios.get(USERS_GET_CANDIDATES_URL + "/" + id);
};

export const postCandidate = (candidate) => {
  return axios.post(USERS_GET_CANDIDATES_URL, candidate);
};

export const updateCandidateById = (id, candidate) => {
  return axios.put(USERS_GET_CANDIDATES_URL + "/" + id, candidate);
};

export const deleteCandidate = (id) => {
  return axios.delete(USERS_GET_CANDIDATES_URL + "/" + id + "/");
};
