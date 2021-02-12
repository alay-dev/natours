import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51IJgKpCGmpEwYTgV05FPbv7lvdQltQ4tkEtn9rt9z5Cr9nilZoxY3VRzR6hHj3bH37lXnPy0xMsyCfI5UKGMlbro00COjg9rBF'
  );

  //1)Get the session from the Server
  try {
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);

    //2create checkout form + charge the credit card for us
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
