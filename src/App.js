import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button, Col, Navbar, NavbarText, NavbarBrand, FormFeedback  } from 'reactstrap';

class SubmitForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validate = this.validate.bind(this);

        this.state = {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            serviceChoosen: '',
            date: '', 
            time:'',
            touched: {
                firstname: false,
                lastname: false,
                phone: false,
                email: false

            }
        }

    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })

    }
    validate(firstname, lastname, phone, email) {
        const errors = {
            firstname: '',
            lastname: '',
            phone: '',
            email: ''
        };

        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >= 3 characters';
        else if (this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be >= 3 characters';
        else if (this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last Name should be <= 10 characters';

        const reg = /^\d+$/;
        if (this.state.touched.phone && !reg.test(phone))
            errors.phone = 'Tel. Number should contain only numbers';

        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';

        return errors;
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {
        alert('Current State is: ' + JSON.stringify(this.state));
        fetch("http://localhost:9000", {
            method: 'POST',
            body: JSON.stringify(this.state)
        })
            .then(res => res.text())
            .then(res => console.log(res))
        event.preventDefault();
    }
    render() {
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.phone, this.state.email);

        return (
            <div className="container">
                <div className="row row-content">
                    
                    <div className="col-12 col-md-9 mt-5">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col md={3}>
                                    <Label htmlFor="fisrtname">First Name</Label>
                                </Col>
                                <Col md={9}>
                                    <Input type="text" id="fisrtname" name="firstname"
                                        value={this.state.firstname}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('firstname')}
                                        valid={errors.firstname === ''}
                                        invalid={errors.firstname !== ''}
                                    />
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                                
                            </FormGroup>
                            
                            <FormGroup row>
                                <Col md={3}>
                                    <Label htmlFor="lastname">Last Name</Label>
                                </Col>
                                <Col md={9}>
                                    <Input type="text" id="lastname" name="lastname"
                                        value={this.state.lastname}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('lastname')}
                                        valid={errors.lastname === ''}
                                        invalid={errors.lastname !== ''}
                                    />
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                                
                            </FormGroup>

                            <FormGroup row>
                                <Col md={3}>
                                    <Label htmlFor="phone">Phone</Label>
                                </Col>
                                <Col md={9}>
                                    <Input type="phone" id="phone" name="phone"
                                        value={this.state.phone}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('phone')}
                                        valid={errors.phone === ''}
                                        invalid={errors.phone !== ''}
                                    />
                                    <FormFeedback>{errors.phone}</FormFeedback>
                                </Col>
                                
                            </FormGroup>

                            <FormGroup row>
                                <Col md={3}>
                                    <Label htmlFor="email">Email</Label>
                                </Col>
                                <Col md={9}>
                                    <Input type="email" id="email" name="email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('email')}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                                
                            </FormGroup>

                            <FormGroup row>
                                <Col md={3}>
                                    <Label htmlFor="serviceChoosen">service</Label>
                                </Col>
                                <Col md={9}>
                                    <Input type="select" name="serviceChoosen"
                                        value={this.state.serviceChoosen}
                                        onChange={this.handleInputChange}>
                                        <option>Borrow a Book</option>
                                        <option>Read a Book </option>
                                        <option>rReturn back books</option>
                                        <option>Computer Lab</option>
                                        <option>Research</option>
                                        <option>studying area </option>
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md={3}>
                                    <Label htmlFor="date">Date</Label>
                                </Col>
                                <Col md={4}>
                                    <Input type="date" id="date" name="date"
                                        value={this.state.date}
                                        onChange={this.handleInputChange} />
                                </Col>
                                <Col md={1}>
                                    <Label htmlFor="time">Time </Label>
                                </Col>
                                <Col md={4}>
                                    <Input type="time" id="time" name="time"
                                        value={this.state.time}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary" >Reserve</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
function NavBar() {
    return (
        <div>
            <Navbar color="light" light >
                <NavbarText><h2>Library Reservation</h2></NavbarText>
            
            </Navbar>
        </div>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        
           
            }

    
    
    render() {
        return (
        <div>
           <NavBar/>
           <SubmitForm />
        </div>
        );
    }
}
export default App;
