import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onSubmit = (e) => {
        e.prevenDefault();
    };
    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login to do some shoppinglist crap</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email" id="email" name="email" className="form-control" value={email} placeholder="Enter your email" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={password}
                            placeholder="Enter your password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
