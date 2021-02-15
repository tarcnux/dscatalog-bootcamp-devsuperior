import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import AdminProducts from './components/AdminProducts';
import './styles.scss';

const Admin = () => (
    <div className="admin-container">
        <AdminNavbar />
        <div className="admin-content">
            <Switch>
                <Route path="/admin/products">
                    <AdminProducts />
                </Route>

                <Route path="/admin/categories">
                    <h1>Categorias</h1>
                </Route>

                <Route path="/admin/users">
                    <h1>Usuários</h1>
                </Route>
            </Switch>
        </div>
    </div>
);

export default Admin;