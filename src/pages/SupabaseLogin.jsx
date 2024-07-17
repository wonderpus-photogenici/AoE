import React from 'react'

import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
// import 'bootstrap/dist/css/bootstrap.min.css';

// Just followed https://www.youtube.com/watch?v=8tfdY0Sf2rA&ab_channel=CooperCodes
// to make this page

// https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/ad71ba30-2c74-4333-8ad6-032295731ab0/5933eb11-6e89-48e3-a818-2cea57c0fbbc

// const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";

// CDNURL + user.id + "/" + image.name

const SupabaseLogin = () => {
    const [email, setEmail] = useState("");
    const [images, setImages] = useState([]);
    const user = useUser();
    const supabase = useSupabaseClient();
    // console.log(email);

    const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";

    async function getImages() {
        const { data, error } = await supabase
            .storage
            .from('AoE')
            // user? checks if the user exists?
            .list(user?.id + "/", {
                // the limit, is the number of images it gets
                limit: 100,
                // offset of 0 means directly from the top/ the first part of your search
                offset: 0,
                // If you want to make other ways of ordering, look up supabase list documentation
                sortBy: { column: "name", order: "asc" }
            });
        // Example of what it retrieves
        // <Cooper />
        // [ image1, image2, image3 ]
        // image1: {name: "subscribeToCooperCodes.png" }

        // Because we're being hosted on a CDN
        // to load image1: CDNURL.com/subscribeToCooperCodes.png -> hosted image

        // If there's data
        if (data !== null) {
            setImages(data);
        } else {
            alert("Error loading images")
            console.log(error);
        }

        // Supabase does not refresh automatically when you upload an image to your bucket
        // you have to manually refresh to see the newly uploaded image
    }

    // this useEffect will run whenever the user gets changed, and also initially
    useEffect(() => {
        // If the user exists, get the images
        if (user) {
            getImages();
        }
    }, [user])

    async function magicLinkLogin() {
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email
        });

        if (error) {
            alert("Error communicating with supabase, make sure to use a real email address!");
            console.log(error);
        } else {
            alert("Check your email for a Supabase Magic Link to Log in")
        }
    }

    // After email is confirmed, it redirects to '/#', which right now is the signup page

    async function signOut() {
        const { error } = await supabase.auth.signOut();
    }

    async function uploadImage(e) {
        let file = e.target.files[0];

        // If your user id is Cooper
        // userid: Cooper
        // you can only access the Cooper folder
        // Cooper/
        // Cooper/myNameOfImage.png

        const { data, error } = await supabase
            .storage
            .from('AoE')
            // upload to user.id/{filename}
            // for our use case, it would probably be: .upload(userName + "/" + uuidv4(), file)
            .upload(user.id + "/" + uuidv4(), file) // Cooper/{randomString}
        // uuid, we use uuid because if someone wanted to upload two images
        // that had the same name, it wouldn't let them save the same file name twice, so we put a unique
        // id in front to make the images appear unique

        if (data) {
            // getImages to load them, it takes the images from the user's folder and sets them to that
            // users state
            getImages();
        } else {
            console.log(error);
        }
    }

    async function deleteImage(imageName) {
        const { error } = await supabase
        .storage
        .from('AoE')
        .remove([user.id + "/" + imageName])

        if (error) {
            alert(error);
        } else {
            getImages();
        }
    }

    return (
        <div>
            {/* If user doesn't exist: show them the login page
                If the user exists: show them the images / upload images page
            */}
            {user === null ?
                <>
                    <div>
                        SupabaseLogin Page
                    </div>
                    <Form>
                        <Form.Group style={{ maxWidth: "500px" }}>
                            <Form.Label>Enter an email to sign in with a Supabase Magic Link</Form.Label>
                            {/* Form.Control is our text input */}
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Button to allow user to submit */}
                        <Button variant="primary" onClick={() => {
                            magicLinkLogin();
                        }}>Get Magic Link</Button>
                    </Form>
                </> : <>
                    <h1>Your ImageWall</h1>
                    <Button onClick={() => signOut()}>Sign Out</Button>
                    <p>Current user: {user.email}</p>
                    <p>Use the Choose File button below to upload an image to your gallery</p>
                    <Form.Group style={{ maxWidth: "500px" }}>
                        {/* Form.Control determines the types of files that can be uploaded */}
                        {/* the onchange event occurs when someone uploads a file, the event is */}
                        {/* coming from the file input, it's how we get access to the uploaded file */}
                        <Form.Control type="file" accept="image/png, image/jpeg" onChange={(e) => uploadImage(e)}>
                        </Form.Control>
                    </Form.Group>
                    <h3>Your Images</h3>
                    {/* to get an image: CDNURL + user.id + "/" + image.name
                    images: [image1, image2, image3]
                    */}
                    <Row>
                        {images.map((image) => {
                            return (
                                <Col key = {CDNURL + user.id + "/" + image.name}>
                                    <Card>
                                        <Card.Img variant="top" src={CDNURL + user.id + "/" + image.name} />
                                        <Card.Body>
                                            <Button variant="danger" onClick={() => {
                                                deleteImage(image.name);
                                            }}>Delete Image</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </>
            }
        </div>
    )
}

export default SupabaseLogin;