import axios from "axios";
import React, { useEffect, useState } from "react";


const Base = () => {
  const [user, setUser] = useState([]);
  const [lastName, setLastname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [data, setData] = useState();
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    try {
      axios.get(`https://reqres.in/api/users`).then((res) => {
    
        setUser(res.data.data);
      });
    } catch (error) {}
  }

  function Delate(id) {
    try {
      axios
        .delete(`https://reqres.in/api/users/${id}`)

        .then((res) => setUser(user.filter((item) => item.id !== id)));
    } catch (error) {}
  }

  function postHandler(id) {
    const object = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    try {
      axios.post(`https://reqres.in/api/users`, object);
    } catch (error) {
      console.log(error);
    }
  }

  function putHeadler(id) {
    try {
      axios
        .put(`https://reqres.in/api/users/${id}`)
        .then((res) => setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
     

      <div className="container">
        <button
          type="button"
          class="btn btn-primary my-3"
          data-toggle="modal"
          data-target="#myModal"
        >
          Add+
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Lastname</th>
              <th>Firstname</th>
              <th>Email</th>
              <th>edit</th>
              <th>delate</th>
            </tr>
          </thead>
          <tbody>
            {user.map((piple, index) => (
              <tr key={piple.id}>
                <td>{index + 1}</td>
                <td>{piple.last_name}</td>
                <td>{piple.first_name}</td>
                <td>{piple.email}</td>
                <td>
                  <button
                    className="btn btn-info"
                    data-toggle="modal"
                    data-target="#myModal2"
                    onClick={() => setData(piple)}
                  >
                    Edit
                  </button>

                  <div className="modal" id="myModal2">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h4 className="modal-title">Modal Heading</h4>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                          >
                            &times;
                          </button>
                        </div>

                        <div className="modal-body">
                          <div class="form-group">
                            <label for="usr">Laste Name:</label>
                            <input
                              type="text"
                              class="form-control"
                              defaultValue={data && data.last_name}
                              id="usr"
                              onChange={(e) =>
                                setLastname({ lastName: e.target.value })
                              }
                            />
                          </div>
                          <div class="form-group">
                            <label for="pwd">First Name:</label>
                            <input
                              defaultValue={data && data.first_name}
                              type="text"
                              class="form-control"
                              id="pwd"
                              onChange={(e) =>
                                setFirstName({ firstName: e.target.value })
                              }
                            />
                          </div>
                          <div class="form-group">
                            <label for="pwd">Email:</label>
                            <input
                              defaultValue={data && data.email}
                              type="text"
                              class="form-control"
                              id="pwd"
                              onChange={(e) =>
                                setEmail({ email: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-info"
                            data-dismiss="modal"
                            onClick={() => putHeadler()}
                          >
                            submit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => Delate(piple.id)}
                  >
                    {" "}
                    Delate
                  </button>
                </td>

                <div class="modal" id="myModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title">Modal Heading</h4>
                      </div>

                      <div class="modal-body">
                        <div class="form-group">
                          <label>Last Name:</label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <label>First name:</label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <label>Email:</label>
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            class="form-control"
                          />
                        </div>
                      </div>

                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={postHandler}
                        >
                          submit
                        </button>

                        <button
                          type="button"
                          class="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Base;
