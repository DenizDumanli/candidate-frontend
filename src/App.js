import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import service, {
  deleteCandidate,
  getCandidates,
  postCandidate,
  updateCandidateById,
} from "./service";

function App() {
  const [candidates, setCandidate] = useState([]);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [notes, setNotes] = useState();
  const [status, setStatus] = useState();
  const [modal, setModal] = useState(false);
  const [createBut, setCreateBut] = useState(false);

  const getCandidatesFromAPI = () => {
    getCandidates().then((response) => {
      setCandidate(response.data);
    });
  };

  useEffect(() => {
    getCandidatesFromAPI();
  }, []);

  useEffect(() => {}, [candidates]);

  const handleDeleteClick = (id) => {
    console.log(id);
    deleteCandidate(id).then(() => getCandidatesFromAPI());
  };

  const handleUpdateClick = (id, name, surname, email, notes, status) => {
    setId(id);
    setName(name);
    setSurname(surname);
    setEmail(email);
    setNotes(notes);
    setStatus(status);
    setModal(true);
  };

  const handleUpdateCandidateClick = () => {
    const candidate = {
      name: name,
      surname: surname,
      email: email,
      notes: notes,
      status: status,
    };

    updateCandidateById(id, candidate).then(() => getCandidatesFromAPI());
    setModal(false);
  };

  const handleCreateUserClickSave = () => {
    const candidate = {
      name: name,
      surname: surname,
      email: email,
      notes: notes,
      status: status,
    };

    console.log(status);
    postCandidate(candidate).then(() => getCandidatesFromAPI());
    setCreateBut(false);
  };

  const handleCreateUserClick = () => {
    setName("");
    setSurname("");
    setEmail("");
    setNotes("");
    setStatus("applied");
    setCreateBut(true);
  };

  return (
    <div className="App">
      <h1>Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>E-Mail</th>
            <th>Notes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.name}</td>
              <td>{candidate.surname}</td>
              <td>{candidate.email}</td>
              <td>{candidate.notes}</td>
              <td>{candidate.status}</td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateClick(
                      candidate.id,
                      candidate.name,
                      candidate.surname,
                      candidate.email,
                      candidate.notes,
                      candidate.status
                    )
                  }
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDeleteClick(candidate.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
        <form>
          <label>
            Name{" "}
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Surname{" "}
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>
          <label>
            E-Mail{" "}
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Notes{" "}
            <input
              type="text"
              id="surname"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <label>
            Status
            <select
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
              <option value="offer sent">Offer Sent</option>
              <option value="hired">Hired</option>
            </select>
          </label>
          <button type="button" onClick={() => handleUpdateCandidateClick()}>
            Update Candidate
          </button>
          <button type="button" onClick={() => setModal(false)}>
            Cancel
          </button>
        </form>
      )}
      {createBut && (
        <form>
          <label>
            Name{" "}
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Surname{" "}
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>
          <label>
            E-Mail{" "}
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Notes{" "}
            <input
              type="text"
              id="surname"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <label>
            Status
            <select
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
              <option value="offer sent">Offer Sent</option>
              <option value="hired">Hired</option>
            </select>
          </label>
          <button type="button" onClick={() => handleCreateUserClickSave()}>
            Create Candidate
          </button>
          <button type="button" onClick={() => setCreateBut(false)}>
            Cancel
          </button>
        </form>
      )}
      <button type="button" onClick={() => handleCreateUserClick()}>
        Create User
      </button>
    </div>
  );
}

export default App;
