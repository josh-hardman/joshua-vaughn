import React, { useState } from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";
import "./styles.css";

const Subscribe = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [result, setResult] = useState();
    // 2. via `async/await`
    const handleSubmit = async (email, listFields) => {
        const result = await addToMailchimp(email, listFields);
        setResult(result.msg);
        // I recommend setting `result` to React state
        // but you can do whatever you want
    };

    return (
        <div className="sub-wrapper">
            <div className="sub-inner">
                <span className="sub-message">
                    Subscribe to recieve latest tips and helpful content.
                </span>
                <div className="sub-fields">
                    <input
                        className="sub-input"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="sub-input"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <button
                        className="sub-button"
                        onClick={() =>
                            handleSubmit(email, {
                                PATHNAME: "/blog-post-1",
                                FNAME: firstName,
                            })
                        }
                    >
                        subscribe
                    </button>
                </div>

                {result && (
                    <span
                        className="sub-response"
                        dangerouslySetInnerHTML={{ __html: result }}
                    />
                )}
            </div>
        </div>
    );
};

export default Subscribe;
