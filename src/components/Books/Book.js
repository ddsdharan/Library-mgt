import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import BookList from './BooksList';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoginContext from '../Context/LoginContext';

function Book() {
    const [isLoading, setLoading] = useState(true);
    const logindata = useContext(LoginContext);
    const [bookdata, setbookData] = useState([]);
    const [search, setSearch] = useState('');

    const handlesearch = useCallback((data, search) => {
        return data.filter((d) => {
            const lowercasedBookName = d.book_name.toLowerCase();
            return lowercasedBookName.includes(search.toLowerCase());
        });
    }, []);

    const filteredData = useMemo(() => handlesearch(bookdata, search), [handlesearch, bookdata, search]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const users = await axios.get('https://65a11ecc600f49256fb0f56b.mockapi.io/books');
            setbookData(users.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const DeleteBook = async (id) => {
        const confirm = window.confirm('Do you want to delete this record?');

        if (confirm) {
            await axios.delete(`https://65a11ecc600f49256fb0f56b.mockapi.io/books/${id}`);
            getUsers();
        }
    };

    return (
        <>
            <div className="card shadow mb-4 m-3">
                <div className="card-header py-2 d-sm-flex  justify-content-between mb-4">
                    <h6 className="m-2 font-weight-bold text-primary">Books</h6>
                    <form className="d-flex justify-content-between">
                        <input style={{ textTransform: "capitalize" }} className="form-control me-2" type="search" placeholder="search" aria-label="Search"
                            onChange={(e) => setSearch(e.target.value)} />
                    </form>
                    {logindata.isLibrarianVisible ? <Link className="btn btn-success" to="/portal/addbook">Add Book</Link> : null}
                    <div className="d-sm-flex  justify-content-end" >
                        <Link to="/portal/dashboard" className="btn btn-dark btn-sm">Back</Link>
                    </div>
                </div>
                {isLoading ? <h1>Loading...</h1> : <div className="card-body">

                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Book Name</th>
                                    <th>Author</th>
                                    <th>Number of Books</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!search && bookdata?.map((dt, index) => <BookList key={index} bookdata={dt} DeleteBook={DeleteBook} />)}
                                {search && filteredData?.map((dt, index) => <BookList key={index} bookdata={dt} DeleteBook={DeleteBook} />)}
                            </tbody>
                        </table>
                    </div>
                </div>}
            </div>
        </>
    );
}

export default Book;


