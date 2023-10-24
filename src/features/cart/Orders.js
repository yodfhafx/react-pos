import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import OrderDetails from "./OrderDetails";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("/orders");
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  if (isEmpty(orders)) return <p>No Orders found</p>;

  return (
    <Row xs={1} md={2} lg={3} className="g-2 my-2">
      {orders.map((order) => (
        <Col key={order.id}>
          <Card>
            <Card.Header>
              {order.name || "N/A"}, {order.email || "N/A"},{" "}
              {order.tel || "N/A"}
            </Card.Header>
            <Card.Body>
              <OrderDetails
                products={order.products}
                editable={false}
              ></OrderDetails>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Orders;
