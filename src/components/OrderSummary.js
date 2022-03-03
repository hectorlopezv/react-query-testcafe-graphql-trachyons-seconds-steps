import Divider from "./Divider";

const OrderSummary = () => {
  return (
    <div className="pa3 w-50 center">
      <div className="flex mv3">
        <p className="ma0 mr-auto fw6">Subtotal (4 items)</p>
        <p className="ma0 gray">$32.00</p>
      </div>
      <div className="flex mt3 mb2 pb1">
        <p className=" ma0 mr-auto gray">Below order minium (less than $35)</p>
        <p className="ma0 gray">$5.99</p>
      </div>
      <Divider />
      <div className="flex mv3">
        <p className=" ma0 mr-auto gray">Select delivery or pickup to view fees</p>
        <p className="ma0 underline">Select</p>
      </div>

      <Divider />
      <div className="flex mv3 ">
        <p className="ma0 mr-auto fw6 f5">Taxes</p>
        <p className="ma0 gray">Calculated at checkout</p>
      </div>

      <Divider />
      <div className="flex mv3 ">
        <p className="ma0 mr-auto fw6 f4">Estimated Total</p>
        <p className="ma0 fw6 f4">$37.99</p>
      </div>
    </div>
  );
};

export default OrderSummary;
