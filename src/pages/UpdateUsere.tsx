import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form , Card , Button } from "react-bootstrap";

let UpdateUser:React.FC = ()=>{

    interface UpdateUser {
        name : string,
    //    email : string,
        phone : string
    }

    let [productInfo , setProductInfo] = useState<UpdateUser>(
        {
            name : localStorage.getItem('name') || '' ,
          //  email : localStorage.getItem('email')  || '',
            phone : localStorage.getItem('phone') || ''
        }
    )

    useEffect(()=>{

    },[])
    
    function change(e:any):void{
        setProductInfo({...productInfo , [e.target.name] : e.target.value})
    }   


    function update():void{
        axios.put(`https://task-back-8air.onrender.com/updateprofile/${localStorage.getItem('id')}` , {
            name : productInfo.name ,
            phone : productInfo.phone
        }).then((e)=>{
            // console.log(e);
             alert(e.data.message);
            localStorage.setItem('name' , e?.data?.user?.name);
            localStorage.setItem('phone' , e?.data?.user?.phone);
            setProductInfo({...productInfo , 'name' : e?.data?.user?.name , 'phone' : e?.data?.user?.phone});
        }).catch((err)=>{

        })
    }




    return(
        <>
                        <div className="h-75 d-flex align-items-cente justify-content-center card_top" >
            <Card className="res_login_card  ">
                <Card.Body>
                    <Card.Title className="text-center"><div className="h3">Update Info</div></Card.Title>
                    <div>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label> Full Name  </Form.Label>
                                <Form.Control type="text" placeholder="Full Name" name="name" onChange={change} value={productInfo.name} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label> phone Number </Form.Label>
                                <Form.Control type="phone" placeholder="phone number" name="phone" onChange={change} value={productInfo.phone} />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" >
                                <Form.Label> Email </Form.Label>
                                <Form.Control type="email" placeholder="test@email.com" name="email" onChange={change} value={productInfo.email}  />
                            </Form.Group> */}
                            <Form.Group>
                                <div className="d-grid">
                                   <Button size="sm" onClick={update}> <div className="fw-bold" >Update</div> </Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </div>
            
        </>
    )
} 

export default UpdateUser;

