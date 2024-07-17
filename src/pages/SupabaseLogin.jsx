import React from 'react'

import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SupabaseLogin = () => {
    const [ email, setEmail ] = useState("");
    const user = useUser();
    const supabase = useSupabaseClient();

    return (
        <div>
            <div>
            SupabaseLogin Page
            </div>
            <Form>
                <Form.Group className="mb-3" style={{maxWidth: "500px"}}>
                    <Form.Label>Enter an email to sign in with a Supabase Magic Link</Form.Label>
                    {/* Form.Control is our text input */}
                    <Form.Control 
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {/* Button to allow user to submit */}
                <Button variant="primary">Get Magic Link</Button>
            </Form>
        </div>
    )
}

export default SupabaseLogin;