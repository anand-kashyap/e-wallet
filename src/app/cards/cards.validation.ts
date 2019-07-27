export const CARD_VALIDATIONS = {
  cardNumber: [
    {
      type: 'required',
      message: 'Card Number is required'
    }
  ],
  expiryDate: [
    {
      type: 'required',
      message: 'Expiry Date is required'
    },
    {
      type: 'pattern',
      message: 'Only Numbers are allowed'
    },
    {
      type: 'minlength',
      message: 'Minimum Length of 4 digits is required'
    },
    {
      type: 'maxlength',
      message: 'Maximum Length of 4 digits is allowed'
    },
  ],
  cvv: [
    {
      type: 'required',
      message: 'CVV is required'
    },
    {
      type: 'pattern',
      message: 'Only Numbers are allowed'
    },
    {
      type: 'minlength',
      message: 'Minimum Length of 3 digits is required'
    },
    {
      type: 'maxlength',
      message: 'Maximum Length of 4 digits is allowed'
    },
  ],
  holderName: [
    {
      type: 'required',
      message: 'Card Holder Name is required'
    },
    {
      type: 'pattern',
      message: 'Only alphabets are allowed'
    },
  ],
};
