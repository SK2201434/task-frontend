"use client";
import { useState } from "react";
import { BrowserRouter, /*Navigate,*/ Route, Routes, useNavigate } from "react-router-dom";
import { Card , Form , Button  } from "react-bootstrap";
import ProductList from "../pages/ProductsList";
// import {token} from "./helper";
import NavBar from "./NavBar";
import axios from "axios";
import UpdateUser from "../pages/UpdateUsere";
import CreateProduct from "../pages/CreateProduct";

let Routing = ()=>{
    return(
        <>
            <BrowserRouter>
            <NavBar />
                <Routes>
                    <Route path="/" element={<Signup/>} />
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login"  element={<Login />} />
                    <Route path="/productslist" element={<ProductList />} />
                    <Route path="/updateprofile" element={<UpdateUser />} />
                    <Route path="/createproduct" element={<CreateProduct />} />
                    <Route path="*" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

let Login = ()=>{

    let nav = useNavigate();
    
    interface user {
        email : String | null,
        password : string | null
    }

    let [loginUser , setLoginUser] = useState<user>({email : '' , password : ''})
    
    function change(event:any):void {
        setLoginUser({...loginUser , [event.target.name]  : event.target.value  })
    }

    function submit():void{
        axios.post("http://localhost:5002/loggin" ,  { email : loginUser.email   , password : loginUser.password } ).
        then((e)=>{
            // console.log(e);
            localStorage.setItem('authTokken', e?.data?.accessToken);
            localStorage.setItem('id' , e?.data?.id);
            localStorage.setItem('email' , e?.data?.email);
            localStorage.setItem('name' , e?.data?.name);
            localStorage.setItem('phone' , e?.data?.phone);
            nav('/productslist');
        }).
        catch((err)=>{
            console.error("Error occurred:", err);
            alert("Invalied user and password")
            
        })

    }

    return(
        <div className="h-75 d-flex align-items-cente justify-content-center card_top">
            <Card className="res_login_card  ">
                <Card.Body>
                    <Card.Title className="text-center"><div className="h3">Login</div></Card.Title>
                    <div>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label> Email </Form.Label>
                                <Form.Control type="email" placeholder="test@email.com" name="email"  onChange={(event)=>{change(event)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label> Password </Form.Label>
                                <Form.Control type="Password" placeholder="*********" name="password" onChange={(event)=>{change(event)}} />
                            </Form.Group>
                            <Form.Group>
                                <div className="d-grid">
                                   <Button size="sm" onClick={submit}> <div className="fw-bold" >Login</div> </Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

const Signup = () => {
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSignupData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { fullName, phoneNumber, email, password } = signupData;
            await axios.post("http://localhost:5002/creatusers", {
                name: fullName,
                phone: phoneNumber,
                email,
                password
            });
            alert("Signup successful!");
            navigate("/login");
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed. Please try again.");
        }
    };
    

    return (
        <div className="h-75 d-flex align-items-center justify-content-center card_top">
            <Card className="res_login_card">
                <Card.Body>
                    <Card.Title className="text-center"><div className="h3">Sign Up</div></Card.Title>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name="fullName" value={signupData.name} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" name="phoneNumber" value={signupData.phone} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={signupData.email} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={signupData.password} onChange={handleChange} />
                            </Form.Group>
                            <Button type="submit" size="sm">Sign Up</Button>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};







export default Routing;




