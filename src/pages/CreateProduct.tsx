
import axios from "axios";
import React, { useState , /*ChangeEvent*/ } from "react";
import {Form , Card , Button } from "react-bootstrap";

let CreateProduct : React.FC = ()=>{


    let [file , setFile] = useState<any>();
    let [name , setName] = useState<String | undefined | null | any >();
    let [description , setDescription] = useState<String | any>();


    let Create_product = ():void=>{

        let data = new FormData();

        data.append('productimage' , file);
        data.append('name' , name);
        data.append('description' , description);


        axios.post('https://task-back-8air.onrender.com/createproduct' , data).then((e)=>{
            console.log(e)
            
        }).catch((err)=>{
            console.log(err)
        })
    }



    return(
        <div className="h-75 d-flex align-items-cente justify-content-center card_top" >
            <Card className="res_login_card  ">
                <Card.Body>
                    <Card.Title className="text-center"><div className="h3">Create Product</div></Card.Title>
                    <div>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Create Product</Form.Label>
                                <Form.Control type="text" placeholder="Product Name" name="name" value={name} onChange={(e:any)=>{setName(e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" placeholder="description" name="description" value={description} rows={3} onChange={(e:any)=>{setDescription(e.target.value)}} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control type="file" size="sm" onChange={(e:any)=>{ setFile(e.target.files[0]) } }  />
                            </Form.Group>

                            <Form.Group>
                                <div className="d-grid">
                                   <Button size="sm" onClick={Create_product}> <div className="fw-bold">Create</div></Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </div> 
    )
}

export default CreateProduct;