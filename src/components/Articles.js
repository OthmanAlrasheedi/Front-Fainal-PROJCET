import React, { useState, useEffect } from "react";
import axios from "axios";
import "./art.css";
import { useParams } from "react-router-dom";
export default function Articles({ token, admin }) {
  const { id } = useParams();
  const [articals, setarticals] = useState([]);
  const [user, setuser] = useState([]);
  const [name, setname] = useState("");
  const [artical, setartical] = useState("");
  const [togol, settogol] = useState(false);

  useEffect(async () => {
    if (token) {
      try {
        const respons = await axios.get(
          ` ${process.env.REACT_APP_BACKEND_URL}/articl`,
          {
            headers: { authorization: "Bearer " + token },
          }
        );
        setarticals(respons.data);
      } catch (error) {
        console.log("Eere");
      }
    }
    if (token) {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
        headers: { authorization: "Bearer " + token },
      });
      setuser(res.data);
      console.log(res.data);
    }
  }, []);

  const addarty = async () => {
    if (token) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/articl`,
          {
            article: artical,
          },

          {
            headers: { authorization: "Bearer " + token },
          }
        );
        console.log(res.data);
        const copied = [...articals];
        copied.push(res.data);
        setarticals(copied);
      } catch (error) {
        console.log("error");
      }
    }
  };

  const deleteArticac = async () => {
    const deeell = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/delarti/${id}`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    console.log(deeell.data);
    // const
    // setarticals(deeell.data);
  };

  const arti = (e) => {
    setartical(e.target.value);
  };
  const name1 = (e) => {
    setname(e.target.value);
  };

  const addMM = () => {
    settogol(!togol);
  };
  return (
    <div>
      {user.admin == true ? (
        <>
          <button
            className="butnad1"
            onClick={() => {
              addMM();
            }}
          >
            ?????? ????????
          </button>
        </>
      ) : (
        ""
      )}
      {togol === true ? (
        <>
          <div className="artic">
            <input
              className="addM"
              placeholder="?????? ???????????? "
              type="text"
              onChange={(e) => {
                name1(e);
              }}
            />
            <br></br>
            <input
              className="addM"
              placeholder="?????? ??????????"
              type="text"
              onChange={(e) => {
                arti(e);
              }}
            />

            <button
              className="butnad11"
              onClick={() => {
                addarty();
              }}
            >
              ??????
            </button>
          </div>
        </>
      ) : (
        ""
      )}
      <div class="grid-container">
        {articals.map((elem, i) => {
          console.log(elem);
          return (
            <>
              <div class="grid-item">
                {/* {user.admin == true ? (
                  <button
                    className="butnad1"
                    onClick={() => {
                      deleteArticac();
                    }}
                  >
                    ??????
                  </button>
                ) : (
                  ""
                )} */}

                <p className="ppp3">{elem.article}</p>
              </div>
            </>
          );
          // <div className="artiback"> <p className="pp">{elem.article}</p> </div>;
        })}
      </div>
    </div>
  );
}
