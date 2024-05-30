import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1000);
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/payment/', {
        name,
        amount,
        phone,
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log('Payment successful');
        // Reset form fields if needed
        setName('');
        setAmount(1000);
        setPhone('');
      } else {
        console.error('Payment failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };


  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Form onSubmit={handleSubmit} className="w-100">
        <Row className="mb-3">
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Label>Payment Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter payment Name"
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Enter Phone Number"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <Button variant="primary" type="submit" className="w-50">
              Pay now
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}