import './App.css';
import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {
  const Paypal = () => {
    return (
      <PayPalScriptProvider
        options={{
          "client-id": `${process.env.REACT_APP_EQUB_PUBLIC_PAYPAL_CLIENT_ID}`,
        }}
      >
        <PayPalButtons
          style={{
            shape: "pill",
            color: "blue",
            layout: "vertical",
            label: "paypal",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: 20,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            console.log({ order: order.id });
            // const response = await axiosApp.post(
            //   "/checkout-paypal/",
            //   {
            //     id: order.id,
            //   },
            //   {
            //     headers: {
            //       Authorization: `Bearer ${localStorage.getItem(
            //         BINGO_ACCESS_TOKEN_KEY
            //       )}`,
            //     },
            //   }
            // );
            // console.log(response);
          }}
          onError={(err) => {
            console.log(err);
          }}
        />
      </PayPalScriptProvider>
    )
  }
  return (
    <div className="App">
      <p>{`${process.env.REACT_APP_EQUB_PUBLIC_PAYPAL_CLIENT_ID}`}</p>
      <Paypal />
    </div>
  );
}

export default App;
