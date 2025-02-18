import Routes from "./routes/Routes";
import { Provider } from "react-redux";
import { store } from "./states/store";
import {  network } from "./constants";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {

  console.reportErrorsAsExceptions = false;
  return (
  <StripeProvider
  publishableKey={network.publish_key}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </StripeProvider>
  );
}
