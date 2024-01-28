"use client";
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Card, Container ,Form , Modal , ToggleButton , ButtonGroup } from "react-bootstrap"


let ProductList : React.FC = () =>{

    interface products {
        _id : String,
        _v : String,
        name : String,
        imageUrl : String,
        description : String 
    }


    interface editProduct {
        _id : String,
        name : String,
        description : String
    }


    let [productsList , setProductsList] = useState< products[] | null | undefined | any>();
    let [totalproductsList , setTotalProductsList] = useState< products[] | null | undefined | any>();
    let [ show , setShowModel] = useState<Boolean>(false);
    let [edit_Product , setEditProduct] = useState<editProduct>({_id : '' , name : '' , description : ''});


    useEffect(()=>{
        getProducts();
    },[])

   let editProduct = (_id:String):void=>{
        let p : [] | any = totalproductsList.filter((e:any)=>(e._id == _id));
        setEditProduct({ _id : p[0]._id , name : p[0].name , description : p[0].description   })
        setShowModel(true);
  }

  let editProductDetailes = (e:any) : void =>{
    setEditProduct({...edit_Product , [e.target.name] : e.target.value});
  }

  let updateProduct = ()=>{
    // console.log(edit_Product)
    axios.put(`https://task-back-8air.onrender.com/updateproduct/${edit_Product._id}`,{name : edit_Product.name , description : edit_Product.description}).
    then((event)=>{ 
        getProducts();
        setShowModel(false);
      }).
    catch((err)=>{ console.log(err) })

  }




    let getProducts = ():void=>{
       axios.get("https://task-back-8air.onrender.com/getproducts").
        then((e)=>{
            setProductsList(e.data.products);
            setTotalProductsList(e.data.products);
        }).catch((err)=>{
            console.log(err);
        })
    }

    let deleteProduct = (id : string):void=>{
        axios.delete(`https://task-back-8air.onrender.com/deleteproduct/${id}`).then((e)=>{
            getProducts();
            alert(e.data.message);
        }).catch((err)=>{

        })
    }

    function search(value : String) : void {
        let total : [] = totalproductsList.filter((e:any)=>e.name.includes(value));
        setProductsList(total);
    }   

    return(
        <div>
        <div className="display-6 text-center">Products List</div>
        <Container>
                {
                    <Modal show={show} onHide={()=>{setShowModel(false)}} >
                        <Modal.Header closeButton>
                             <Modal.Title>Edit Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control type="text" name="name"  value={edit_Product.name} onChange={editProductDetailes} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Product Description</Form.Label>
                                        <Form.Control as="textarea" name="description"  rows={3} value={edit_Product.description} onChange={editProductDetailes} />
                                    </Form.Group>
                                </Form>
                             </Modal.Body>

                            <Modal.Footer>
                                {/* <div className="d-grid">
                                </div> */}
                                   <Button size="sm"><div className="fw-bold" onClick={updateProduct}>Update</div> </Button>
                            </Modal.Footer>
                    </Modal>
                }
                <div>
                    <Form>
                        <Form.Group>
                           <Form.Control type="text" placeholder="Search" onChange={(e)=>{ search(e.target.value)  }}  />
                        </Form.Group>
                    </Form>
                </div>
            <div className="d-flex flex-row flex-wrap mt-3 gap-5">
                {
                    productsList && productsList.length > 0 && 
                    productsList.map((e:any)=><div key={e._id}>
                                <Card className="products_card pt-4 px-2 pb-2">
                                    <Card.Img variant="top" src={"http://localhost:5002/" +  e.imageUrl}/>
                                    <Card.Body>
                                        <Card.Title>{e.name}</Card.Title>
                                        <Card.Text>{e.description}</Card.Text>
                                        <div className="text-end">
                                            {/* <ButtonGroup size="sm"> */}
                                                    <Button size='sm' variant='danger' className="me-2" onClick={()=>{deleteProduct(e._id)}} >Delete</Button>
                                                    <Button size='sm' onClick={()=>{ editProduct(e._id)}}>Edit</Button>
                                            {/* </ButtonGroup> */}
                                            {/* <Button  size="sm" onClick={()=>{ editProduct(e._id) }} >Edit</Button> */}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>)
                }
                {
                    productsList && productsList.length == 0 && 
                    <div className="text-center lead">Product does not exist</div> 
                }
            </div>
        </Container>
    </div>
  )
}

export default ProductList;