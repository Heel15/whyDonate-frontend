import { redirect } from "react-router-dom";

export const checkAuthValidation = (children) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return redirect('/login');
    }
    return children;
}