import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginContext from '../Context/LoginContext';
import UserContext from '../Context/UserContext';
import readerImage from '../images/4354122.jpg';
import LibrarianImage from '../images/26245.jpg';
import sideImage from '../images/Library_Freepik.jpg';

function Login() {
    const userdata = useContext(UserContext)
    const logindata = useContext(LoginContext);

    const navigate = useNavigate();
    return (
        <section className="vh-100 mt-5 pt-3" >

            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-4">
                        <img src={sideImage} className="img-fluid" alt="Sample" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1" id="container-side">
                        <form>
                            <div className="form-outline mb-3">
                                <input type="text" id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Enter a username" onChange={(event) => userdata.setUsername(event.target.value)} />
                            </div>

                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Enter password" />
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div className="d-flex ms-3" >
                                <button onClick={() => {
                                    logindata.setLibrarianVisible(true);
                                    navigate("/portal/dashboard")
                                }} type="button" className="btn   mt-2"
                                    style={{ paddingRight: "2.5rem" }}>
                                    <div className="card" style={{ width: "8rem", height: "8rem" }}>
                                        <img className="card-img-top pb-5" src={LibrarianImage} alt="librarian" />
                                    </div><p>Librarian</p>
                                </button>
                                <button onClick={() => {
                                    logindata.setLibrarianVisible(false);
                                    navigate("/portal/book")
                                }} type="button" className="btn   mt-2"
                                    style={{ paddingRight: "2.5rem" }}>
                                    <div className="card" style={{ width: "8rem", height: "8rem" }}>
                                        <img className="card-img-top pb-5" src={readerImage} alt="reader" />
                                    </div><p>Reader</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </section >
    )
}
export default Login;